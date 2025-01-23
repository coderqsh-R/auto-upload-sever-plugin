const typesript = require("@rollup/plugin-typescript")
const babel = require("@rollup/plugin-babel")
const terser = require("@rollup/plugin-terser")
const resolve = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")

/**
 * @type {import("rollup").RollupOptions}
 */
const config = {
  input: "./src/main.ts",
  output: [
    {
      file: "./dist/bundle.esm.js",
      format: "esm",
      globals: {
        nodeSsh: "nodeSsh"
      }
    },
    {
      file: "./dist/bundle.cjs.js",
      format: "cjs",
      globals: {
        nodeSsh: "nodeSsh"
      }
    },
    {
      file: "./dist/bundle.umd.js",
      format: "umd",
      name: "auto",
      globals: {
        nodeSsh: "nodeSsh"
      }
    }
  ],
  external: ["node-ssh"],
  plugins: [resolve(), commonjs(), typesript(), babel({ babelHelpers: "bundled" }), terser()]
}

module.exports = config
