import { displayNameOnlyExportedComponent } from "./rules/display-name-only-exported-component";
import { preferUniqueDisplayName } from "./rules/prefer-unique-display-name";

export = {
  rules: {
    "display-name-only-exported-component": displayNameOnlyExportedComponent,
    "prefer-unique-display-name": preferUniqueDisplayName,
  },
  configs: {
    all: {
      plugins: ["custom-display-name"],
      rules: {
        "display-name-only-exported-component": "error",
        "prefer-unique-display-name": "error",
      },
    },
  },
};
