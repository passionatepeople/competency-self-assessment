export type Question = {
	text: string;
	level: 0 | 1 | 2 | 3 | 4;
};

export type Category = {
	name: string;
	questions: Question[];
};

export type Questionnaire = {
	categories: { [slug: string]: Category };
	levels: string[];
};

export type Answers = {
	[slug: string]: null | number;
}
