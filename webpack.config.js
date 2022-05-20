const path = require('path');

var config = {
  entry: './src/seleniumExport.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dist.js'
  },
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          compiler: 'typescript',
        },
      },
    ],
  },

  plugins: [],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  }
};


module.exports = config;
