<script lang="ts">
	import type { JobPost } from '../../stores/store';
	import ActionDropdown from './ActionDropdown.svelte';
	import * as linkify from 'linkifyjs';
	import linkifyHtml from 'linkify-html';
	import { savedJobs } from '../../stores/saved';

	export let jobData: JobPost;

	$: ({ id, title, content, dateTime } = jobData);

	function truncate(content: string, word_limit: number) {
		const splitContent = content.split(' ');
		const appendDots = splitContent.length - 1 > word_limit ? '...' : '';
		return splitContent.splice(0, word_limit).join(' ') + appendDots;
	}

	$: jobAlreadySaved = false;

	$: currentClass = jobAlreadySaved ? 'job-saved' : '';
</script>

<article class="job-card {currentClass}">
	<a href={`https://news.ycombinator.com/item?id=${id}`} target="_blank" rel="noopener noreferrer">
		link to posting
	</a>

	<h2>{truncate(title, 7)}</h2>
	<p>{@html linkifyHtml(truncate(content, 60), { target: { url: '_blank' } })}</p>
	<ActionDropdown {jobData} />
</article>

<style>
	article {
		display: flex;
		flex-flow: column;
		background: #3b4252;
		color: #eceff4;
		padding: 10px;
		border-radius: 5px;
		word-break: break-word;
	}

	:global(.job-card p a) {
		color: #6adad8;
		font-weight: bold;
	}

	.job-saved {
		--red: rgb(255, 193, 193);
		--text-red: rgb(26, 2, 2);
	}
</style>
