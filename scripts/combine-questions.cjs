#!/usr/bin/env node

const questions = (filename, slug) => ({
	slug,
	questions: require(`../questions/${filename}.json`).reduce(
		(result, levelQuestions, level) => {
			for (const question of levelQuestions) result.push({ question, level });
			return result;
		},
		[]
	),
});

process.stdout.write(
	JSON.stringify(
		{
			categories: {
				p: 'Principles',
				d: 'Development',
				t: 'Testing',
				ci: 'CI / CD',
				u: 'UI / UX',
				i: 'Infrastructure',
				s: 'Security',
				l: 'Leadership',
				c: 'Consulting',
			},
			levels: ['Novice', 'Beginner', 'Competent', 'Proficient', 'Expert'],
			questions: [
				questions('principles', 'p'),
				questions('development', 'd'),
				questions('testing', 't'),
				questions('cicd', 'ci'),
				questions('uiux', 'u'),
				questions('infrastructure', 'i'),
				questions('security', 's'),
				questions('leadership', 'l'),
				questions('consulting', 'c'),
			],
		},
		null,
		'\t'
	)
);
