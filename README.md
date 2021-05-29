# Competency self-evaluation tool

## Development

```sh
$ npm i -g pnpm # if you haven't already
$ pnpm i
$ pnpm run dev
```

## Deployment

```sh
$ pnpm run build
```

...and deploy the `build/` dir on a static hosting service.

## Wish list:

- [ ] Use predefined question `id`s to enable keeping result URLs stable even if questions change.
- [ ] Enhance form to use client-side router on submit.
- [ ] Improve result visualisation, e.g. via `<td>` background color.
- [ ] Page title, favicon, manifest and all that jazz.
- [x] Add a `LICENSE`
