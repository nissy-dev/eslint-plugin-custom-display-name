import { TSESTree } from "@typescript-eslint/experimental-utils";

import {
  isJSXElement,
  isBlockStatement,
  isReturnStatement,
  isConditionalExpression,
} from "./typePredicates";

export const isComponentVariable = (node: TSESTree.Expression | TSESTree.BlockStatement) => {
  if (isJSXElement(node)) {
    return true;
  }

  if (isBlockStatement(node)) {
    // どこかでJSXElementをreturnしている関数であれば、Componentとみなす
    for (const bodyChildNode of node.body) {
      if (isReturnStatement(bodyChildNode)) {
        if (isJSXElement(bodyChildNode.argument)) {
          return true;
        }

        // ３項演算子でJSXElementを返す関数にも対応
        if (isConditionalExpression(bodyChildNode.argument)) {
          if (
            isJSXElement(bodyChildNode.argument.consequent) ||
            isJSXElement(bodyChildNode.argument.alternate)
          ) {
            return true;
          }
        }
      }
    }
  }

  return false;
};
