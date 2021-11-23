import { displayNameOnlyExportedComponent } from "./rules/display-name-only-exported-component";

export = {
  rules: {
    ruleName: displayNameOnlyExportedComponent,
  },
  configs: {
    all: {
      plugins: ["custom-display-name"],
      rules: {
        "custom-display-name/example-rule": "error",
      },
    },
  },
};
