<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/questions/all.json');
		return res.ok
			? { props: { categories: await res.json() } }
			: { error: new Error(await res.json()) };
	};
</script>

<script lang="ts">
	import type { Category } from './_questions';
	import { shuffle } from './_questions';
	export let categories: Category[];
	$: categoriesWithShuffledQuestions = categories.map((category) => ({
		...category,
		questions: shuffle(category.questions),
	}));
</script>

<h1>Competency self-evaluation</h1>
<p>This tool is intended to help you asses your "T-shaped skills".</p>
<form action="/results" method="get">
	{#each categoriesWithShuffledQuestions as category}
		<fieldset>
			<legend><h2>{category.name}</h2></legend>
			{#each category.questions as question, index}
				<fieldset>
					<legend>{question.question}</legend>
					<label
						><input
							type="radio"
							name="{category.slug}-{question.level}-{index}"
							value="0"
							required
						/>
						<span>Fully disagree</span></label
					>
					<label
						><input
							type="radio"
							name="{category.slug}-{question.level}-{index}"
							value="1"
							required
						/>
						<span>Mostly disagree</span></label
					>
					<label
						><input
							type="radio"
							name="{category.slug}-{question.level}-{index}"
							value="2"
							required
						/>
						<span>Mostly agree</span></label
					>
					<label
						><input
							type="radio"
							name="{category.slug}-{question.level}-{index}"
							value="3"
							required
						/>
						<span>Fully agree</span></label
					>
				</fieldset>
			{/each}
		</fieldset>
	{/each}
	<button>Submit</button>
</form>
