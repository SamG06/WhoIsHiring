<script>
	import da from 'date-fns/locale/da';
	import { onMount } from 'svelte';
	import { filtered, jobs, searchQuery } from '../../stores/store';
	import JobCard from '../JobCard/JobCard.svelte';
	let data;

	const uri = 'http://0.0.0.0:3001/whoishiring/jobs';

	const fetchJobPosts = async () => {
		try {
			const response = await fetch(uri);
			const data = await response.json();
			console.log(data);
			jobs.set(data.jobs);
		} catch (e) {
			console.error(e);
			return [];
		}
	};

	onMount(() => {
		fetchJobPosts();
	});
</script>

<input bind:value={$searchQuery} type="text" placeholder="search" />

<div class="job-list">
	{#each $filtered as jobPost}
		<JobCard jobData={jobPost} />
	{/each}
</div>

<style>
	.job-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 20px;
	}
</style>
