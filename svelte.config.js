import fs from 'fs';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const pkg = fs.readFileSync(new URL('./package.json', import.meta.url));
const version = JSON.stringify(JSON.parse(pkg).version);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		target: 'body',
		vite: { define: { 'process.env.VERSION': version } },
	},
};

export default config;
