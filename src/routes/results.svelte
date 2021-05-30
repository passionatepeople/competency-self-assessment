<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ context }) => ({
    props: {
      questionnaire: context.questionnaire,
    },
  });
</script>

<script lang="ts">
  import type { Questionnaire } from './_questionnaire';
  import { answers } from '../stores.js';

  export let questionnaire: Questionnaire;

  let categories = Object.keys(questionnaire.categories);

  function cell (cat: string, levelIdx: number) {
    const cellQuestions = questionnaire.categories[cat].questions
      .reduce((acc, q, idx) => [...acc, ...(q.level === levelIdx ? [idx] : [])], []);

    const catAnswers = $answers[cat].filter((_, idx) => cellQuestions.includes(idx));

    const totalPoints = catAnswers.reduce((a, n) => a + n, 0);
    const percentage = 100 * totalPoints / (catAnswers.length * 3);

    return `${percentage.toFixed(1)}%`;
  }

</script>

<h1> Results </h1>
<a href="/">Back</a>
<table>
  <tr>
    <th aria-hidden="true" />
    {#each categories as cat}
      <th scope="col">{questionnaire.categories[cat].name}</th>
    {/each}
  </tr>
  {#each questionnaire.levels as level, levelIdx}
    <tr>
      <th scope="row"> {level} </th>
      {#each categories as cat}
      <td> {cell(cat, levelIdx)} </td>
    {/each}
    </tr>
  {/each}
</table>
