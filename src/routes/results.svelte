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

  let agreementGrades = ['Fully disagree', 'Mostly disagree', 'Mostly agree', 'Fully agree'];

  let categories = Object.keys(questionnaire.categories);

  function cell (cat: string, levelIdx: number) {
    const cellQuestions = questionnaire.categories[cat].questions
      .reduce((acc, q, idx) => [...acc, ...(q.level === levelIdx ? [idx] : [])], []);

    const catAnswers = $answers[cat].filter((_, idx) => cellQuestions.includes(idx));

    const totalPoints = catAnswers.reduce((a, n) => a + n, 0);
    const ratio = totalPoints / (catAnswers.length * 3);
    const percentage = 100* ratio;
    const bg = `rgba(76, 204, 167, ${ratio})`;


    const info = questionnaire.categories[cat].questions
      .filter(q => q.level === levelIdx)
      .map((q, i) => ({
        text: q.text,
        answer: catAnswers[i],
      }));

    return {
      bg,
      text: `${percentage.toFixed(1)}%`,
      info,
    };
  }

</script>

<h1> Results </h1>
<a class="back" href="/">Back</a>
<table>
  <tr class="categories">
    <th aria-hidden="true" />
    {#each categories as cat}
      <th scope="col">{questionnaire.categories[cat].name}</th>
    {/each}
  </tr>
  {#each questionnaire.levels as level, levelIdx}
    <tr>
      <th scope="row"> {level} </th>
      {#each categories as cat}
      <td
        style="background-color: {cell(cat, levelIdx).bg}"
        on:click={() => alert(level + ' ' + questionnaire.categories[cat].name + '\n\n' + cell(cat, levelIdx).info.map(i => `${i.text} - ${agreementGrades[i.answer]}`).join('\n\n'))}
      >
        {cell(cat, levelIdx).text}
      </td>
    {/each}
    </tr>
  {/each}
</table>

<style>
  table {
    width: 100%;
    border-spacing: 0;
  }

  th, td {
    padding: 1rem 0.5rem;
  }

  th {
    text-align: left;
  }

  tr.categories th, td {
    text-align: center;
  }


  th:first, td:first {
    padding-left: 0;
  }
</style>
