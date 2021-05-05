<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ context }) => ({
		props: { questionnaire: context.questionnaire },
	});
</script>

<script lang="ts">
	import type { Questionnaire } from './_questionnaire';
	import { shuffle } from './_questionnaire';

	export let questionnaire: Questionnaire;

	$: questions = questionnaire.questions.map((category) => ({
		...category,
		questions: shuffle(category.questions),
	}));
</script>

<h1>Competency self-evaluation</h1>

<p>This tool is intended to help you assess your "T-shaped skills".</p>

<form action="/result" method="get">
	{#each questions as category}
		<fieldset>
			<legend><h2>{questionnaire.categories[category.slug]}</h2></legend>
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
