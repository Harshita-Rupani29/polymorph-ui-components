<script lang="ts">
  import type { IconStackProperties } from './properties';

  let { icons, testId, classes }: IconStackProperties = $props();
</script>

<div class="stack-container {classes ?? ''}" data-pw={testId}>
  {#each icons as icon, i (i)}
    <div class="stack-icon" style:z-index={icons.length - i}>
      {#if icon.type === 'image'}
        <img src={icon.content} alt="icon" />
      {:else}
        <div class="text-container">
          <span>{icon.content}</span>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .stack-container {
    display: flex;
    margin: var(--icon-stack-container-margin, 0px);
  }
  .stack-icon {
    display: flex;
    width: var(--icon-stack-icon-width, 36px);
    height: var(--icon-stack-icon-height, 36px);
    background: var(--icon-stack-icon-bg, white);
    border-radius: var(--icon-stack-icon-radius, 50%);
    margin: var(--icon-stack-icon-margin, 0px 0px 0px -14px);
    align-items: var(--icon-stack-icon-align-items, center);
    border: var(--icon-stack-icon-border, 1px solid currentColor);
    justify-content: var(--icon-stack-icon-justify-content, center);
    box-shadow: var(--icon-stack-icon-shadow, 0 2px 4px #00000026);
  }
  .stack-icon img {
    width: var(--icon-stack-img-width, 36px);
    height: var(--icon-stack-img-height, 36px);
  }
  .text-container {
    display: flex;
    width: var(--icon-stack-text-container-width, 36px);
    height: var(--icon-stack-text-container-height, 36px);
    align-items: var(--icon-stack-text-container-align-items, center);
    justify-content: var(--icon-stack-text-container-justify-content, center);
  }
  .text-container span {
    color: var(--icon-stack-text-color, inherit);
    font-size: var(--icon-stack-text-size, inherit);
    font-weight: var(--icon-stack-text-weight, inherit);
    text-align: var(--icon-stack-text-align, center);
  }
</style>
