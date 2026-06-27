<script lang="ts">
  import type { SnippetProperties } from './properties';
  import Button from '../Button/Button.svelte';
  import copySvg from '$lib/assets/copy.svg?raw';

  let {
    text,
    prompt = '$',
    showCopyButton = true,
    testId,
    copyIcon,
    oncopy,
    classes
  }: SnippetProperties = $props();

  let copied = $state(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
      oncopy?.();
      setTimeout(() => {
        copied = false;
      }, 2000);
    } catch {
      // Clipboard API unavailable (non-secure context, iframe restrictions)
    }
  }
</script>

<div class="snippet {classes ?? ''}" data-pw={testId}>
  <code class="snippet-code">
    <span class="snippet-prompt">{prompt}</span>
    <span class="snippet-text">{text}</span>
  </code>
  {#if showCopyButton}
    <div class="snippet-copy">
      <Button onclick={handleCopy} ariaLabel="Copy to clipboard">
        {#if copied}
          <span class="snippet-copied">Copied!</span>
        {:else if typeof copyIcon === 'function'}
          {@render copyIcon()}
        {:else}
          <!-- eslint-disable svelte/no-at-html-tags -->
          <span class="snippet-copy-icon">{@html copySvg}</span>
        {/if}
      </Button>
    </div>
  {/if}
</div>

<style>
  .snippet {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--snippet-gap, 8px);
    background: var(--snippet-background, transparent);
    border: var(--snippet-border, 1px solid currentColor);
    border-radius: var(--snippet-border-radius, 6px);
    padding: var(--snippet-padding, 12px 16px);
    font-family: var(--snippet-font-family, monospace);
    font-size: var(--snippet-font-size, 14px);
    color: var(--snippet-color, currentColor);
    margin: var(--snippet-margin, 0);
  }

  .snippet-code {
    display: flex;
    align-items: center;
    overflow: hidden;
    flex: 1;
    min-width: 0;
  }

  .snippet-prompt {
    color: var(--snippet-prompt-color, currentColor);
    margin-right: var(--snippet-prompt-margin-right, 8px);
    flex-shrink: 0;
  }

  .snippet-text {
    color: var(--snippet-text-color, currentColor);
    font-family: var(--snippet-text-font-family, inherit);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .snippet-copy {
    --button-color: var(--snippet-copy-background, transparent);
    --button-text-color: var(--snippet-copy-color, currentColor);
    --button-border: var(--snippet-copy-border, none);
    --button-padding: var(--snippet-copy-padding, 4px);
    --button-border-radius: var(--snippet-copy-border-radius, 4px);
    --button-cursor: var(--snippet-copy-cursor, pointer);
    --button-hover-color: var(--snippet-copy-hover-background, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .snippet-copy-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--snippet-copy-size, 16px);
    height: var(--snippet-copy-size, 16px);
  }

  .snippet-copy-icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  .snippet-copied {
    color: var(--snippet-copied-color, currentColor);
    font-size: var(--snippet-copied-font-size, 12px);
    font-family: var(--snippet-font-family, monospace);
  }
</style>
