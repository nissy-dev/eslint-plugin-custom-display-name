import { tester } from "..";

import { preferUniqueDisplayName, messageId } from "../../src/rules/prefer-unique-display-name";

// Pick some rules from eslint-plugin-react
// see: https://github.com/yannickcr/eslint-plugin-react/blob/master/tests/lib/rules/display-name.js
describe("Test for prefer-unique-display-name", () => {
  tester.run("prefer-unique-display-name", preferUniqueDisplayName, {
    valid: [
      {
        code: `
          class Component extends React.Component {
            render() {
              return <div>Anonymous Component</div>;
            }
          }
          Component.displayName = 'UniqueComponent'
        `,
      },
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
          var Component = () => {
            return <div>Anonymous Component</div>;
          }
          Component.displayName = 'UniqueComponent'
        `,
      },
      {
        code: `
          let Component = () => {
            return <div>Anonymous Component</div>;
          }
          Component.displayName = 'UniqueComponent'
        `,
      },
      {
        code: `
          const Component = () => {
            return <div>Anonymous Component</div>;
          }
          Component.displayName = 'UniqueComponent'
        `,
      },
      {
        code: `
          function Component() {
            return <div>Anonymous Component</div>;
          }
          Component.displayName = 'UniqueComponent'
        `,
      },
      {
        code: `
          const Component = function () {
            return <div>Anonymous Component</div>;
          }
          Component.displayName = 'UniqueComponent'
        `,
      },
      // TODO: corner case
      // {
      //   code: `
      //     let test = {};
      //     test.displayName = 'test'
      //   `,
      // },
    ],
    invalid: [
      {
        code: `
          class Component extends React.Component {
            render() {
              return <div>Anonymous Component</div>;
            }
          }
          Component.displayName = 'Component'
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          export class Component extends React.Component {
            render() {
              return <div>Anonymous Component</div>;
            }
          }
          Component.displayName = 'Component'
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
          Component.displayName = 'Component'
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          var Component = () => {
            return <div>Anonymous Component</div>;
          }
          Component.displayName = 'Component'
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          let Component = () => {
            return <div>Anonymous Component</div>;
          }
          Component.displayName = 'Component'
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          const Component = () => {
            return <div>Anonymous Component</div>;
          }
          Component.displayName = 'Component'
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          function Component() {
            return <div>Anonymous Component</div>;
          }
          Component.displayName = 'Component'
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          const Component = function () {
            return <div>Anonymous Component</div>;
          }
          Component.displayName = 'Component'
        `,
        errors: [{ messageId }],
      },
    ],
  });
});
