<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/questionnaire.json');
		return res.ok
			? { context: { questionnaire: await res.json() } }
			: { error: new Error(await res.json()) };
	};
</script>

<main>
	<img class="logo" src="/logo.png" alt="Passionate People" />
	<slot></slot>
</main>

<footer>
	v{process.env.VERSION}
</footer>
