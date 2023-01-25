
<script lang="ts">
    import { modifiers, defaultBase } from './stores.js';
    import Item from './SettingsItem.svelte';

    function save(obj, idx) {
        modifiers.update(arr => [...arr.slice(0, idx), obj, ...arr.slice(idx + 1)]);
    }

    function add() {
        modifiers.update(arr => [...arr, { label: '', value: 0, op: 'ADD' }])
    }

    function deleteItem(item, idx: number) {
        if (confirm(`Are you sure you want to delete ${item.label}?`)) {
            modifiers.update(arr => [...arr.slice(0, idx), ...arr.slice(idx + 1)]);
        }
    }
</script>


<main class="container">
    <label>
        Default Base:
        <input type="number" bind:value={$defaultBase} />
        (Takes effect on refresh)
    </label>
    <br/>

    {#each $modifiers as item, index}
        <div class="grid">
            <Item item={item} on:save={(event) => save(event.detail, index)} on:delete={(event) => deleteItem(event.detail, index)}/>
        </div>
    {/each}

    <button class="btn" on:click={add}>Add</button>
</main>
