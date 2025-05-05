const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const babelLoader = webpackConfig.module.rules.find(
        (rule) => rule.oneOf
      ).oneOf.find(
        (rule) =>
          rule.loader &&
          rule.loader.includes("babel-loader")
      );

      // Thêm các thư viện cần transpile
      babelLoader.include = [
        path.resolve("src"), // Mã nguồn của bạn
        path.resolve("node_modules/socket.io-client"),
        path.resolve("node_modules/react-to-print"),
        path.resolve("node_modules/rehype-katex"),
        path.resolve("node_modules/remark-math"),
        path.resolve("node_modules/@uiw/react-markdown-preview"),
        path.resolve("node_modules/@uiw/react-md-editor"),
        path.resolve("node_modules/react-internet-meter"),
        path.resolve("node_modules/@reduxjs/toolkit"),
      ];

      // Đảm bảo plugin regex được áp dụng cho tất cả các file JS
      if (!babelLoader.options) {
        babelLoader.options = {};
      }
      if (!babelLoader.options.plugins) {
        babelLoader.options.plugins = [];
      }

      // Thêm plugin xử lý regex nếu chưa có
      if (!babelLoader.options.plugins.includes("@babel/plugin-transform-named-capturing-groups-regex")) {
        babelLoader.options.plugins.push("@babel/plugin-transform-named-capturing-groups-regex");
      }

      return webpackConfig;
    },
  },
};
