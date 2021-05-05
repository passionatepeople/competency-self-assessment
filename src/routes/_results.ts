export type Results = {
	[slug: string]: { percent: number; total: number; possible: number }[];
};

const answerParamPattern = /^[a-z]+-\d+-\d+$/;

export const queryToResults = (query: URLSearchParams): Results => {
	const results: Results = {};
	// @ts-ignore: property 'entries' does not exist on type 'URLSearchParams'
	for (const [key, value] of query.entries()) {
		if (!answerParamPattern.test(key)) continue;
		const numValue = parseInt(value, 10);
		if (isNaN(numValue)) {
			console.error(`Skipping non-numeric answer "${value}".`);
			continue;
		}
		const [slug, level, _index] = key.split('-');
		const numLevel = parseInt(level, 0);
		if (!results[slug]) results[slug] = initResult();
		const result = results[slug][numLevel]
		result.possible += 3
		result.total += numValue
		result.percent = Math.round(100 * (result.total / result.possible))
	}
	return results
};

const initResult = () => [
	{ percent: 0, total: 0, possible: 0 },
	{ percent: 0, total: 0, possible: 0 },
	{ percent: 0, total: 0, possible: 0 },
	{ percent: 0, total: 0, possible: 0 },
	{ percent: 0, total: 0, possible: 0 },
];
