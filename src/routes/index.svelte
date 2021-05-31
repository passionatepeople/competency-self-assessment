<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ context }) => ({
    props: { questionnaire: context.questionnaire },
  });
</script>

<script lang="ts">
  import type { Questionnaire } from './_questionnaire';
  import Statement from '../components/Statement.svelte';
  import Sidebar from '../components/Sidebar.svelte';

  import { currentCategory } from '../stores.js';

  export let questionnaire: Questionnaire;
</script>

<h1>Competency self-evaluation</h1>

<p>
  This <a href="https://github.com/passionatepeople/competency-self-assessment" target="_blank">tool</a> is intended to help you to assess your "T-shaped skills"
  and find areas where you would like focus on for further learning.
  We have organised skills in 8 categories that are relevant for developers working for a consultancy like <a href="https://passionatepeople.io/" target="_blank"> Passionate People </a>.
  The skills are grouped in 5 levels based on <a href="https://en.wikipedia.org/wiki/Dreyfus_model_of_skill_acquisition" target="_blank"> Dreyfus model of skill acquisition.</a>
</p>
<p>
  While perhaps too abstract and generalizing in some ways, this tool can help one orientate in skill-space.
  The statements can serve as goalposts for identifying when a certain mastery level is reached.
  And, most importantly, help to identify areas to focus on for further learning.
</p>
<p>Please proceed through the steps and choose how much each of the statements describe you.</p>
<p><small>Please note any feedback you might have and feel free to share it with <a href="mailto:harijs@passionatepeople.io">Harijs</a></small></p>

<div class="main-layout">

  <form>
    <fieldset>
      <legend> <h2>{questionnaire.categories[$currentCategory].name}</h2></legend>
      {#each questionnaire.categories[$currentCategory].questions as question, index}
        <Statement question={question.text} index={index} />
      {/each}
    </fieldset>
  </form>

  <Sidebar questionnaire={questionnaire} />

</div>

<style>
  .main-layout {
    display: flex;
    flex-direction: row;
  }
  .main-layout form {
    flex: 1 0 75%;
  }
  small {
    font-size: .9rem;
    color: #ddd;
  }
</style>
