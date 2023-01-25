
<script lang="ts">
    import { getContext } from "svelte";
    import type { Readable, Writable } from "svelte/store";


    const modifiers = getContext<Writable<any[]>>('modifiers');
    const base = getContext<Writable<number>>('base');

    const opMap = {
        ADD: '+',
        SUB: '-'
    };
</script>


<main class="container">
    {$base}
    {#each $modifiers as item, index}
        {#if item.checked}
            <div class={item.op}>{opMap[item.op]} {item.value} - {item.label}</div>
        {/if}
    {/each}
</main>

<style>
    .ADD {
        background-color: lightgreen;
        color: white
    }
    .SUB {
        background-color: lightcoral;
        color: white
    }
</style>
