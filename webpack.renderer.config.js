const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [require("tailwindcss"), require("autoprefixer")],
        },
      },
    },
  ],
});

module.exports = {
  // Put your normal webpack config below here
  devServer: {
    proxy: {
      '/': {
        target: 'https://pharma-back.onrender.com',  // Backend server URL
        secure: false,                    // If using https, set this to true
        changeOrigin: true,               // Needed for virtual hosted sites
      },
    },
  },
  module: {
    rules,
  },
};
