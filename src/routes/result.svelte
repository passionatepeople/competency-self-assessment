<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const prerender = false;

	export const load: Load = async ({ context }) => ({
		props: {
			questionnaire: context.questionnaire,
		},
	});
</script>

<script lang="ts">
	import type { Questionnaire } from './_questionnaire';
	import type { Results } from './_results';
	import { queryToResults } from './_results';

	export let questionnaire: Questionnaire;

	const results: Results =
		typeof window !== 'undefined'
			? queryToResults(new URLSearchParams(window.location.search))
			: {};
</script>

<h1>Result</h1>

<table>
	<tr>
		<th aria-hidden="true" />
		{#each questionnaire.levels as level}
			<th scope="col">{level}</th>
		{/each}
	</tr>
	{#each questionnaire.questions as { slug }}
		{#if results[slug]}
			<tr>
				<th scope="row">{questionnaire.categories[slug]}</th>
				{#each questionnaire.levels as name, level}
					<td>{results[slug][level].percent}%</td>
				{/each}
			</tr>
		{/if}
	{/each}
</table>
