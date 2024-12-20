import { writable } from 'svelte/store'

export const selectedDaysStore = writable<{ [monthName: string]: string[] }>({})
