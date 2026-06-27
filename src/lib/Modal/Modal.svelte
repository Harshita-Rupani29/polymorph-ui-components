<script lang="ts">
  import type { ModalProperties } from './properties';
  import { onMount, onDestroy, untrack } from 'svelte';
  import ModalAnimation from '$lib/Animations/ModalAnimation.svelte';
  import OverlayAnimation from '$lib/Animations/OverlayAnimation.svelte';
  import { createDebouncer } from '../utils';
  import Button from '$lib/Button/Button.svelte';

  let overlayDiv: HTMLDivElement | null = $state(null);
  let backPressed = false;

  let {
    size = 'fit-content',
    align = 'center',
    showOverlay = true,
    supportHardwareBackPress = false,
    enableTransition = true,
    transitionType = 'ALL',
    header = {},
    footer,
    debounceTime = 700,
    leftImageTestId,
    testId,
    content,
    footerSnippet,
    onclose,
    onheaderrightimageclick,
    onheaderleftimageclick,
    onprimarybuttonclick,
    onsecondarybuttonclick,
    onoverlayclick,
    onkeydown,
    classes
  }: ModalProperties = $props();

  // debounceTime is config captured once at init; untrack documents the intent
  // and avoids the state_referenced_locally warning.
  const debounce = untrack(() => createDebouncer(debounceTime));

  function handlePopstate() {
    backPressed = true;
    onclose?.();
  }

  function handleRightImageClick(event: MouseEvent): void {
    onheaderrightimageclick?.(event);
  }

  function handleLeftImageClick(event: MouseEvent): void {
    onheaderleftimageclick?.(event);
  }

  function handlePrimaryButtonClick(event: MouseEvent): void {
    onprimarybuttonclick?.(event);
  }

  function handleSecondaryButtonClick(event: MouseEvent): void {
    onsecondarybuttonclick?.(event);
  }

  function handleOverlayClick(event: MouseEvent) {
    if (event.target && event.target === overlayDiv) {
      debounce(() => {
        onoverlayclick?.();
      });
    }
  }

  function handleKeyDown(event: KeyboardEvent): void {
    onkeydown?.(event);
    let key = event?.key;
    if (key === 'Escape') {
      onoverlayclick?.();
    }
  }

  onMount(() => {
    document.body.style.overflow = 'hidden';
    if (supportHardwareBackPress) {
      history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopstate);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = '';
      if (supportHardwareBackPress) {
        if (!backPressed) {
          history.back();
        }
        window.removeEventListener('popstate', handlePopstate);
      }
    }
  });
</script>

<svelte:window onkeydown={handleKeyDown} />

