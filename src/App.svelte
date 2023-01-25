<script lang="ts">
  import "spectre.css";
  import Settings from "./lib/Settings.svelte";
  import Tab from "./lib/Tab.svelte";

  import { totalBonus, modifiers } from './lib/stores.js';
  import { writable } from "svelte/store";

  let isOpen = false;

  function close() {
    isOpen = false;
  }

  function open() {
    isOpen = true;
  }

</script>

<main>
  <div class="bg-primary">
    <button class="btn" on:click={open}>
      Settings
    </button>
  </div>
  <Tab/>


  <div class="modal {isOpen ? 'active' : ''}" id="modal-id">
    <a href="#close" class="modal-overlay" aria-label="Close" on:click={close}></a>
    <div class="modal-container">
      <div class="modal-header">
        <a href="#close" class="btn btn-clear float-right" aria-label="Close" on:click={close}></a>
        <div class="modal-title h5">Settings</div>
      </div>
      <div class="modal-body">
        <div class="content">
          <Settings/>
        </div>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</main>

<style>

</style>
