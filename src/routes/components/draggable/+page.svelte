<script lang="ts">
  import Draggable from '$lib/Draggable/Draggable.svelte';

  let x = $state(0);
  let y = $state(0);
</script>

<div class="page-header">
  <span class="category-badge">Layout &amp; Containers</span>
  <h1>Draggable</h1>
</div>

<div class="demo-row stage">
  <Draggable bind:x bind:y handle=".grip">
    <div class="card">
      <div class="grip">⠿ Drag me</div>
      <div class="body">
        Drag by the handle.<br />
        x: {Math.round(x)} · y: {Math.round(y)}
      </div>
    </div>
  </Draggable>
</div>

<style>
  .stage {
    min-height: 320px;
    align-items: flex-start;
    --draggable-cursor: default;
  }

  .card {
    width: 200px;
    background: #ffffff;
    border: 1px solid #d4d4d8;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .grip {
    padding: 8px 12px;
    background: #f4f4f5;
    border-bottom: 1px solid #e4e4e7;
    font-size: 13px;
    font-weight: 600;
    color: #3f3f46;
    cursor: grab;
    user-select: none;
  }

  .body {
    padding: 16px 12px;
    font-size: 13px;
    line-height: 1.5;
    color: #52525b;
  }
</style>
