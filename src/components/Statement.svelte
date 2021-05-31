<script lang="ts">
  import { currentCategory, answers } from '../stores.js';
  let agreementGrades = ['Fully disagree', 'Mostly disagree', 'Mostly agree', 'Fully agree'];

  export let question: string;
  export let index: number;
</script>

<fieldset>
  <legend>
    {question}
    {#if $answers[$currentCategory][index] !== null}
      <strong on:click={() => $answers[$currentCategory][index] = null}>{agreementGrades[$answers[$currentCategory][index]]}</strong>
    {/if}
  </legend>
  {#if $answers[$currentCategory][index] === null}
    <div>
      {#each agreementGrades as grade, gradeIndex}
        <label
          ><input
            type="radio"
            bind:group={$answers[$currentCategory][index]}
            value={gradeIndex}
            required
          />
          <span>{grade}</span>
        </label>
      {/each}
    </div>
  {/if}
</fieldset>
