import { writable } from 'svelte/store';
import questionnaire from '../static/questionnaire.json';

const blankAnswers = Object.keys(questionnaire.categories).reduce((acc, cat) => ({
    ...acc,
    [cat]: questionnaire.categories[cat].questions.map(() => null),
  }), {});

export const currentCategory = writable('development');
export const completedCategories = writable([]);
export const answers = writable(blankAnswers);