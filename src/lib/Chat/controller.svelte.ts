import { partyOf } from './roles';
import type {
  ChatControllerOptions,
  ChatMessageData,
  ChatToolStatus,
  ChatTransport
} from './types';

const REVEAL_CHARS_PER_TICK = 2;
const REVEAL_INTERVAL_MS = 22;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

let idCounter = 0;

function defaultId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  idCounter += 1;
  return `msg-${idCounter}`;
}

export class ChatController {
  messages = $state<ChatMessageData[]>([]);
  isStreaming = $state(false);
  toolStatus = $state<ChatToolStatus | null>(null);

  private readonly transport: ChatTransport;
  private readonly typewriter: boolean;
  private readonly generateId: () => string;
  private abortController: AbortController | null = null;
  private sessionId: string | null = null;

  private revealBuffer = '';
  private revealTimer: ReturnType<typeof setInterval> | null = null;

  constructor(options: ChatControllerOptions) {
    this.transport = options.transport;
    this.typewriter = options.typewriter ?? false;
    this.generateId = options.generateId ?? defaultId;
    this.messages = options.initialMessages ?? [];
  }

  async send(prompt: string): Promise<void> {
    const trimmed = prompt.trim();
    if (trimmed.length === 0 || this.isStreaming) {
      return;
    }

    const history = this.messages.slice();
    this.messages.push({
      id: this.generateId(),
      role: 'sender',
      content: trimmed,
      status: 'sent'
    });
    await this.stream(trimmed, history);
  }

  async retry(): Promise<void> {
    if (this.isStreaming) {
      return;
    }
    let senderIndex = -1;
    for (let i = this.messages.length - 1; i >= 0; i -= 1) {
      const role = this.messages.at(i)?.role;
      if (typeof role === 'string' && partyOf(role) === 'sender') {
        senderIndex = i;
        break;
      }
    }
    const senderMessage = this.messages.at(senderIndex);
    if (senderIndex < 0 || typeof senderMessage === 'undefined') {
      return;
    }
    const history = this.messages.slice(0, senderIndex);
    this.messages = this.messages.slice(0, senderIndex + 1);
    await this.stream(senderMessage.content, history);
  }

  private async stream(message: string, history: ChatMessageData[]): Promise<void> {
    this.messages.push({
      id: this.generateId(),
      role: 'responder',
      content: '',
      streaming: true
    });
    this.isStreaming = true;

    const controller = new AbortController();
    this.abortController = controller;

    try {
      await this.transport(
        { message, history, sessionId: this.sessionId, signal: controller.signal },
        {
          onText: (chunk) => {
            this.toolStatus = null;
            this.feed(chunk);
          },
          onToolStatus: (status) => {
            this.toolStatus = status;
          },
          onAttachment: (attachment) => {
            this.patchReply((reply) => {
              const next = reply.attachments ?? [];
              next.push(attachment);
              reply.attachments = next;
            });
          },
          onError: (error) => {
            // Text already accepted but not yet revealed must be committed first, otherwise the
            // error is appended at the reveal cursor and the rest of the sentence continues
            // after it — splitting the message mid-word.
            this.flushReveal();
            this.patchReply((reply) => {
              reply.status = 'error';
              reply.content =
                reply.content.length > 0 ? `${reply.content}\n\n${error.message}` : error.message;
            });
          },
          onDone: (meta) => {
            if (typeof meta?.sessionId === 'string') {
              this.sessionId = meta.sessionId;
            }
          }
        }
      );
    } catch (error) {
      if (!controller.signal.aborted) {
        // Same ordering hazard as the onError handler: commit buffered text first, otherwise the
        // drain below replays it after the error message. Appending rather than replacing also
        // keeps whatever the responder managed to say before the transport failed.
        this.flushReveal();
        const message = error instanceof Error ? error.message : 'Something went wrong.';
        this.patchReply((reply) => {
          reply.status = 'error';
          reply.content = reply.content.length > 0 ? `${reply.content}\n\n${message}` : message;
        });
      }
    }

    await this.drain();
    this.patchReply((reply) => {
      reply.streaming = false;
    });
    if (this.abortController === controller) {
      this.abortController = null;
    }
    this.isStreaming = false;
    this.toolStatus = null;
  }

  stop(): void {
    this.abortController?.abort();
    this.abortController = null;
    this.stopReveal();
    this.revealBuffer = '';
    this.patchReply((reply) => {
      reply.streaming = false;
    });
    this.isStreaming = false;
    this.toolStatus = null;
  }

  reset(): void {
    this.stop();
    this.sessionId = null;
    this.messages = [];
  }

  private feed(chunk: string): void {
    if (!this.typewriter || prefersReducedMotion()) {
      this.patchReply((reply) => {
        reply.content += chunk;
      });
      return;
    }
    this.revealBuffer += chunk;
    if (this.revealTimer === null) {
      this.revealTimer = setInterval(() => this.tick(), REVEAL_INTERVAL_MS);
    }
  }

  private tick(): void {
    if (this.revealBuffer.length === 0) {
      this.stopReveal();
      return;
    }
    const piece = this.revealBuffer.slice(0, REVEAL_CHARS_PER_TICK);
    this.revealBuffer = this.revealBuffer.slice(piece.length);
    this.patchReply((reply) => {
      reply.content += piece;
    });
  }

  private drain(): Promise<void> {
    return new Promise((resolve) => {
      const check = (): void => {
        if (this.revealBuffer.length === 0 && this.revealTimer === null) {
          resolve();
          return;
        }
        setTimeout(check, REVEAL_INTERVAL_MS);
      };
      check();
    });
  }

  /** Commits any buffered-but-unrevealed text immediately, so writes that follow stay in order. */
  private flushReveal(): void {
    const pending = this.revealBuffer;
    this.revealBuffer = '';
    this.stopReveal();
    if (pending.length > 0) {
      this.patchReply((reply) => {
        reply.content += pending;
      });
    }
  }

  private stopReveal(): void {
    if (this.revealTimer !== null) {
      clearInterval(this.revealTimer);
      this.revealTimer = null;
    }
  }

  private patchReply(mutate: (reply: ChatMessageData) => void): void {
    const last = this.messages.at(-1);
    if (typeof last === 'undefined' || partyOf(last.role) !== 'responder') {
      return;
    }
    mutate(last);
  }
}
