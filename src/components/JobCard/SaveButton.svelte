<script lang="ts">
	import { savedJobs } from '../../stores/saved';
	import type { JobPost } from '../../stores/store';

	export let jobData: JobPost;

	function savedJob() {
		const alreadySaved = $savedJobs.some(({ id }) => id === jobData.id);
		if (alreadySaved) return;
		$savedJobs = [...$savedJobs, jobData];
	}
</script>

<button on:click={() => savedJob()} type="button">Save Job</button>

<style>
</style>
