import { writable, derived } from "svelte/store";


export interface JobPost {
    title: string,
    content: string,
    id: string,
    dateTime: string,
}

export const jobs = writable<JobPost[]>([])

export const searchQuery = writable('');

const trimmer = (s: string) => s.toLocaleLowerCase().trim()

export const filtered = derived(
    [jobs, searchQuery],
    ([$jobs, $searchQuery]) => {
        return $jobs.filter(job => trimmer(job.content).includes(trimmer($searchQuery)))
    }
)

