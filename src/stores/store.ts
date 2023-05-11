import { browser } from "$app/environment";
import { writable, derived } from "svelte/store";


export interface JobPost {
    title: string,
    content: string,
    id: string,
    dateTime: string,
}

export interface scrapeMetaData {
    date_updated: string,
    month: string,
}
export const fetching = writable(true)

export const jobs = writable<JobPost[]>([])

export const searchQuery = writable('');

export const metaData = writable<scrapeMetaData>({date_updated: '', month: ''})

const trimmer = (s: string) => s.toLocaleLowerCase().trim()

export const filtered = derived(
    [jobs, searchQuery],
    ([$jobs, $searchQuery]) => {
        // Newest First
        $jobs.sort((a: JobPost, b: JobPost) => {
            return new Date(b.dateTime).valueOf() - new Date(a.dateTime).valueOf();
        })

        const trimmedQueryCheck = (str: string) => trimmer(str).includes(trimmer($searchQuery));
        return $jobs.filter(job => trimmedQueryCheck(job.content) || trimmedQueryCheck(job.title))
    }
)
const uri = 'https://api.samuelgraham.dev/whoishiring/jobs';

const fetchJobPosts = async () => {
    try {
        const response = await fetch(uri);
        const data = await response.json();          
        jobs.set(data.jobs);
        metaData.set({date_updated: data.date_updated, month: data.month})
        
        fetching.set(false)
    } catch (e) {
        console.error(e);
        fetching.set(false)
    }
};
if(browser){
    fetchJobPosts()
}