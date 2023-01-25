import { writable, derived } from 'svelte/store';

const storedBase = +(localStorage.getItem('base') || 5);
const storedModifiers = localStorage.getItem('modifiers');
let storedData = [];
try {
    storedData = JSON.parse(storedModifiers);
} catch {
    console.log('no stored modifiers');
}

export const defaultBase = writable(storedBase);
defaultBase.subscribe(val => localStorage.setItem('base', `${val}`))

export const modifiers = writable(storedData || [
    { label: "Blinded", value: 3, op: "ADD" },
    { label: "Deafened", value: 3, op: "ADD" },
    { label: "Frightened", value: 3, op: "ADD" },
    { label: "Paralyzed", value: 3, op: "ADD" },
    { label: "Poisoned", value: 3, op: "ADD" },
    { label: "Incapacitated", value: 3, op: "ADD" },
    { label: "Stunned", value: 3, op: "ADD" },

    { label: "Grappled", value: 1, op: "ADD" },
    { label: "Restrained", value: 1, op: "ADD" },
    { label: "Prone", value: 1, op: "ADD" },

    { label: "Petrified", value: 5, op: "ADD" },
    { label: "Unconscious", value: 5, op: "ADD" },

    { label: "Below half health", value: 7, op: "ADD" },

    { label: "Below 10 hit points", value: 5, op: "ADD" },
]);
modifiers.subscribe(val => localStorage.setItem('modifiers', JSON.stringify(val)));

export const totalBonus
= derived(modifiers, $modifiers => $modifiers.reduce((sum, item) => {
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
  }, 0));
