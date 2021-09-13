import { writable } from 'svelte/store';

// for signup/signin
export const email = writable('');
export const password = writable('');
export const userType = writable(''); // 'customer' or 'merchant'
export const name = writable('');

export const currentUser = writable(null);