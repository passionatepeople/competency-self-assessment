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
          aria-current={cat === $currentCategory ? 'step' : 'false'}
          on:click={() => $answers[cat].some(a => a !== null) ? $currentCategory = cat : null}
        >
          {questionnaire.categories[cat].name}
          ({$answers[cat].filter(a => a !== null).length}/{questionnaire.categories[cat].questions.length})
          {#if $answers[cat].every(a => a !== null)}
            <span aria-name="Is completed">✅</span>
          {/if}
        </li>
      {/each}

    </ul>

    <button class="cta" on:click={handleOnSubmit} disabled={$answers[$currentCategory].some(a => a === null)}>
      {#if filledQuestions === totalQuestions}
        See results
      {:else}
        Next
      {/if}
    </button>

    <br>
    <br>
    <button class="reset" on:click={reset}>Reset</button>
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
    color: #4ccca7;
    cursor: pointer;
  }

  aside ul li[aria-current=step] {
    color: #fff;
  }

  progress {
    width: calc(100% - 30px);
    height: 20px;
    border-radius: 4px;
  }

  progress::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 4px;
    background: rgba(0, 0, 0, .2);
  }

  progress::-webkit-progress-value {
    background-color: #4CCCA7;
    border-radius: 4px;
  }

  button.cta {
    padding: 0.75rem;
    font-size: 1.25rem;
    width: calc(100% - 30px);
    border: 0;
    cursor: pointer;
    background: #392D63;
    color: #fff;
    align-self: center;
  }

  button.cta:hover {
    background: #251d41;
  }

  button.cta:disabled {
    background: rgba(200, 200, 200, .3);
    color: #ccc;
    cursor: not-allowed;
  }

  button.cta:focus {
    outline: 0.2rem dotted #382c63;
  }

  button.cta:focus:not(:focus-visible) {
    outline: none;
  }

  button.reset {
    display: inline;
    cursor: pointer;
    color: #aaa;
    font-size: 1.25rem;
    background: none;
    color: #aaa;
    border: 0;
  }

  .reset:hover {
    color: #c00;
  }

</style>
