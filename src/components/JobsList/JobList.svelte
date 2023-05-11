<script lang="ts">
	import { browser } from '$app/environment';
	import { fetching, filtered, jobs, searchQuery } from '../../stores/store';
	import JobCard from '../JobCard/JobCard.svelte';
	import SkeletonCards from '../JobCard/SkeletonCards.svelte';

	let y = 0;
	let showingAmount = 20;

	filtered.subscribe((value) => {
		showingAmount = 20;
	});

	const changingY = (yAxis: number) => {
		if (!browser) return;
		const distanceScrolled = window.innerHeight + yAxis;
		const fullHeight = document.body.offsetHeight - 800;
		const scrolledToBottom = distanceScrolled >= fullHeight;
		if (scrolledToBottom) {
			const hitJobLimit = showingAmount + 30 < $jobs.length;

			if (hitJobLimit) {
				showingAmount += 30;
				return;
			}

			showingAmount = $jobs.length;
		}
	};

	$: changingY(y);
</script>

<input bind:value={$searchQuery} type="text" class="search-bar" placeholder="Add Job Keywords" />

<!-- <button>Show Saved Jobs</button> -->
<div class="job-list">
	{#if $fetching}
		<SkeletonCards />
	{:else}
		{#if $filtered.length === 0}
			No Jobs Found
		{/if}
		{#each $filtered.slice(0, showingAmount) as jobPost}
			<JobCard jobData={jobPost} />
		{/each}
	{/if}
</div>

<svelte:window bind:scrollY={y} />

<style>
	.job-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 20px;
		width: 100%;
	}

	.search-bar {
		border: none;
		padding: 10px;
		width: 90%;
		max-width: 1000px;
		border-radius: 10px;
		margin-top: 50px;
		margin-bottom: 50px;
	}
</style>
