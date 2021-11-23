import { tester } from "..";

import { displayNameOnlyExportedComponent } from "../../src/rules/display-name-only-exported-component";

describe("Test for display-name-only-exported-component", () => {
  tester.run("display-name-only-exported-component", displayNameOnlyExportedComponent, {
    valid: [],
    invalid: [],
  });
});
