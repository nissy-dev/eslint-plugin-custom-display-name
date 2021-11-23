import { exampleRule } from "./rules/example-rule";

export = {
  rules: {
    ruleName: exampleRule,
  },
  configs: {
    all: {
      plugins: ["ts-template"],
      rules: {
        "ts-template/example-rule": "error",
      },
    },
  },
};
