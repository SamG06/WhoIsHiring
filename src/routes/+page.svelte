<script>
	import { formatDistance } from 'date-fns';
	import JobList from '../components/JobsList/JobList.svelte';
	import { savedJobs } from '../stores/saved';
	import { filtered, metaData } from '../stores/store';

	let y = 0;

	const hackerLink = 'https://news.ycombinator.com/submitted?id=whoishiring';
</script>

<div class="main-container">
	<header>
		<div class="content">
			<h1 class="header-align-top">WhoisHiring Job Board</h1>
			<p class="header-align-top">
				Organizing all the job posting from
				<a href={hackerLink} target="_blank" rel="noopener noreferrer">hackernews</a>
			</p>
			<div>
				{#if $metaData.month}
					{$metaData.month} - Updated {formatDistance(
						new Date($metaData.date_updated),
						new Date(),
						{
							addSuffix: true
						}
					)}
				{/if}
			</div>
			<!-- <div class="header-lower">
				<h2>February Jobs</h2>
				<p>(updated: Today 23 minutes ago...)</p>
				<div style="display:flex;gap:5px">
					<p>{$filtered.length} Jobs Displayed</p>
					<p>{$savedJobs.length} Jobs Saved</p>
				</div>
			</div> -->
		</div>
	</header>

	<div class="content">
		<JobList />
	</div>
</div>
<svelte:window bind:scrollY={y} />

<style>
	.main-container {
		display: flex;
		flex-flow: column;
		align-items: center;
		width: 100%;
		background-color: #2e3440;
	}
	.content {
		display: flex;
		flex-flow: column;
		align-items: center;
		width: 95%;
		max-width: 1300px;
	}
	h1 {
		font-weight: 500;
		font-size: 3em;
	}

	.header-align-top {
		text-align: center;
		margin-left: 10px;
	}

	p.header-align-top {
		margin-top: 0;
		font-size: 0.9em;
	}
	hr {
		width: 100%;
	}
	header {
		display: flex;
		flex-flow: column;
		background-color: #2e3440;
		color: white;
		width: 100%;
		text-align: center;
		font-weight: 100;
		align-items: center;
	}

	.header-lower {
		margin-top: auto;
		margin-bottom: 20px;
	}
	header a {
		color: white;
		font-weight: bold;
		text-decoration: none;
	}
</style>
