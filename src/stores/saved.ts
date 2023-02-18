import { browser } from "$app/environment";

import { writable, type Writable } from "svelte/store";

import type { JobPost } from "./store";

const saved = browser ? localStorage?.savedJobs ? JSON.parse(localStorage.savedJobs) : [] : []

export const savedJobs: Writable<JobPost[]> = writable(saved || [])

savedJobs.subscribe((value) => {
    if(browser){
        localStorage.savedJobs = JSON.stringify(value)
    }
})