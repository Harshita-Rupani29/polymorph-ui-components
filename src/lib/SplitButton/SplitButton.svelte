<script lang="ts">
  import type { SplitButtonProperties } from './properties';
  import type { MenuItem } from '../Menu/properties';
  import Button from '../Button/Button.svelte';
  import Menu from '../Menu/Menu.svelte';
  import chevronDownSmSvg from '$lib/assets/chevron-down-sm.svg?raw';

  let {
    text,
    items,
    disabled = false,
    testId,
    dropdownIcon,
    classes,
    onclick,
    onselect
  }: SplitButtonProperties = $props();

  let menuOpen = $state(false);

  function handlePrimaryClick(event: MouseEvent): void {
    if (disabled) {
      return;
    }
    onclick?.(event);
  }

  function handleMenuSelect(item: MenuItem): void {
    onselect?.(item);
  }
</script>

<div class="split-button {classes ?? ''}" class:disabled data-pw={testId}>
  <div class="split-button-primary">
    <Button {text} onclick={handlePrimaryClick} {disabled} />
  </div>
  <div class="split-button-trigger">
    <Menu {items} bind:open={menuOpen} onselect={handleMenuSelect}>
      {#snippet trigger()}
        <span class="split-button-arrow">
          {#if typeof dropdownIcon === 'function'}
            {@render dropdownIcon()}
          {:else}
            <!-- eslint-disable svelte/no-at-html-tags -->
            {@html chevronDownSmSvg}
          {/if}
        </span>
      {/snippet}
    </Menu>
  </div>
</div>

<style>
  .split-button {
    display: inline-flex;
    position: relative;
    gap: var(--split-button-gap, 0px);
  }

  .split-button.disabled .split-button-trigger {
    pointer-events: none;
  }

  .split-button-primary {
    --button-color: var(--split-button-primary-background, #18181b);
    --button-text-color: var(--split-button-primary-color, white);
    --button-padding: var(--split-button-primary-padding, 8px 16px);
    --button-font-size: var(--split-button-primary-font-size, 14px);
    --button-font-weight: var(--split-button-primary-font-weight, 500);
    --button-font-family: var(--split-button-primary-font-family);
    --button-border: var(--split-button-primary-border, none);
    --button-border-radius: var(--split-button-primary-border-radius, 6px 0 0 6px);
    --button-hover-color: var(
      --split-button-primary-hover-background,
      var(--split-button-primary-background, #18181b)
    );
    --button-hover-text-color: var(
      --split-button-primary-hover-color,
      var(--split-button-primary-color, white)
    );
    --button-disabled-opacity: var(--split-button-disabled-opacity, 0.4);
    --button-disabled-cursor: var(--split-button-disabled-cursor, not-allowed);
    display: flex;
  }

  .split-button-trigger {
    --menu-container-position: static;
    --menu-container-display: flex;
    --menu-trigger-focus-outline: none;
    --menu-dropdown-left: 0;
    --menu-min-width: 100%;
    --menu-item-color: var(--split-button-menu-item-color, #18181b);
    --menu-item-danger-color: var(--split-button-menu-item-danger-color, #18181b);
    --menu-item-hover-background-color: var(--split-button-menu-item-hover-background, #f4f4f5);
    --menu-item-focus-background-color: var(--split-button-menu-item-focus-background, #f4f4f5);
    --menu-item-danger-hover-background-color: var(
      --split-button-menu-item-danger-hover-background,
      #f4f4f5
    );
    --menu-item-danger-focus-background-color: var(
      --split-button-menu-item-danger-focus-background,
      #f4f4f5
    );
    --menu-border: var(--split-button-menu-border, 1px solid #e4e4e7);
    --menu-separator-color: var(--split-button-menu-separator-color, #e4e4e7);
    border-left: var(--split-button-trigger-separator, 1px solid rgba(255, 255, 255, 0.3));
    display: flex;
    align-items: stretch;
    background-color: var(--split-button-trigger-background, #18181b);
    border-radius: var(--split-button-trigger-border-radius, 0 6px 6px 0);
    color: var(--split-button-trigger-color, white);
    cursor: pointer;
  }

  .split-button.disabled .split-button-trigger {
    opacity: var(--split-button-disabled-opacity, 0.4);
    cursor: var(--split-button-disabled-cursor, not-allowed);
  }

  .split-button-trigger:hover {
    background-color: var(
      --split-button-trigger-hover-background,
      var(--split-button-trigger-background, #18181b)
    );
    color: var(--split-button-trigger-hover-color, var(--split-button-trigger-color, white));
  }

  .split-button-trigger :global(.menu-trigger) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--split-button-trigger-padding, 8px);
  }

  .split-button-arrow {
    display: inline-flex;
    width: var(--split-button-arrow-width, 10px);
    height: var(--split-button-arrow-height, 6px);
  }

  .split-button-arrow :global(svg) {
    width: 100%;
    height: 100%;
  }
</style>
