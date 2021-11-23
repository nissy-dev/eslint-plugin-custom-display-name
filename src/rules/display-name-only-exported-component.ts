import { TSESLint } from "@typescript-eslint/experimental-utils";

export const displayNameOnlyExportedComponent: TSESLint.RuleModule<"", []> = {
  meta: {
    docs: {
      description: "",
      recommended: "error",
      url: "https://github.com/nissy-dev/eslint-plugin-custom-display-name/blob/main/docs/rules/display-name-only-exported-component.md",
    },
    messages: {},
    type: "suggestion",
    schema: [],
  },
  create: (context) => {
    return {};
  },
};
