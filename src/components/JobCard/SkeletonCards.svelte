<script lang="ts">
	import type { JobPost } from '../../stores/store';

	const amount = new Array(25).fill(null);
</script>

{#each amount as a}
	<article class="skeleton">
		<div class="shine" />
	</article>
{/each}

<style>
	article {
		background: #3b4252;
		width: 100%;
		height: 350px;
		padding: 10px;
		border-radius: 5px;
		overflow: hidden;
		position: relative;
	}

	.shine {
		background-color: #404758;
		width: 120%;
		padding: 10px;
		left: 0;
		box-shadow: 0px 0px 29px #404758;
		position: absolute;
		animation: slide 1s infinite;
	}

	@keyframes slide {
		from {
			top: -10%;
		}
		to {
			top: 110%;
		}
	}
</style>
