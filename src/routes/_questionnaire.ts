export type Question = {
	question: string;
	level: 0 | 1 | 2 | 3 | 4;
};

export type Category = {
	slug: string;
	questions: Question[];
};

export type Questionnaire = {
	categories: { [slug: string]: string };
	levels: string[];
	questions: Category[];
};
