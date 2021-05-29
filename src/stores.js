import { writable } from 'svelte/store';
import questionnaire from '../static/questionnaire.json';

const blankAnswers = Object.keys(questionnaire.categories).reduce((acc, cat) => ({
    ...acc,
    [cat]: questionnaire.categories[cat].questions.map(() => null),
  }), {});

const getFromLS = (key) => {
  const value = typeof window !== 'undefined' && localStorage.getItem(key);
  if (value) {
    let parsed;
    try {
      parsed = JSON.parse(value);
    } catch (_e) {}

    return parsed;
  }

  return undefined;
}

export const currentCategory = writable(getFromLS('currentCategory') || 'development');
export const completedCategories = writable(getFromLS('completedCategories') || []);
export const answers = writable(getFromLS('answers') || blankAnswers);


// sync with local storage
const writeToLS = (key) => (value) => typeof window !== 'undefined' && localStorage.setItem(key, JSON.stringify(value));
currentCategory.subscribe(writeToLS('currentCategory'));
completedCategories.subscribe(writeToLS('completedCategories'));
answers.subscribe(writeToLS('answers'));

