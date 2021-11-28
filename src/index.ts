import { displayNameOnlyExportedComponent } from "./rules/display-name-only-exported-component";
import { preferUniqueDisplayName } from "./rules/prefer-unique-display-name";

export = {
  rules: {
    displayNameOnlyExportedComponent,
    preferUniqueDisplayName,
  },
  configs: {
    all: {
      plugins: ["custom-display-name"],
      rules: {
        "custom-display-name/display-name-only-exported-component": "error",
        "custom-display-name/prefer-unique-display-name": "error",
      },
    },
  },
};