{#if typeof content === 'function'}
  <OverlayAnimation>
    <div
      bind:this={overlayDiv}
      class="modal {align} {showOverlay ? 'overlay-active' : 'overlay-inactive'} {classes ?? ''}"
      onclick={handleOverlayClick}
      {onkeydown}
      role="button"
      tabindex="0"
      data-pw={testId}
    >
      <ModalAnimation enable={enableTransition} {align} {transitionType}>
        <div class="modal-content {size}">
          {#if (typeof header?.leftImage === 'string' && header.leftImage.length > 0) || (typeof header?.text === 'string' && header.text.length > 0) || (typeof header?.rightImage === 'string' && header.rightImage.length > 0)}
            <div class="header">
              {#if header.leftImage}
                <div
                  onclick={handleLeftImageClick}
                  {onkeydown}
                  role="button"
                  tabindex="0"
                  data-pw={leftImageTestId}
                >
                  <img class="header-left-img" src={header.leftImage} alt="" />
                </div>
              {/if}
              {#if header.text}
                <div class="header-text" data-pw={header.testId}>
                  {header.text}
                </div>
              {/if}
              {#if header.rightImage}
                <div
                  role="button"
                  tabindex="0"
                  onclick={handleRightImageClick}
                  {onkeydown}
                  data-pw={header.buttonTestId}
                >
                  <img class="header-right-img" src={header.rightImage} alt="" />
                </div>
              {/if}
            </div>
          {/if}
          <div class="slot-content">
            {@render content?.()}
          </div>
          {#if typeof footerSnippet === 'function'}
            <div class="footer-content">
              {@render footerSnippet?.()}
            </div>
          {:else if typeof footer?.primaryButton === 'object' || typeof footer?.secondaryButton === 'object'}
            <div class="footer-content">
              <div class="footer-action-buttons">
                {#if footer.secondaryButton}
                  <div class="footer-secondary-button">
                    <Button {...footer.secondaryButton} onclick={handleSecondaryButtonClick} />
                  </div>
                {/if}
                {#if footer.primaryButton}
                  <div class="footer-primary-button">
                    <Button {...footer.primaryButton} onclick={handlePrimaryButtonClick} />
                  </div>
                {/if}
              </div>
            </div>
          {/if}
        </div>
      </ModalAnimation>
    </div>
  </OverlayAnimation>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: var(--modal-width, 100vw);
    height: var(--modal-height, 100vh);
    display: flex;
    flex-direction: column;
    z-index: var(--modal-z-index, 15);
    -webkit-tap-highlight-color: transparent;
    margin: var(--modal-margin);
  }

  .overlay-active {
    background-color: var(--modal-overlay-background-color, #00000066);
    pointer-events: auto;
  }

  .overlay-inactive {
    pointer-events: none;
  }

  .modal-content {
    pointer-events: auto;
    background-color: var(--modal-content-background-color, #ffffff);
    cursor: auto;
    display: flex;
    flex-direction: column;
    border-radius: var(--modal-border-radius, 8px);
    overflow: var(--modal-content-overflow, auto);
    border-top: var(--modal-content-border-top);
  }

  .slot-content {
    display: var(--modal-display, flex);
    overflow-y: var(--modal-overflow-y, scroll);
    scrollbar-width: var(--modal-scrollbar-width, none);
  }

  .slot-content::-webkit-scrollbar {
    display: none;
  }

  .center {
    justify-content: var(--modal-center-justify-content, center);
    align-items: var(--modal-center-align-items, center);
  }

  .bottom {
    justify-content: var(--modal-bottom-justify-content, flex-end);
    align-items: var(--modal-bottom-align-items);
  }

  .top {
    justify-content: var(--modal-top-justify-content, flex-start);
    align-items: var(--modal-top-align-items);
  }

  .small {
    height: var(--modal-small-height, 20vh);
    width: var(--modal-small-width);
  }

  .medium {
    height: var(--modal-medium-height, 50vh);
    width: var(--modal-medium-width);
  }

  .large {
    height: var(--modal-large-height, 80vh);
    width: var(--modal-large-width);
  }

  .fit-content {
    height: fit-content;
    max-height: var(--modal-fit-content-max-height, 80vh);
  }

  .header {
    display: flex;
    background-color: var(--modal-header-background-color, transparent);
    padding: var(--modal-header-padding, 18px 20px);
    border-radius: var(--modal-header-border-radius, 0px);
    border-bottom: var(--modal-header-border-bottom, none);
  }

  .footer-content {
    display: flex;
    background-color: var(--modal-footer-background-color, transparent);
    padding: var(--modal-footer-padding, 18px 20px);
    border-radius: var(--modal-footer-border-radius, 0px);
    border-top: var(--modal-footer-border-top, none);
    justify-content: var(--modal-footer-justify-content, none);
  }

  .footer-action-buttons {
    display: flex;
    gap: var(--modal-footer-gap, 0px);
    width: var(--modal-footer-action-buttons-width, fit-content);
  }

  .footer-secondary-button {
    --button-max-height: var(--modal-footer-secondary-button-max-height);
    --button-max-width: var(--modal-footer-secondary-button-max-width);
    --button-font-family: var(--modal-footer-secondary-button-font-family);
    --button-font-weight: var(--modal-footer-secondary-button-font-weight, 500);
    --button-font-size: var(--modal-footer-secondary-button-font-size, 14px);
    --button-color: var(--modal-footer-secondary-button-color, #e4e4e7);
    --button-text-color: var(--modal-footer-secondary-button-text-color, #18181b);
    --button-height: var(--modal-footer-secondary-button-height, fit-content);
    --button-padding: var(--modal-footer-secondary-button-padding, 16px);
    --button-margin: var(--modal-footer-secondary-button-margin);
    --button-border-radius: var(--modal-footer-secondary-button-border-radius, 6px);
    --button-width: var(--modal-footer-secondary-button-width, fit-content);
    --button-cursor: var(--modal-footer-secondary-button-cursor, pointer);
    --button-opacity: var(--modal-footer-secondary-button-opacity, 1);
    --button-border: var(--modal-footer-secondary-button-border, none);
    --button-justify-content: var(--modal-footer-secondary-button-justify-content, center);
    --button-content-flex-direction: var(
      --modal-footer-secondary-button-content-flex-direction,
      row
    );
    --button-content-gap: var(--modal-footer-secondary-button-content-gap, 16px);
    --button-visibility: var(--modal-footer-secondary-button-visibility, visible);
    --button-box-shadow: var(--modal-footer-secondary-button-box-shadow, none);
    order: var(--modal-secondary-button-order, none);
    flex: var(--modal-footer-secondary-button-flex-value, none);
  }

  .footer-primary-button {
    --button-max-height: var(--modal-footer-primary-button-max-height);
    --button-max-width: var(--modal-footer-primary-button-max-width);
    --button-font-family: var(--modal-footer-primary-button-font-family);
    --button-font-weight: var(--modal-footer-primary-button-font-weight, 500);
    --button-font-size: var(--modal-footer-primary-button-font-size, 14px);
    --button-color: var(--modal-footer-primary-button-color, #18181b);
    --button-text-color: var(--modal-footer-primary-button-text-color, white);
    --button-height: var(--modal-footer-primary-button-height, fit-content);
    --button-padding: var(--modal-footer-primary-button-padding, 16px);
    --button-margin: var(--modal-footer-primary-button-margin);
    --button-border-radius: var(--modal-footer-primary-button-border-radius, 6px);
    --button-width: var(--modal-footer-primary-button-width, fit-content);
    --button-cursor: var(--modal-footer-primary-button-cursor, pointer);
    --button-opacity: var(--modal-footer-primary-button-opacity, 1);
    --button-border: var(--modal-footer-primary-button-border, none);
    --button-justify-content: var(--modal-footer-primary-button-justify-content, center);
    --button-content-flex-direction: var(--modal-footer-primary-button-content-flex-direction, row);
    --button-content-gap: var(--modal-footer-primary-button-content-gap, 16px);
    --button-visibility: var(--modal-footer-primary-button-visibility, visible);
    --button-box-shadow: var(--modal-footer-primary-button-box-shadow, none);
    order: var(--modal-primary-button-order, none);
    flex: var(--modal-footer-primary-button-flex-value, none);
  }

  .header-text {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: var(--modal-header-text-size, 16px);
    font-weight: var(--modal-header-text-weight);
    line-height: var(--modal-header-text-line-height);
    letter-spacing: var(--modal-header-text-letter-spacing);
  }

  .header-left-img,
  .header-right-img {
    padding-top: var(--modal-header-img-top-padding, 5px);
    cursor: pointer;
  }

  .header-left-img {
    margin: var(--modal-header-left-image-margin, 0px 18px 0px 0px);
    width: var(--modal-header-left-image-width, 25px);
    height: var(--modal-header-left-image-height, 25px);
  }

  .header-right-img {
    width: var(--modal-header-right-image-width, 25px);
    height: var(--modal-header-right-image-height, 25px);
    padding: var(--modal-header-right-image-padding);
  }
</style>
