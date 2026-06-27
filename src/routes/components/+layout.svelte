<script lang="ts">
  import { page } from '$app/stores';
  import { marked } from 'marked';
  import { componentNav } from './_nav';
  import DocTabs from './DocTabs.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  const rawDocs: Record<string, string> = import.meta.glob('../../../docs/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
  });

  const docs: Record<string, string> = {};
  for (const [path, content] of Object.entries(rawDocs)) {
    const filename = path.split('/').pop()?.replace('.md', '') ?? '';
    docs[filename] = content;
  }

  const slugToName: Record<string, string> = {};
  for (const group of componentNav) {
    for (const item of group.items) {
      slugToName[item.slug] = item.name;
    }
  }

  // Each doc's `## ` sections are routed into one of these tabs.
  const TAB_ORDER = ['Usage', 'Props', 'Events', 'Styling'];
  const HEADING_TO_TAB: Record<string, string> = {
    Usage: 'Usage',
    'Web Component': 'Usage',
    Import: 'Usage',
    Props: 'Props',
    Snippets: 'Props',
    'Type Reference': 'Props',
    'Internal Dependencies': 'Props',
    Methods: 'Props',
    Properties: 'Props',
    Accessibility: 'Props',
    'Keyboard Interactions': 'Props',
    'Key Symbols': 'Props',
    Events: 'Events',
    'CSS Variables': 'Styling',
    'CSS Custom Properties': 'Styling'
  };

  function renderMarkdown(md: string): string {
    const result = marked.parse(md);
    return typeof result === 'string' ? result : '';
  }

  type DocTab = { label: string; html: string };
  type ParsedDoc = { preamble: string; tabs: DocTab[] };

  function parseDoc(md: string): ParsedDoc {
    const withoutTitle = md.replace(/^# .+\n+/, '');
    const lines = withoutTitle.split('\n');

    const preambleLines: string[] = [];
    const sections: { heading: string; body: string }[] = [];
    let current: { heading: string; body: string } | null = null;

    for (const line of lines) {
      const match = line.match(/^## (.+)$/);
      if (match !== null) {
        if (current !== null) {
          sections.push(current);
        }
        current = { heading: match[1].trim(), body: line + '\n' };
      } else if (current !== null) {
        current.body += line + '\n';
      } else {
        preambleLines.push(line);
      }
    }
    if (current !== null) {
      sections.push(current);
    }

    const buckets: Record<string, string[]> = { Usage: [], Props: [], Events: [], Styling: [] };
    for (const section of sections) {
      const tab = HEADING_TO_TAB[section.heading] ?? 'Usage';
      buckets[tab].push(section.body);
    }

    const tabs: DocTab[] = [];
    for (const label of TAB_ORDER) {
      const tabMarkdown = buckets[label].join('\n').trim();
      if (tabMarkdown.length > 0) {
        tabs.push({ label, html: renderMarkdown(tabMarkdown) });
      }
    }

    return { preamble: renderMarkdown(preambleLines.join('\n').trim()), tabs };
  }

  let currentSlug = $derived($page.url.pathname.split('/').pop() ?? '');
  let docName = $derived(slugToName[currentSlug] ?? '');
  let rawMarkdown = $derived(docs[docName] ?? '');
  let parsed = $derived(rawMarkdown.length > 0 ? parseDoc(rawMarkdown) : null);
</script>

{@render children()}

{#if parsed !== null && parsed.tabs.length > 0}
  <section class="docs-section">
    <hr class="docs-divider" />
    <h2 class="docs-title">Documentation</h2>
    {#if parsed.preamble.length > 0}
      <div class="markdown-body doc-preamble">
        <!-- eslint-disable svelte/no-at-html-tags -->
        {@html parsed.preamble}
      </div>
    {/if}
    {#key currentSlug}
      <DocTabs tabs={parsed.tabs} />
    {/key}
  </section>
{/if}

<style>
  .docs-section {
    margin-top: 40px;
  }

  .docs-divider {
    border: none;
    border-top: 1px solid var(--doc-border);
    margin-bottom: 24px;
  }

  .docs-title {
    font-family: var(--doc-font-heading);
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--doc-text-heading);
    margin: 0 0 16px;
  }

  .doc-preamble {
    margin-bottom: 20px;
  }

  :global(.markdown-body h2) {
    font-family: var(--doc-font-heading);
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--doc-text-heading);
    margin: 28px 0 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--doc-border-light);
  }

  :global(.markdown-body h3) {
    font-size: 1rem;
    font-weight: 600;
    color: var(--doc-text-primary);
    margin: 20px 0 8px;
  }

  :global(.markdown-body p) {
    font-size: 14px;
    line-height: 1.6;
    color: var(--doc-text-primary);
    margin: 8px 0;
  }

  :global(.markdown-body table) {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    margin: 12px 0;
  }

  :global(.markdown-body th) {
    text-align: left;
    padding: 8px 12px;
    background: var(--doc-table-header-bg);
    border: 1px solid var(--doc-border);
    font-weight: 600;
    color: var(--doc-text-primary);
  }

  :global(.markdown-body td) {
    padding: 8px 12px;
    border: 1px solid var(--doc-border);
    color: var(--doc-text-secondary);
    vertical-align: top;
  }

  :global(.markdown-body tr:hover td) {
    background: var(--doc-demo-bg);
  }

  :global(.markdown-body code) {
    font-family: var(--doc-font-mono);
    font-size: 12.5px;
    background: var(--doc-code-bg);
    padding: 2px 6px;
    border-radius: 6px;
    color: var(--doc-code-color);
  }

  :global(.markdown-body pre) {
    background: var(--doc-pre-bg);
    border: 1px solid var(--doc-border);
    border-radius: var(--doc-radius-lg);
    padding: 18px 20px;
    overflow-x: auto;
    margin: 14px 0;
    box-shadow: var(--doc-shadow);
  }

  :global(.markdown-body pre code) {
    background: none;
    color: var(--doc-pre-color);
    padding: 0;
    font-family: var(--doc-font-mono);
    font-size: 13px;
    line-height: 1.6;
  }

  :global(.markdown-body ul),
  :global(.markdown-body ol) {
    padding-left: 20px;
    margin: 8px 0;
  }

  :global(.markdown-body li) {
    font-size: 14px;
    color: var(--doc-text-primary);
    line-height: 1.6;
    margin: 4px 0;
  }

  :global(.markdown-body hr) {
    border: none;
    border-top: 1px solid var(--doc-border);
    margin: 24px 0;
  }
</style>
