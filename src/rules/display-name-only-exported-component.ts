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
} from "../type-predicates";
import { isComponentVariable } from "../isComponentVariable";

type ComponentNodeInfo = {
  node: TSESTree.Node;
  exported: boolean;
  hasDisplayName: boolean;
};

const AnnonymousDefaultExportedClassName = "Annonymous-Default-Exported-Class";

export const messageId = "noDisplayName";

export const displayNameOnlyExportedComponent: TSESLint.RuleModule<typeof messageId, []> = {
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
    schema: [],
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
            const name = isIdentifier(id) ? id.name : AnnonymousDefaultExportedClassName;
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
          if (info) {
            componentNodeMap.set(declaration.id.name, { ...info, exported: true });
          }
        }

        if (isClassDeclaration(declaration)) {
          const name = isIdentifier(declaration.id)
            ? declaration.id.name
            : AnnonymousDefaultExportedClassName;
          const info = componentNodeMap.get(name);
          if (info) {
            componentNodeMap.set(name, { ...info, exported: true });
          }
        }
      },
      "ExportNamedDeclaration:exit"(node: TSESTree.ExportNamedDeclaration) {
        if (
          isVariableDeclaration(node.declaration) &&
          isIdentifier(node.declaration.declarations[0].id)
        ) {
          const name = node.declaration.declarations[0].id.name;
          const info = componentNodeMap.get(name);
          if (info) {
            componentNodeMap.set(name, { ...info, exported: true });
          }
        }

        if (isFunctionDeclaration(node.declaration) && isIdentifier(node.declaration.id)) {
          const name = node.declaration.id.name;
          const info = componentNodeMap.get(name);
          if (info) {
            componentNodeMap.set(name, { ...info, exported: true });
          }
        }

        if (isClassDeclaration(node.declaration)) {
          const name = isIdentifier(node.declaration.id)
            ? node.declaration.id.name
            : AnnonymousDefaultExportedClassName;
          const info = componentNodeMap.get(name);
          if (info) {
            componentNodeMap.set(name, { ...info, exported: true });
          }
        }

        node.specifiers.forEach((specifier) => {
          const { local } = specifier;
          if (isIdentifier(local)) {
            const name = local.name;
            const info = componentNodeMap.get(name);
            if (info) {
              componentNodeMap.set(name, { ...info, exported: true });
            }
          }
        });
      },
      "Program:exit"() {
        componentNodeMap.forEach((info) => {
          if (info.exported && !info.hasDisplayName) {
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