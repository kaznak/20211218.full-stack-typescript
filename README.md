# Full Stack TypeScript(monorepo)

Trying to build a full stack repository based on:

- TypeScript
- Lerna
- Yarn

## Problems

### How setup support tools like prettier or eslint

tools:

- lerna
- npm-run-all
- prettier
- sort-package-json
- eslint
    - with plugins
- lint-staged
- husky

situation:

- The tools should be shared between all sub repositories by the lerna feature, hoisting.
- husky works only in the repository root.
- ESLint would be configured for a specific structure.
  - `"@next/eslint-plugin-next` suppose to be the directory structure of the next.js standard.
- lerna has a command, `lerna run` , that runs a npm script in each package.
    - read [this](https://github.com/okonet/lint-staged#how-to-use-lint-staged-in-a-multi-package-monorepo).
- sort-package-json and prettier would conflict while parallel execution.
    - sort-package-json should be a prettier plugin.
    - it already is [prettier-plugin-packagejson](https://www.npmjs.com/package/prettier-plugin-packagejson)
