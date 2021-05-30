<script lang="ts">
  import type { Questionnaire } from 'src/routes/_questionnaire.js';
  import { currentCategory, answers, resetAll } from '../stores.js';
  export let questionnaire: Questionnaire;

  let categories = Object.keys(questionnaire.categories);

  function handleOnSubmit() {
    const currentCategoryIndex = categories.indexOf($currentCategory);

    if (Object.values($answers).flat().every(a => a !== null)) {
      window.location.assign('/results');
    } else if (currentCategoryIndex <= categories.length - 2) {
      $currentCategory = categories[currentCategoryIndex + 1];
    }
  }

  function reset() {
    if (confirm('This will clear all entered information. Are you sure?')) {
      resetAll();
    }
  }

  $: totalQuestions = Object.values($answers).flat().length;
  $: filledQuestions = Object.values($answers).flat().filter(a => a !== null).length;

</script>


<aside>
  <div class="sticky">
    <progress value={filledQuestions} max={totalQuestions}> {(100 * filledQuestions/totalQuestions).toFixed(1)} %</progress>
    <ul>
      {#each categories as cat}
        <li
          class:completed={$answers[cat].every(a => a !== null)}
          class:active={cat === $currentCategory}
          on:click={() => $answers[cat].some(a => a !== null) ? $currentCategory = cat : null}
        >
          {questionnaire.categories[cat].name}
          ({$answers[cat].filter(a => a !== null).length}/{questionnaire.categories[cat].questions.length})
          {#if $answers[cat].every(a => a !== null)}
            <span>✅</span>
          {/if}
        </li>
      {/each}

    </ul>

    <button on:click={handleOnSubmit} disabled={$answers[$currentCategory].some(a => a === null)}>
      {#if filledQuestions === totalQuestions}
        See results
      {:else}
        Next
      {/if}
    </button>

    <br>
    <br>
    <span class="reset" on:click={reset}>Reset</span>
  </div>
</aside>

<style>
  aside {
    flex: 1 0 25%;
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

  progress {
    width: calc(100% - 30px);
    height: 20px;
    border-radius: 4px;
  }

  progress::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 4px;
  }

  progress::-webkit-progress-value {
    background-color: rgb(6, 160, 6);
    border-radius: 4px;
  }

  button {
    padding: 0.75rem;
    font-size: 1.25rem;
    width: calc(100% - 30px);
    font-weight: 100;
    border: 0;
    cursor: pointer;
    background: #604ea0;
    color: #fff;
    align-self: center;
  }

  button:hover {
    background: #31245d;
  }

  button:disabled {
    background: #bbb;
    cursor: not-allowed;
  }

  button:focus {
    outline: 0.2rem dotted #382c63;
  }

  button:focus:not(:focus-visible) {
    outline: none;
  }

  .reset {
    cursor: pointer;
    color: #604ea0;
  }

</style>
