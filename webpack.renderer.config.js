const rules = require('./webpack.rules');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'Assets', 'Icons'),
          to: path.resolve(__dirname, '.webpack', 'renderer', 'Assets', 'Icons'),
        },
      ],
    }),
  ]
};
