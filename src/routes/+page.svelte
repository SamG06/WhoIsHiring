<script>
	import JobList from '../components/JobsList/JobList.svelte';
	import { filtered } from '../stores/store';
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
			<hr />
			<div class="header-lower">
				<h2>February Jobs</h2>
				<p>(updated: Today 23 minutes ago...)</p>
				<p>{$filtered.length} Jobs Displayed</p>
			</div>
		</div>
	</header>

	<div class="content">
		<JobList />
	</div>
</div>

<style>
	.main-container {
		display: flex;
		flex-flow: column;
		align-items: center;
		width: 100%;
	}
	.content {
		display: flex;
		flex-flow: column;
		align-items: center;
		width: 95%;
		max-width: 1300px;
	}

	h1 {
		font-weight: 200;
		font-size: 1.5em;
	}

	.header-align-top {
		text-align: left;
		margin-left: 10px;
		align-self: flex-start;
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
		background-color: rgb(22, 82, 154);
		color: white;
		height: 30vh;
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
