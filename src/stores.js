import { writable } from 'svelte/store';

export const currentCategory = writable('development');
export const completedCategories = writable([]);