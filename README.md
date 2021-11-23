This is template repository for eslint plugin development with TypeScript.

1. Create new rules using `npm run new-rule`

---

# eslint-plugin-custom-display-name

![release](https://github.com/nissy-dev/eslint-plugin-custom-display-name/actions/workflows/release.yml/badge.svg)
[![License: MIT](https://img.shields.io/github/license/nissy-dev/eslint-plugin-custom-display-name.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/eslint-plugin-custom-display-name.svg)](https://badge.fury.io/js/eslint-plugin-custom-display-name)

Eslint plugin that provides custom rules about `displayName` for React components.

## Install

```sh
$ npm install --save-dev eslint-plugin-custom-display-name
```

and add it to your `.eslintrc`.

```json
{
  "plugins": ["custom-display-name"],
  "rules": {
    "custom-display-name/example-rule": "error"
  }
}
```

## Rules

| Rule ID                                                          | Description    |
| :--------------------------------------------------------------- | :------------- |
| [custom-display-name/example-rule](./docs/rules/example-rule.md) | Bans comments. |

## Contributing

Welcome your contribution!

See also [ESLint/Working with Plugins](https://eslint.org/docs/developer-guide/working-with-plugins).

## Setup

```
$ git clone git@github.com:nissy-dev/eslint-plugin-custom-display-name.git
$ cd eslint-plugin-custom-display-name
$ npm ci
```

## Development Tools

```sh
// run tsc, eslint, prettier
$ npm run lint

// run test
$ npm run test
```
