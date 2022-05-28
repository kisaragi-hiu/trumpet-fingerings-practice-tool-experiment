import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [resolve(), babel({ babelHelpers: "bundled" })],
};
