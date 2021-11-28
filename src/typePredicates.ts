import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/experimental-utils";

export const isIdentifier = (node: TSESTree.BaseNode | null): node is TSESTree.Identifier => {
  return node !== null && node.type === AST_NODE_TYPES.Identifier;
};

export const isLiteral = (node: TSESTree.BaseNode | null): node is TSESTree.Literal => {
  return node !== null && node.type === AST_NODE_TYPES.Literal;
};

export const isMemberExpression = (
  node: TSESTree.BaseNode | null
): node is TSESTree.MemberExpression => {
  return node !== null && node.type === AST_NODE_TYPES.MemberExpression;
};

export const isArrowFunctionExpression = (
  node: TSESTree.BaseNode | null
): node is TSESTree.ArrowFunctionExpression => {
  return node !== null && node.type === AST_NODE_TYPES.ArrowFunctionExpression;
};

export const isFunctionExpression = (
  node: TSESTree.BaseNode | null
): node is TSESTree.FunctionExpression => {
  return node !== null && node.type === AST_NODE_TYPES.FunctionExpression;
};

export const isVariableDeclaration = (
  node: TSESTree.BaseNode | null
): node is TSESTree.VariableDeclaration => {
  return node !== null && node.type === AST_NODE_TYPES.VariableDeclaration;
};

export const isFunctionDeclaration = (
  node: TSESTree.BaseNode | null
): node is TSESTree.FunctionDeclaration => {
  return node !== null && node.type === AST_NODE_TYPES.FunctionDeclaration;
};

export const isMethodDefinition = (
  node: TSESTree.BaseNode | null
): node is TSESTree.MethodDefinition => {
  return node !== null && node.type === AST_NODE_TYPES.MethodDefinition;
};

export const isClassDeclaration = (
  node: TSESTree.BaseNode | null
): node is TSESTree.ClassDeclaration => {
  return node !== null && node.type === AST_NODE_TYPES.ClassDeclaration;
};

export const isTaggedTemplateExpression = (
  node: TSESTree.BaseNode | null
): node is TSESTree.TaggedTemplateExpression => {
  return node !== null && node.type === AST_NODE_TYPES.TaggedTemplateExpression;
};

export const isCallExpression = (
  node: TSESTree.BaseNode | null
): node is TSESTree.CallExpression => {
  return node !== null && node.type === AST_NODE_TYPES.CallExpression;
};

export const isJSXElement = (node: TSESTree.BaseNode | null): node is TSESTree.JSXElement => {
  return node !== null && node.type === AST_NODE_TYPES.JSXElement;
};

export const isBlockStatement = (
  node: TSESTree.BaseNode | null
): node is TSESTree.BlockStatement => {
  return node !== null && node.type === AST_NODE_TYPES.BlockStatement;
};

export const isReturnStatement = (
  node: TSESTree.BaseNode | null
): node is TSESTree.ReturnStatement => {
  return node !== null && node.type === AST_NODE_TYPES.ReturnStatement;
};

export const isConditionalExpression = (
  node: TSESTree.BaseNode | null
): node is TSESTree.ConditionalExpression => {
  return node !== null && node.type === AST_NODE_TYPES.ConditionalExpression;
};
