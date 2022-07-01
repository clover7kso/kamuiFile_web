const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  webpack: (config) => {
    // 아래를 추가합니다.
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
