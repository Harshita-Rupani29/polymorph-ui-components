<script lang="ts">
  import type { BadgeProperties } from './properties';

  let { image, value, testId, classes }: BadgeProperties = $props();
</script>

<div class="badge-icon {classes ?? ''}" data-pw={testId}>
  <div class="badge-wrap">
    <img class="icon-img" src={image} alt="" />
    <div class="badge">{value}</div>
  </div>
</div>

<style>
  .badge-wrap {
    position: relative;
    display: inline-block;
    margin: var(--badge-wrap-margin, 0px 12px 10px 0px);
    padding: var(--badge-wrap-padding, 8px 8px 8px 8px);
  }

  .badge {
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    line-height: 1;
    color: var(--badge-color, #fff);
    background-color: var(--badge-background, currentColor);
    font-size: var(--badge-font-size, 12px);
    font-family: var(--badge-font-family, inherit);
    padding: var(--badge-padding, 3px 8px);
    border-radius: var(--badge-border-radius, 100px);
    min-width: var(--badge-min-width, 18px);
    min-height: var(--badge-min-height, 18px);
    border: var(--badge-border, 1px solid #fff);
    top: var(--badge-top, 0);
    right: var(--badge-right, 0);
    bottom: var(--badge-bottom);
    left: var(--badge-left);
    z-index: 1;
  }

  .icon-img {
    border-radius: var(--badge-img-border-radius, 6px);
    width: var(--badge-img-width, 64px);
    height: var(--badge-img-height, 64px);
    object-fit: var(--badge-object-fit, contain);
    box-shadow: var(--badge-img-icon-shadow, 0 0 0 0.5px currentColor);
    background-color: var(--badge-img-background-color);
  }
</style>
