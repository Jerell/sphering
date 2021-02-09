const isProd = process.env.NODE_ENV === "production";

module.exports = {
  trailingSlash: true,
  // exportPathMap: function () {
  //   return {
  //     "/": { page: "/" },
  //   };
  // },
  assetPrefix: isProd
    ? "https://cdn.statically.io/gh/jerell/sphering/gh-pages"
    : "",
};
