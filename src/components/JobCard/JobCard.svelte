<script lang="ts">
	import type { JobPost } from '../../stores/store';
	import SaveButton from './SaveButton.svelte';
	import * as linkify from 'linkifyjs';
	import linkifyHtml from 'linkify-html';

	export let jobData: JobPost;

	$: ({ id, title, content, dateTime } = jobData);
</script>

<article class="job-card">
	<a href={`https://news.ycombinator.com/item?id=${id}`} target="_blank" rel="noopener noreferrer">
		link to posting
	</a>

	<h2>{title}</h2>
	<p>{@html linkifyHtml(content)}</p>
	<SaveButton {jobData} />
</article>
