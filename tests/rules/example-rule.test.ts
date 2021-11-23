import { tester } from "..";

import { exampleRule } from "../../src/rules/example-rule";

describe("Test for example-rule", () => {
  tester.run("example-rule", exampleRule, {
    valid: [{ code: "const a = 1;" }],
    invalid: [
      {
        code: `// comment
const a = 1;
`,
        errors: [
          {
            messageId: "bansCommentsMessage",
          },
        ],
      },
    ],
  });
});
