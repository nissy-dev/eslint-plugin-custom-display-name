import { TSESLint } from "@typescript-eslint/experimental-utils";

// コメントを許可しないルール
export const exampleRule: TSESLint.RuleModule<"bansCommentsMessage", []> = {
  meta: {
    docs: {
      description: "Bans comments",
      recommended: "error",
      url: "https://github.com/nissy-dev/eslint-plugin-ts-template/blob/main/doc/rules/example-rule.md",
    },
    messages: {
      bansCommentsMessage: "Don't write comments.",
    },
    type: "suggestion",
    schema: [],
  },
  create: (context) => {
    const sourceCode = context.getSourceCode();
    const comments = sourceCode.getAllComments();
    return {
      Program() {
        comments.forEach((comment) => {
          context.report({
            node: comment,
            messageId: "bansCommentsMessage",
          });
        });
      },
    };
  },
};
