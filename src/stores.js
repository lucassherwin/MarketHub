import { writable } from 'svelte/store';

// for signup/signin
export const email = writable('');
export const password = writable('');
export const userType = writable(''); // 'customer' or 'merchant'
export const name = writable('');

export const currentUser = writable(null); // save the uid to query the doc and the userType -> [uid, userType]

export const currentMerchant = writable(null); // store merchant data when the merchant modal opens

export const cart = writable([]); // store users cart