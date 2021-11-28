# displayName should be different from component's variable name (custom-display-name/prefer-unique-display-name)

This rule prevents `displayName` from being the same as the component's variable name.

## 📖 Rule Details

It doesn't make sense if the component's variable name and `displayName` are the same.

👍 Examples of **correct** code for this rule:

```ts
const Component = () => {
  return <div>Anonymous Component</div>;
};
Component.displayName = "UniqueComponent";
```

👎 Examples of **incorrect** code for this rule:

```ts
const Component = () => {
  return <div>Anonymous Component</div>;
};
Component.displayName = "Component";
```
