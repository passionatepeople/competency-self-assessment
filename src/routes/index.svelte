<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ context }) => ({
		props: { questionnaire: context.questionnaire },
	});
</script>

<script lang="ts">
	import type { Questionnaire } from './_questionnaire';
	import { currentCategory, completedCategories } from '../stores.js';

	export let questionnaire: Questionnaire;

	let categories = Object.keys(questionnaire.categories);

	function handleOnSubmit() {
		Object.entries(this);
	}

</script>

<h1>Competency self-evaluation</h1>

<p>This tool is intended to help you assess your "T-shaped skills" and help you find areas would you like focus on for growth.</p>
<p>Please proceed through the steps and select how much each of the statements describe your professional ca</p>

<div class="form-frame">

	<form on:submit|preventDefault={handleOnSubmit}>
		<fieldset>
			<legend> <h2>{questionnaire.categories[$currentCategory].name}</h2></legend>

			{#each questionnaire.categories[$currentCategory].questions as question, index}
				<fieldset>
					<legend>{question.text}</legend>
					<div>
						<label
							><input
								type="radio"
								name="{$currentCategory}-{question.level}-{index}"
								value="0"
								required
							/>
							<span>Fully disagree</span>
						</label>
						<label
							><input
								type="radio"
								name="{$currentCategory}-{question.level}-{index}"
								value="1"
								required
							/>
							<span>Mostly disagree</span>
						</label>
						<label
							><input
								type="radio"
								name="{$currentCategory}-{question.level}-{index}"
								value="2"
								required
							/>
							<span>Mostly agree</span>
						</label>
						<label
							><input
								type="radio"
								name="{$currentCategory}-{question.level}-{index}"
								value="3"
								required
							/>
							<span>Fully agree</span>
						</label>
					</div>
				</fieldset>
			{/each}
		</fieldset>
		<button>Next</button>
	</form>

	<aside>
		<ul>
			{#each categories as cat}
				<li class:completed={$completedCategories.includes(cat)} class:active={cat === $currentCategory}>
					{questionnaire.categories[cat].name}
					{#if $completedCategories.includes(cat)}
						✅
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
	}

	aside ul li.active {
		color: #333;
	}


</style>