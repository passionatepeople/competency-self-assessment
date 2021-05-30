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

<p>This tool is intended to help you assess your "T-shaped skills" and help you find areas would you like focus on for growth.</p>
<p>Please proceed through the steps and select how much each of the statements describe you</p>

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
</style>
