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
        const trimmedQuery = trimmer($searchQuery);
        return $jobs.filter(job => trimmer(job.content).includes(trimmedQuery) || trimmer(job.title).includes(trimmedQuery))
    }
)

