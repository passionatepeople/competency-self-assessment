#!/usr/bin/env node

const category = (name, slug = name.toLowerCase()) => ({
	name,
	slug,
	questions: require(`../static/questions/${slug}.json`).reduce((result, levelQuestions, level) => {
		for (const question of levelQuestions) result.push({ question, level });
		return result;
	}, [])
});

process.stdout.write(
	JSON.stringify(
		[
			category('Principles'),
			category('Development'),
			category('Testing'),
			category('CI / CD', 'cicd'),
			category('UI / UX', 'uiux'),
			category('Infrastructure'),
			category('Security'),
			category('Leadership'),
			category('Consulting')
		],
		null,
		'\t'
	)
);
