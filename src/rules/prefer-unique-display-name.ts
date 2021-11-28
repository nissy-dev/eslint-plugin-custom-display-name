import { TSESLint } from "@typescript-eslint/experimental-utils";

import { isMemberExpression, isLiteral, isIdentifier } from "../type-predicates";

export const messageId = "displayNameShouldBeUnique";

export const preferUniqueDisplayName: TSESLint.RuleModule<typeof messageId, []> = {
  meta: {
    docs: {
      description: "Display name should be unique.",
      recommended: "error",
      url: "https://github.com/nissy-dev/eslint-plugin-custom-display-name/blob/main/docs/rules/prefer-unique-display-name.md",
    },
    messages: {
      displayNameShouldBeUnique: "Display name should be different from variable name.",
    },
    type: "suggestion",
    schema: [],
  },
  create: (context) => {
    return {
      AssignmentExpression(node) {
        if (
          isMemberExpression(node.left) &&
          isLiteral(node.right) &&
          isIdentifier(node.left.property) &&
          isIdentifier(node.left.object) &&
          node.left.property.name === "displayName" &&
          node.left.object.name === node.right.value
        ) {
          context.report({
            node,
            messageId: "displayNameShouldBeUnique",
          });
        }
      },
    };
  },
};
