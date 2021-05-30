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
  import { interpolateColor } from '../utils.js';

  export let questionnaire: Questionnaire;

  let agreementGrades = ['Fully disagree', 'Mostly disagree', 'Mostly agree', 'Fully agree'];

  let categories = Object.keys(questionnaire.categories);

  function cell (cat: string, levelIdx: number) {
    const cellQuestions = questionnaire.categories[cat].questions
      .reduce((acc, q, idx) => [...acc, ...(q.level === levelIdx ? [idx] : [])], []);

    const catAnswers = $answers[cat].filter((_, idx) => cellQuestions.includes(idx));

    const totalPoints = catAnswers.reduce((a, n) => a + n, 0);
    const percentage = 100 * totalPoints / (catAnswers.length * 3);

    let bg = '#ffffff';
    if (totalPoints / (catAnswers.length * 3) === 1) {
      bg = '#55cc55';
    } else if (totalPoints / (catAnswers.length * 3) > 0) {
      bg = `#${interpolateColor('ffffff', '55cc55', totalPoints / (catAnswers.length * 3))}`;
    }

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
      <td
        style="background-color: {cell(cat, levelIdx).bg}"
        on:click={() => alert(cell(cat, levelIdx).info.map(i => `${i.text} - ${agreementGrades[i.answer]}`).join('\n\n'))}
      >
        {cell(cat, levelIdx).text}
      </td>
    {/each}
    </tr>
  {/each}
</table>
