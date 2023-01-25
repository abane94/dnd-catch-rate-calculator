<script lang="ts">
    import "spectre.css";
    import { setContext } from "svelte";
    import Counter from "./Counter.svelte";
    import Results from "./Results.svelte";

    import { modifiers, defaultBase } from "./stores.js";
    import { writable, derived, type Writable } from "svelte/store";

    const data = writable($modifiers.map((mod) => Object.assign({}, mod)));
    const base = writable($defaultBase);

    setContext("modifiers", data);
    setContext('base', base);

    modifiers.subscribe((mods) => {
        const labels = Array.from(
            new Set(...mods.map((m) => m.label), ...$data.map((m) => m.label))
        );
        for (const label of labels) {
            const newMod = mods.find((m) => m.label === label);
            const idx = $data.find((m) => m.label === label);
            if (newMod) {
                const idx = $data.find((m) => m.label === label);
                if (idx > -1) {
                    data.update((mods) => {
                        mods[idx] = Object.assign(mods[idx], newMod);
                        return mods;
                    });
                } else {
                    data.update((mods) => [...mods, Object.assign({}, newMod)]);
                }
            } else if (idx > -1) {
                data.update((mods) => mods.splice(idx, 1));
            }
        }
    });

    export const totalBonus = derived([data, base], ([$modifiers, $baseValue]) =>
        $modifiers.reduce((sum, item) => {
            if (!item.checked) {
                return sum;
            }
            switch (item.op) {
                case "ADD":
                    return sum + item.value;
                case "SUB":
                    return sum - item.value;
                default:
                    break;
            }
        }, $baseValue)
    );

</script>

<div class="tab-content">
    <div class="container">
        <div class="columns">
            <div class="column col-xs-0 col-sm-0 col-md-1 col-lg-2 col-xl-2" />

            <div class="column col-xs-6 col-sm-6 col-md-5 col-lg-4 col-xl-4">
                <div class="panel">
                    <div class="panel-header">
                        <div class="panel-title">Modifiers</div>
                    </div>
                    <div class="panel-body">
                        <Counter />
                    </div>
                </div>
            </div>

            <div class="column col-xs-6 col-sm-6 col-md-5 col-lg-4 col-xl-4">
                <div class="panel">
                    <div class="panel-header">
                        <div class="panel-title">Results</div>
                    </div>
                    <div class="panel-body">
                        <Results />
                    </div>
                    <div class="panel-footer">
                        <b>Total: {$totalBonus}</b>
                    </div>
                </div>
            </div>

            <div class="column col-xs-0 col-sm-0 col-md-1 col-lg-2 col-xl-2" />
        </div>
    </div>
</div>

<style>
</style>
