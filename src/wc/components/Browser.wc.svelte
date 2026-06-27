<svelte:options
  customElement={{
    tag: 'pui-browser',
    shadow: 'open',
    props: {
      url: { type: 'String', reflect: true },
      title: { type: 'String', reflect: true },
      showAddressBar: { type: 'Boolean', reflect: true, attribute: 'show-address-bar' },
      showTabBar: { type: 'Boolean', reflect: true, attribute: 'show-tab-bar' },
      shadow: { type: 'Boolean', reflect: true },
      rounded: { type: 'Boolean', reflect: true },
      testId: { type: 'String', attribute: 'test-id' },
      lockIcon: { type: 'Object' },
      classes: { type: 'String' }
    }
  }}
/>

<script lang="ts">
  import Browser from '$lib/Browser/Browser.svelte';
  let props = $props();
</script>

<Browser {...props}>
  {#snippet children()}
    <slot></slot>
  {/snippet}
  {#snippet lockIcon()}
    <slot name="lock-icon"></slot>
  {/snippet}
</Browser>
