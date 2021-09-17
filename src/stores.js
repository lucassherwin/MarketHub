import { writable } from 'svelte/store';

// for signup/signin
export const email = writable('');
export const password = writable('');
export const userType = writable('customers'); // 'customers' or 'merchants'
export const name = writable('');

export const currentMerchant = writable(null); // store merchant data when the merchant modal opens

export const cart = writable([]); // store users cart

export const currentMerchantProducts = writable([]);