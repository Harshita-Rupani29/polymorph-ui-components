<script lang="ts">
  import Tabs from '$lib/Tabs/Tabs.svelte';

  type DocTab = { label: string; html: string };

  let { tabs }: { tabs: DocTab[] } = $props();

  let activeIndex = $state(0);

  let safeIndex = $derived(activeIndex < tabs.length ? activeIndex : 0);
</script>

{#if tabs.length > 0}
  <div class="doc-tabs-bar">
    <Tabs items={tabs.map((t) => t.label)} bind:activeIndex />
  </div>
  <div class="markdown-body doc-tab-panel">
    <!-- eslint-disable svelte/no-at-html-tags -->
    {@html tabs[safeIndex]?.html ?? ''}
  </div>
{/if}

<style>
  .doc-tabs-bar {
    margin-bottom: 8px;
  }

  .doc-tab-panel {
    padding-top: 8px;
  }
</style>
