<script lang="ts">
  import type { Questionnaire } from 'src/routes/_questionnaire.js';
	import type { Writable } from 'svelte/store';
  import { currentCategory, completedCategories, answers, resetAll } from '../stores.js';
  export let questionnaire: Questionnaire;

  let categories = Object.keys(questionnaire.categories);

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

    <button on:click={handleOnSubmit} disabled={$answers[$currentCategory].some(a => a === null)}>
      {#if filledQuestions === totalQuestions}
        See results
      {:else}
        Next
      {/if}
    </button>

    <br>
    {filledQuestions}/{totalQuestions}
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

  button {
    padding: 1rem 3rem;
    font-size: 1.25rem;
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
