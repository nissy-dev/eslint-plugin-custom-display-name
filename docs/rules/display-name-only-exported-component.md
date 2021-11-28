# Exported Component requires displayName (custom-display-name/display-name-only-exported-component)

This rule prevents components which doesn't have unique name and `displayName` from exporting.

## 📖 Rule Details

👍 Examples of **correct** code for this rule:

```ts
const Component = () => {
  return <div>Anonymous Component</div>;
};
Component.displayName = "UniqueName";
export { Component };
```

👎 Examples of **incorrect** code for this rule:

```ts
const Component = () => {
  return <div>Anonymous Component</div>;
};
export { Component };
```

## Options

This rule checks components with the names as `Component`, `StyledComponent`, and `Container` by default.

If you check another components, you could overide the default settings like this.

```json

// This rule checks components with the names as ComponentA and ComponentB
"custom-display-name/display-name-only-exported-component": ["error", ["ComponentA", "ComponentB"]]

```
