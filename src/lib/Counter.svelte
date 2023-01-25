<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";


  const modifiers = getContext<Writable<any[]>>('modifiers');
  const base = getContext<Writable<number>>('base');
</script>


<div class="container">
  <label>
    Base: <input type=number bind:value={$base}>
  </label>

  {#each $modifiers as item, index}
    {#if !item.hidden && item.label}
      <label class="form-checkbox">
        <input type=checkbox bind:checked={item.checked}>
        <i class="form-icon"></i> {item.label}
      </label>
    {/if}
  {/each}
</div>
