// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const { merge } = require("webpack-merge");
const { generateWebpackConfig } = require("shakapacker");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const webpackConfig = generateWebpackConfig();

module.exports = merge(webpackConfig, {
  plugins: [new ForkTsCheckerWebpackPlugin()],
});
