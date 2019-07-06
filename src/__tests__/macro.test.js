import pluginTester from "babel-plugin-tester";
import path from "path";
import plugin from "babel-plugin-macros";

pluginTester({
  plugin,
  snapshot: false,
  fixtures: path.join(__dirname, "../__fixtures__"),
  tests: [
    {
      title: 'variable declaration with left side not an array pattern',
      code: `
        import betterAsyncAwait from "../macro";
        async function test() {
          const data = await betterAsyncAwait(getData());
        }
      `,
      error: true
    },
    {
      title: 'no await expression',
      code: `
        import betterAsyncAwait from "../macro";
        async function test() {
          const [err, resp] = betterAsyncAwait(getData());
        }
      `,
      error: true
    },
    {
      title: 'assignment expression with left hand side not an array pattern',
      code: `
        import betterAsyncAwait from "../macro";
        async function test() {
          let err,results;
          results = await betterAsyncAwait(getData());
        }
      `,
      error: true
    }
  ],
  babelOptions: { filename: __filename }
});
