#!/usr/bin/env node

/* Usage:
 * - cat | ./parse-question.js > category.json
 *   - then paste text and hit ctrl-D
 * - ./parse-question.js < category.txt > category.json
 */

import readline from 'readline';

const result = [];
const parseLine = (line) =>
	line
		.replace(/^- |/, '')
		.split(' - ')
		.map((item) => item.replace(/;?.?$/, '.'));
readline
	.createInterface({ input: process.stdin, terminal: false })
	.on('line', (line) => result.push(parseLine(line)))
	.on('close', () => process.stdout.write(JSON.stringify(result, null, '\t')));
