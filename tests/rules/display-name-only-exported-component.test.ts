import { tester } from "..";

import {
  displayNameOnlyExportedComponent,
  messageId,
} from "../../src/rules/display-name-only-exported-component";

// Pick some rules from eslint-plugin-react
// see: https://github.com/yannickcr/eslint-plugin-react/blob/master/tests/lib/rules/display-name.js
describe("Test for display-name-only-exported-component", () => {
  tester.run("display-name-only-exported-component", displayNameOnlyExportedComponent, {
    valid: [
      {
        code: `
          export class Component extends React.Component {
            render() {
              return <div>Anonymous Component</div>;
            }
          }
          Component.displayName = 'UniqueComponent'
        `,
      },
      {
        code: `
          export default class Component extends React.Component {
            render() {
              return <div>Anonymous Component</div>;
            }
          }
          Component.displayName = 'UniqueComponent'
        `,
      },
      {
        code: `
          export var Component = () => {
            return <div>Anonymous Component</div>;
          }
          Component.displayName = 'UniqueComponent'
        `,
      },
      {
        code: `
          export const Component = () => {
            return <div>Anonymous Component</div>;
          }
          Component.displayName = 'UniqueComponent'
        `,
      },
      {
        code: `
          export function Component() {
            return <div>Anonymous Component</div>;
          }
          Component.displayName = 'UniqueComponent'
        `,
      },
      {
        code: `
          export const Component = function () {
            return <div>Anonymous Component</div>;
          }
          Component.displayName = 'UniqueComponent'
        `,
      },
      {
        code: `
          class Component extends React.Component {
            render() {
              return <div>Anonymous Component</div>;
            }
          }
          export { Component }
          Component.displayName = 'UniqueComponent'
        `,
      },
      {
        code: `
          class Component extends React.Component {
            render() {
              return <div>Anonymous Component</div>;
            }
          }
          export default Component;
          Component.displayName = 'UniqueComponent'
        `,
      },
      {
        code: `
          const Component = () => {
            return <div>Anonymous Component</div>;
          }
          export { Component }
          Component.displayName = 'UniqueComponent'
        `,
      },
      {
        code: `
          const Component = () => {
            return <div>Anonymous Component</div>;
          }
          export default Component
          Component.displayName = 'UniqueComponent'
        `,
      },
      {
        code: `
          const value = 123;
          export { value };
        `,
      },
      {
        code: `
          const value = 123;
          export default value;
        `,
      },
      {
        code: `
          const value = () => {
            return null;
          };
          export { value };
        `,
      },
      {
        code: `
          const value = () => {
            return null;
          };
          export default value;
        `,
      },
      {
        code: `
          const ComponentA = () => {
            return <div>Anonymous Component</div>;
          }
          const ComponentB = () => {
            return <div>Anonymous Component</div>;
          }
          ComponentA.displayName = 'UniqueStyledComponent';
          export { ComponentA }
        `,
      },
      {
        code: `
          const Component = () => {
            return <div>Anonymous Component</div>;
          }
          const StyledComponent = styled(Component)\`
            display: flex;
          \`;
          StyledComponent.displayName = 'UniqueStyledComponent';
          export { StyledComponent }
        `,
      },
      {
        code: `
          const StyledComponent = styled.div\`
            display: flex;
          \`;
          StyledComponent.displayName = 'UniqueStyledComponent';
          export { StyledComponent }
        `,
      },
      {
        code: `
          const UniqueComponent = () => {
            return <div>Anonymous Component</div>;
          }
          export default UniqueComponent
        `,
      },
    ],
    invalid: [
      {
        code: `
          export class Component extends React.Component {
            render() {
              return <div>Anonymous Component</div>;
            }
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          export default class Component extends React.Component {
            render() {
              return <div>Anonymous Component</div>;
            }
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          export default class extends React.Component {
            render() {
              return <div>Anonymous Component</div>;
            }
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          export var Component = () => {
            return <div>Anonymous Component</div>;
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          export let Component = () => {
            return <div>Anonymous Component</div>;
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          export const Component = () => {
            return <div>Anonymous Component</div>;
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          export function Component() {
            return <div>Anonymous Component</div>;
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          export const Component = function () {
            return <div>Anonymous Component</div>;
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          const Component = () => {
            return <div>Anonymous Component</div>;
          }
          export { Component }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          const Component = () => {
            return <div>Anonymous Component</div>;
          }
          export default Component
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          const Component = () => {
            return <div>Anonymous Component</div>;
          }
          const StyledComponent = styled(Component)\`
            display: flex;
          \`;
          const Container = () => {
            return <StyledComponent />
          }
          export { Container }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          const Component = () => {
            return <div>Anonymous Component</div>;
          }
          const StyledComponent = styled(Component)\`
            display: flex;
          \`;
          export { StyledComponent }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          const StyledComponent = styled.div\`
            display: flex;
          \`;
          export { StyledComponent }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          const UniqueComponent = () => {
            return <div>Anonymous Component</div>;
          }
          export default UniqueComponent
        `,
        options: [["UniqueComponent"]],
        errors: [{ messageId }],
      },
    ],
  });
});
