<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ context }) => ({
		props: { questionnaire: context.questionnaire },
	});
</script>

<script lang="ts">
	import type { Questionnaire, Answers } from './_questionnaire';
	import type { Writable } from 'svelte/store';
	import { currentCategory, completedCategories } from '../stores.js';

	export let questionnaire: Questionnaire;

	let categories = Object.keys(questionnaire.categories);
	let answers: Answers = questionnaire.categories[$currentCategory].questions
		.reduce((acc, { level }, idx) => ({ ...acc, [`${$currentCategory}-${level}-${idx}`]: null }), {})

	let agreementGrades = ['Fully disagree', 'Mostly disagree', 'Mostly agree', 'Fully agree'];

	function handleOnSubmit() {
		console.log(answers);
		const currentCategoryIndex = categories.indexOf($currentCategory);
		if (currentCategoryIndex <= categories.length - 2) {
			(completedCategories as Writable<string[]>).set([...$completedCategories, $currentCategory]);
			$currentCategory = categories[currentCategoryIndex + 1];
		} else {
			// time for results
		}

	}

</script>

<h1>Competency self-evaluation</h1>

<p>This tool is intended to help you assess your "T-shaped skills" and help you find areas would you like focus on for growth.</p>
<p>Please proceed through the steps and select how much each of the statements describe you</p>

<div class="form-frame">

	<form on:submit|preventDefault={handleOnSubmit}>
		<fieldset>
			<legend> <h2>{questionnaire.categories[$currentCategory].name}</h2></legend>

			{#each questionnaire.categories[$currentCategory].questions as question, index}
				<fieldset>
					<legend>{question.text}</legend>
					<div>
						{#each agreementGrades as grade, gradeIndex}
							<label
								><input
									type="radio"
									name="{$currentCategory}-{question.level}-{index}"
									bind:group={answers[`${$currentCategory}-${question.level}-${index}`]}
									value={gradeIndex}
									required
								/>
								<span>{grade}</span>
							</label>
						{/each}
					</div>
				</fieldset>
			{/each}
		</fieldset>
		<button>Next</button>
	</form>

	<aside>
		<ul>
			{#each categories as cat}
				<li
					class:completed={$completedCategories.includes(cat)}
					class:active={cat === $currentCategory}
					on:click={() => $completedCategories.includes(cat) ? $currentCategory = cat : null}
				>
					{questionnaire.categories[cat].name}
					({questionnaire.categories[cat].questions.length})
					{#if $completedCategories.includes(cat)}
						<span >✅</span>
					{/if}
				</li>
			{/each}

		</ul>

	</aside>

</div>


<style>
	.form-frame {
		display: flex;
		flex-direction: row;
	}
	.form-frame form {
		flex: 1 0 75%;
	}
	.form-frame aside {
		flex: 1 0 25%;
	}

	aside {
		position: relative;
	}

	aside ul {
		list-style: none;
		margin-left: 0;
		top: 20px;
		position: sticky;
	}

	aside ul li {
		color: #aaa;
	}
	aside ul li.completed {
		color: rgb(6, 160, 6);
		cursor: pointer;
	}

	aside ul li.active {
		color: #333;
	}


</style>