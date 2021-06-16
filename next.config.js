const { nextI18NextRewrites } = require("next-i18next/rewrites");

const isProd = process.env.NODE_ENV === 'production'

const localeSubpaths = {
  "zh-CN": "zh",
  "en-US": "en",
};

module.exports = {
  assetPrefix: isProd ? 'https://www.apiseven.com' : '',
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
