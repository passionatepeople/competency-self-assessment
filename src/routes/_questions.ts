export type Question = {
	question: string;
	level: 0 | 1 | 2 | 3 | 4;
};

export type Category = {
	name: string;
	slug: string;
	questions: Question[];
};

export const shuffle = <T>(array: T[]): T[] => {
	const result = [...array];
	// Fisher–Yates shuffle
	for (let i = array.length, j = 0; i--; ) {
		j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
};
