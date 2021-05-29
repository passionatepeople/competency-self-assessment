<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ context }) => ({
		props: { questionnaire: context.questionnaire },
	});
</script>

<script lang="ts">
	import type { Questionnaire } from './_questionnaire';
	import type { Writable } from 'svelte/store';
	import { currentCategory, completedCategories, answers } from '../stores.js';

	export let questionnaire: Questionnaire;

	let categories = Object.keys(questionnaire.categories);

	let agreementGrades = ['Fully disagree', 'Mostly disagree', 'Mostly agree', 'Fully agree'];

	function handleOnSubmit() {
		console.log($answers);
		const currentCategoryIndex = categories.indexOf($currentCategory);
		if (currentCategoryIndex <= categories.length - 2) {
			(completedCategories as Writable<string[]>).set([...$completedCategories, $currentCategory]);
			$currentCategory = categories[currentCategoryIndex + 1];
		} else {
			// time for results
		}

	}

	answers.subscribe(val => {
		console.log(val)
	});


</script>

<h1>Competency self-evaluation</h1>

<p>This tool is intended to help you assess your "T-shaped skills" and help you find areas would you like focus on for growth.</p>
<p>Please proceed through the steps and select how much each of the statements describe you</p>

<div class="form-frame">

	<form>
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
									bind:group={$answers[$currentCategory][index]}
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
	</form>

	<aside>
		<div class="sticky">
			<ul>
				{#each categories as cat}
					<li
						class:completed={$completedCategories.includes(cat)}
						class:active={cat === $currentCategory}
						on:click={() => $completedCategories.includes(cat) ? $currentCategory = cat : null}
					>
						{questionnaire.categories[cat].name}
						({$answers[cat].filter(a => a !== null).length}/{questionnaire.categories[cat].questions.length})
						{#if $completedCategories.includes(cat)}
							<span >✅</span>
						{/if}
					</li>
				{/each}

			</ul>

			<button on:click={handleOnSubmit} disabled={$answers[$currentCategory].some(a => a === null)}>Next</button>
		</div>
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
		padding: 0 30px;
	}

	aside .sticky {
		top: 20px;
		position: sticky;
	}

	aside ul {
		list-style: none;
		margin-left: 0;
		padding-left: 0;
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