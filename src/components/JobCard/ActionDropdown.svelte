<script lang="ts">
	import { savedJobs } from '../../stores/saved';
	import type { JobPost } from '../../stores/store';

	export let jobData: JobPost;

	type ListOptions = 'considering' | 'applied' | 'rejected' | 'offer';

	const options: ListOptions[] = ['considering', 'applied', 'rejected', 'offer'];

	function addToList(list: ListOptions) {
		if (!$savedJobs[list]) $savedJobs[list] = {};

		if ($savedJobs[list][jobData.id]) {
			const savedCopy = { ...$savedJobs };
			delete savedCopy[list][jobData.id];
			console.log('deleting');
			$savedJobs = savedCopy;
			return;
		}

		$savedJobs[list][jobData.id] = jobData;
	}

	$: jobAlreadySaved = $savedJobs.considering[jobData.id];

	$: optionButtontext = (option: ListOptions): string => {
		if (!$savedJobs[option]) $savedJobs[option] = {};

		if ($savedJobs[option][jobData.id]) {
			return `Remove from ${option}`;
		}

		return option.toUpperCase();
	};
</script>

<div class="job-card-actions">
	<div>Add to list +</div>
	<div class="action-buttons">
		{#each options as option (option)}
			<button on:click={() => addToList(option)}>
				{optionButtontext(option)}
			</button>
		{/each}
	</div>
</div>

<style>
	button {
		color: rgb(4, 51, 80);
		background-color: var(--red, #5e81ac);
		color: var(--text-red);
		border-radius: 2px;
		font-size: 1.1em;
		width: 100%;
		margin-top: auto;
	}

	button:hover {
		font-weight: 600;
		background-color: var(--red, #53759e);
	}
</style>
