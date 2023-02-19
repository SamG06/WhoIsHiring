<script lang="ts">
	import type { JobPost } from '../../stores/store';
	import SaveButton from './SaveButton.svelte';
	import * as linkify from 'linkifyjs';
	import linkifyHtml from 'linkify-html';
	import { savedJobs } from '../../stores/saved';

	export let jobData: JobPost;

	$: ({ id, title, content, dateTime } = jobData);

	function truncate(content: string, word_limit: number) {
		const splitContent = content.split(' ');
		const appendDots = splitContent.length > word_limit ? '...' : '';
		return splitContent.splice(0, word_limit).join(' ') + appendDots;
	}

	$: jobAlreadySaved = $savedJobs.some((j) => j.id == jobData.id);

	$: currentClass = jobAlreadySaved ? 'job-saved' : '';
</script>

<article class="job-card {currentClass}">
	<a href={`https://news.ycombinator.com/item?id=${id}`} target="_blank" rel="noopener noreferrer">
		link to posting
	</a>

	<h2>{truncate(title, 7)}</h2>
	<p>{@html linkifyHtml(truncate(content, 60), { target: { url: '_blank' } })}</p>
	<SaveButton {jobData} />
</article>

<style>
	article {
		display: flex;
		flex-flow: column;
		background: rgb(249, 249, 249);
		padding: 10px;
		border-radius: 5px;
		word-break: break-all;
	}

	.job-saved {
		--red: rgb(255, 193, 193);
		--text-red: rgb(26, 2, 2);
	}
</style>
