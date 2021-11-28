import { TSESLint, TSESTree } from "@typescript-eslint/experimental-utils";

import {
  isIdentifier,
  isArrowFunctionExpression,
  isFunctionExpression,
  isMemberExpression,
  isVariableDeclaration,
  isFunctionDeclaration,
  isMethodDefinition,
  isClassDeclaration,
  isTaggedTemplateExpression,
  isCallExpression,
} from "../typePredicates";
import { isComponentVariable } from "../isComponentVariable";

type ComponentNodeInfo = {
  node: TSESTree.Node;
  exported: boolean;
  hasDisplayName: boolean;
};

const DEFAULT_EXPORTED_CLASS_NAME = "Annonymous-Default-Exported-Class";

const DEFAULT_CHECK_COMPONENT_NAME = ["Component", "StyledComponent", "Container"];

export const messageId = "noDisplayName";

export const displayNameOnlyExportedComponent: TSESLint.RuleModule<typeof messageId, string[][]> = {
  meta: {
    docs: {
      description: "Exported Component requires displayName.",
      recommended: "error",
      url: "https://github.com/nissy-dev/eslint-plugin-custom-display-name/blob/main/docs/rules/display-name-only-exported-component.md",
    },
    messages: {
      noDisplayName: "Exported Component is missing display name.",
    },
    type: "suggestion",
    schema: [
      {
        type: "array",
        items: {
          type: "string",
        },
      },
    ],
  },
  create: (context) => {
    const componentNodeMap: Map<string, ComponentNodeInfo> = new Map();
    return {
      VariableDeclarator(node) {
        const { id, init } = node;
        if (
          isIdentifier(id) &&
          (isArrowFunctionExpression(init) || isFunctionExpression(init)) &&
          isComponentVariable(init.body)
        ) {
          componentNodeMap.set(id.name, { node: node, exported: false, hasDisplayName: false });
        }

        // Styled Componentが提供するTagged Template Literal構文にも対応
        if (isIdentifier(id) && isTaggedTemplateExpression(init)) {
          const { tag } = init;
          if (isMemberExpression(tag) && isIdentifier(tag.object)) {
            const name = tag.object.name;
            if (name === "styled") {
              componentNodeMap.set(id.name, { node: node, exported: false, hasDisplayName: false });
            }
          }

          if (isCallExpression(tag) && isIdentifier(tag.callee)) {
            const name = tag.callee.name;
            if (name === "styled") {
              componentNodeMap.set(id.name, { node: node, exported: false, hasDisplayName: false });
            }
          }
        }

        // React.memoの構文にも対応
        if (isIdentifier(id) && isCallExpression(init)) {
          const { callee } = init;
          if (
            isMemberExpression(callee) &&
            isIdentifier(callee.object) &&
            isIdentifier(callee.property) &&
            callee.object.name === "React" &&
            callee.property.name === "memo"
          ) {
            componentNodeMap.set(id.name, { node: node, exported: false, hasDisplayName: false });
          }
        }
      },
      FunctionDeclaration(node) {
        const { id, body } = node;
        if (isIdentifier(id) && isComponentVariable(body)) {
          componentNodeMap.set(id.name, { node: node, exported: false, hasDisplayName: false });
        }
      },
      ClassDeclaration(node) {
        const { id, body } = node;
        body.body.forEach((bodyNode) => {
          // render関数が定義され、その中でJSXElementがreturnされている場合、Componentとみなす
          if (
            isMethodDefinition(bodyNode) &&
            isIdentifier(bodyNode.key) &&
            bodyNode.key.name === "render" &&
            isFunctionExpression(bodyNode.value) &&
            isComponentVariable(bodyNode.value.body)
          ) {
            const name = isIdentifier(id) ? id.name : DEFAULT_EXPORTED_CLASS_NAME;
            componentNodeMap.set(name, {
              node: node,
              exported: false,
              hasDisplayName: false,
            });
          }
        });
      },
      AssignmentExpression(node) {
        if (
          isMemberExpression(node.left) &&
          isIdentifier(node.left.property) &&
          isIdentifier(node.left.object) &&
          node.left.property.name === "displayName"
        ) {
          const name = node.left.object.name;
          const info = componentNodeMap.get(name);
          if (info !== undefined) {
            componentNodeMap.set(name, { ...info, hasDisplayName: true });
          }
        }
      },
      "ExportDefaultDeclaration:exit"(node: TSESTree.ExportDefaultDeclaration) {
        const { declaration } = node;
        if (isIdentifier(declaration)) {
          const name = declaration.name;
          const info = componentNodeMap.get(name);
          if (info) {
            componentNodeMap.set(name, { ...info, exported: true });
          }
        }

        if (isFunctionExpression(declaration) && isIdentifier(declaration.id)) {
          const info = componentNodeMap.get(declaration.id.name);
          if (info !== undefined) {
            componentNodeMap.set(declaration.id.name, { ...info, exported: true });
          }
        }

        if (isClassDeclaration(declaration)) {
          const name = isIdentifier(declaration.id)
            ? declaration.id.name
            : DEFAULT_EXPORTED_CLASS_NAME;
          const info = componentNodeMap.get(name);
          if (info !== undefined) {
            componentNodeMap.set(name, { ...info, exported: true });
          }
        }
      },
      "ExportNamedDeclaration:exit"(node: TSESTree.ExportNamedDeclaration) {
        const { declaration, specifiers } = node;
        if (isVariableDeclaration(declaration) && isIdentifier(declaration.declarations[0].id)) {
          const name = declaration.declarations[0].id.name;
          const info = componentNodeMap.get(name);
          if (info !== undefined) {
            componentNodeMap.set(name, { ...info, exported: true });
          }
        }

        if (isFunctionDeclaration(declaration) && isIdentifier(declaration.id)) {
          const name = declaration.id.name;
          const info = componentNodeMap.get(name);
          if (info !== undefined) {
            componentNodeMap.set(name, { ...info, exported: true });
          }
        }

        if (isClassDeclaration(declaration)) {
          const name = isIdentifier(declaration.id)
            ? declaration.id.name
            : DEFAULT_EXPORTED_CLASS_NAME;
          const info = componentNodeMap.get(name);
          if (info !== undefined) {
            componentNodeMap.set(name, { ...info, exported: true });
          }
        }

        specifiers.forEach((specifier) => {
          const { local } = specifier;
          if (isIdentifier(local)) {
            const name = local.name;
            const info = componentNodeMap.get(name);
            if (info !== undefined) {
              componentNodeMap.set(name, { ...info, exported: true });
            }
          }
        });
      },
      "Program:exit"() {
        const componentNames =
          context.options.length > 0 ? context.options[0] : DEFAULT_CHECK_COMPONENT_NAME;
        const checkedComponentNames = componentNames.concat(DEFAULT_EXPORTED_CLASS_NAME);
        componentNodeMap.forEach((info, componentName) => {
          if (
            checkedComponentNames.includes(componentName) &&
            info.exported &&
            !info.hasDisplayName
          ) {
            context.report({
              node: info.node,
              messageId,
            });
          }
        });
      },
    };
  },
};
