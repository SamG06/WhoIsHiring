import { browser } from "$app/environment";

import { writable, type Writable } from "svelte/store";

import type { JobPost } from "./store";

const defaultListObj = {considering: {}}
const saved = browser ? localStorage?.savedJobs ? JSON.parse(localStorage.savedJobs) : defaultListObj : defaultListObj

const sorting = 'date'

interface JobRecord extends JobPost {
    dateAdded: number,
}

type ListType = {
    [key: string]:JobRecord;
}

type SavedJobs = {
    considering: ListType
    applied: ListType
    rejected: ListType
    offer: ListType
}

export const savedJobs: Writable<SavedJobs> = writable(saved || {})

savedJobs.subscribe((value) => {
    if(browser){
            localStorage.savedJobs = JSON.stringify(value)
    }
})