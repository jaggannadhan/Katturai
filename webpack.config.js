const path = require("path");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'public/dist'),
      filename: 'main.js',
    },

    target: "web",
    devServer: {
        open: true,
        hot: true,
        liveReload: true 
    },

    resolve: {
        extensions: ['.js', 'jsx', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    devtool: 'source-map'
  };