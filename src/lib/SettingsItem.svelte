<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();


    export let item: {
        label: string;
        value: number;
        op: "ADD" | "SUB";
    };
    let editing = !item.label;

    let label;
    let value;
    let op;

    function save() {
        console.log(item);
        Object.assign(item, { label, value, op });
        editing = false;
        dispatch('save', item);
    }

    function cancel() {
        editing = false;
    }

    function edit() {
        ({ label, value, op } = item);
        editing = true;
    }

    function deleteItem() {
        dispatch('delete', item);
    }
</script>

<!-- <main class="container"> -->
{#if editing}
    <div class="container">
        <div class="columns">
            <span class="col-3">
                <input type="text" bind:value={label} />
            </span>
            <span class="col-2">
                <input type="number" bind:value />
            </span>
            <span class="col-2">
                <select bind:value={op}>
                    <!--  on:change="{() => answer = ''}" -->
                    <!-- {#each questions as question} -->
                    <option value="ADD"> Add </option>
                    <option value="SUB"> Subtract </option>
                    <!-- {/each} -->
                </select>
            </span>

            <span class="col-4 btn-group btn-group-block">
                <button class="btn" on:click={save}>
                    Save
                </button>
                <button class="btn" on:click={cancel}>
                    Cancel
                </button>
            </span>

            <!-- <span class="col-1">
        <button class="btn btn-action" on:click={save}>
            <i class="icon icon-check" />
        </button>
    </span>

    <span class="col-1">
        <button class="btn btn-action" on:click={cancel}>
            <i class="icon icon-cross" />
        </button>
    </span> -->
        </div>
    </div>
{:else}
    <div class="container">
        <div class="columns">
            <span class="col-3">
                {item.label}
            </span>

            <span class="col-2">
                {item.value}
            </span>

            <span class="col-2">
                {item.op}
            </span>

                <!-- <button class="btn btn-action s-circle" on:click={edit}>
                    Edit
                </button> -->

            <span class="col-4 btn-group btn-group-block">
                <button class="btn" on:click={edit}>
                    Edit
                </button>
                <button class="btn" on:click={deleteItem}>
                    Delete
                </button>
            </span>
            <!-- <span class="col-1">
                <button class="btn btn-action">
                    <i class="icon icon-cross" />
                </button>
            </span> -->
            <!-- <span class="col-1"></span> -->
        </div>
    </div>
{/if}

<!-- </main> -->
<style>
    input[type="number"] {
        max-width: 55px;
    }
</style>
