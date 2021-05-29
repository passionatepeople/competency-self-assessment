<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ context }) => ({
		props: { questionnaire: context.questionnaire },
	});
</script>

<script lang="ts">
	import type { Questionnaire } from './_questionnaire';
	import { category } from '../stores.js';

	export let questionnaire: Questionnaire;
</script>

<h1>Competency self-evaluation</h1>

<p>This tool is intended to help you assess your "T-shaped skills" and help you find areas would you like focus on for growth.</p>

<div class="form-frame">

	<form action="/result" method="get">
		<fieldset>
			<legend> <h2> {questionnaire.categories[$category].name} </h2> </legend>
			{#each questionnaire.categories[$category].questions as question, index}
				<fieldset>
					<legend>{question.text}</legend>
					<div>
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
					</div>
				</fieldset>
			{/each}
		</fieldset>
		<button>Next</button>
	</form>

	<aside>
		<h2> {questionnaire.categories[$category].name} </h2>

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


</style>