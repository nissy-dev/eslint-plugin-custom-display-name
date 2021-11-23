This is template repository for eslint plugin development with TypeScript.

1. Create repository based on this template
2. Change plugin name from eslint-plugin-ts-template to your own
3. Modify TODO comments
4. Set NPM_TOKEN to repository secrets
5. Create new labels (`breaking changes`, `bug fix`, `new features`) for automate release notes
6. Create new rules using `npm run new-rule`

---

# eslint-plugin-ts-template

![release](https://github.com/nissy-dev/eslint-plugin-ts-template/actions/workflows/release.yml/badge.svg)
[![License: MIT](https://img.shields.io/github/license/nissy-dev/eslint-plugin-ts-template.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/eslint-plugin-ts-template.svg)](https://badge.fury.io/js/eslint-plugin-ts-template)

TODO: write some description

## Install

```sh
$ npm install --save-dev eslint-plugin-ts-template
```

and add it to your `.eslintrc`.

```json
{
  "plugins": ["ts-template"],
  "rules": {
    "ts-template/example-rule": "error"
  }
}
```

## Rules

| Rule ID                                                  | Description    |
| :------------------------------------------------------- | :------------- |
| [ts-template/example-rule](./docs/rules/example-rule.md) | Bans comments. |

## Contributing

Welcome your contribution!

See also [ESLint/Working with Plugins](https://eslint.org/docs/developer-guide/working-with-plugins).

## Setup

```
$ git clone git@github.com:nissy-dev/eslint-plugin-ts-template.git
$ cd eslint-plugin-ts-template
$ npm ci
```

## Development Tools

```sh
// run tsc, eslint, prettier
$ npm run lint

// run test
$ npm run test
```
