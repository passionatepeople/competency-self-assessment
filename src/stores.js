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
export const answers = writable(getFromLS('answers') || blankAnswers);

export const resetAll = () => {
  currentCategory.set('development');
  answers.set(blankAnswers);
}

// sync with local storage
const writeToLS = (key) => (value) => typeof window !== 'undefined' && localStorage.setItem(key, JSON.stringify(value));
currentCategory.subscribe(writeToLS('currentCategory'));
answers.subscribe(writeToLS('answers'));
