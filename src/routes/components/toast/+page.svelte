<script lang="ts">
  import Button from '$lib/Button/Button.svelte';
  import Toast from '$lib/Toast/Toast.svelte';

  let showToast = $state(false);
</script>

<div class="page-header">
  <span class="category-badge">Feedback & Status</span>
  <h1>Toast</h1>
</div>

<div class="demo-row">
  <Button text="Show Toast" onclick={() => (showToast = true)} />
  {#if showToast}
    <Toast
      message="Operation completed successfully!"
      classes="toast-success"
      ontoasthide={() => (showToast = false)}
    />
  {/if}
</div>

<style>
  /* Variants are your CSS classes that set the toast's CSS variables —
     no built-in `type` presets. */
  :global(.toast-success) {
    --toast-background-color: #24aa5a;
    --toast-color: #fff;
    --toast-border-radius: 6px;
  }
</style>
