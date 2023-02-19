<script lang="ts">
	import { savedJobs } from '../../stores/saved';
	import type { JobPost } from '../../stores/store';

	export let jobData: JobPost;

	function savedJob() {
		const alreadySaved = $savedJobs.findIndex((j) => j.id === jobData.id);

		if (alreadySaved > -1) {
			$savedJobs = $savedJobs.filter(({ id }) => id !== jobData.id);
			console.log(alreadySaved);
			return;
		}

		$savedJobs = [...$savedJobs, jobData];
	}

	$: jobAlreadySaved = $savedJobs.some((j) => j.id == jobData.id);

	$: buttonText = jobAlreadySaved ? 'Remove Saved Job' : 'Save Job';
</script>

<button on:click={savedJob} type="button"> {buttonText} </button>

<style>
	button {
		color: rgb(4, 51, 80);
		background-color: var(--red, rgb(205, 243, 255));
		color: var(--text-red);
		border-radius: 10px;
		font-size: 1.1em;
		width: 100%;
		margin-top: auto;
	}
</style>
