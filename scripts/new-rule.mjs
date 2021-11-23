/**
 * This script is based on
 * https://github.com/mysticatea/eslint-plugin-node/blob/master/scripts/new-rule.js
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ruleTemplate = (
  ruleId,
  ruleVarName
) => `import { TSESLint } from "@typescript-eslint/experimental-utils";

export const ${ruleVarName}: TSESLint.RuleModule<"", []> = {
  meta: {
    docs: {
      description: "",
      recommended: "error",
      url: "https://github.com/nissy-dev/eslint-plugin-ts-template/blob/main/docs/rules/${ruleId}.md",
    },
    messages: {},
    type: "suggestion",
    schema: [],
  },
  create: (context) => {
    return {};
  },
}
`;

const testTemplate = (ruleId, ruleVarName) => `import { tester } from ".."

import { ${ruleVarName} } from "../../src/rules/${ruleId}"

describe("Test for ${ruleId}", () => {
  tester.run("${ruleId}", ${ruleVarName}, {
    valid: [],
    invalid: [],
  });
});
`;

const docTemplate = (ruleId) => `# TODO (ts-template/${ruleId})

TODO: Why this rule is useful.

## 📖 Rule Details

TODO: How this rule will report code.

👍 Examples of **correct** code for this rule:

\`\`\`ts
\`\`\`

👎 Examples of **incorrect** code for this rule:

\`\`\`ts
\`\`\`
`;

const main = () => {
  const ruleId = process.argv[2];
  if (ruleId == null) {
    console.error("Usage: npm run new <RuleID>");
    process.exitCode = 1;
    return;
  }
  if (!/^[\w-]+$/u.test(ruleId)) {
    console.error("Invalid RuleID '%s'.", ruleId);
    process.exitCode = 1;
    return;
  }

  const ruleIdSplitArray = ruleId.split("-");
  const ruleVarName =
    ruleIdSplitArray[0] +
    ruleIdSplitArray
      .slice(1)
      .map((s) => s[0].toUpperCase() + s.slice(1))
      .join("");

  // __dirnameはmjsでは利用できない
  // see: https://github.com/nodejs/help/issues/2907
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const ruleFile = path.resolve(__dirname, `../src/rules/${ruleId}.ts`);
  fs.writeFileSync(ruleFile, ruleTemplate(ruleId, ruleVarName));

  const testFile = path.resolve(__dirname, `../tests/rules/${ruleId}.test.ts`);
  fs.writeFileSync(testFile, testTemplate(ruleId, ruleVarName));

  const docFile = path.resolve(__dirname, `../docs/rules/${ruleId}.md`);
  fs.writeFileSync(docFile, docTemplate(ruleId));
};

main();
