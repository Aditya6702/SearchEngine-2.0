const path = require("path");

module.exports = function override(config, env) {
  // Add a new rule to the webpack configuration for processing HTML files
  config.module.rules.push({
    test: /\.html$/,
    loader: "html-loader",
  });

  // Return the modified webpack configuration
  return config;
};
