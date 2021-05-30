<script lang="ts">
  import type { Questionnaire } from 'src/routes/_questionnaire.js';
	import type { Writable } from 'svelte/store';
  import { currentCategory, completedCategories, answers } from '../stores.js';
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

    <button on:click={handleOnSubmit} disabled={$answers[$currentCategory].some(a => a === null)}>Next</button>
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


</style>
