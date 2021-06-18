const { nextI18NextRewrites } = require("next-i18next/rewrites");

const localeSubpaths = {
  "zh-CN": "zh",
  "en-US": "en",
};

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  webpack: function (config) {
    config.node = {
      fs: 'empty'
    }

    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
};
