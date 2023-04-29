const path = require("path");

/**
 * @type {import('@rspack/cli').Configuration}
 */
const baseConfig = {
  mode: process.env.NODE_ENV ?? "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        type: "jsx",
      },
      {
        test: /\.ts$/,
        type: "tsx",
      },
    ],
  },
  entry: {
    index: "./src/index.ts",
  },
  externals: {
    react: "react",
    "react-dom": "react-dom/client",
  },
};

/**
 * @type {import('@rspack/cli').Configuration}
 */
const moduleConfig = {
  ...baseConfig,
  output: {
    module: true,
    path: path.resolve(__dirname, "dist"),
    filename: "[name].es.js",
    libraryTarget: "module",
  },
};

/**
 * @type {import('@rspack/cli').Configuration}
 */
const commonjsConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    libraryTarget: "commonjs",
  },
};

module.exports = [moduleConfig, commonjsConfig];
