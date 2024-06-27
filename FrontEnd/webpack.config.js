const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    target:["web","es5"],
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, '../static/dist'),
      filename: 'main.js',
    },

    target: "web",
    devServer: {
        compress:true,
        port:8080,
        historyApiFallback: true,
        open: true,
        hot: false,
        liveReload: true 
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.md$/,
                use: 'raw-loader'
            },
            {
                test: /\.html$/,
                exclude: [/node_modules/, require.resolve('./public/index.html')],
                use: {
                    loader: 'file-loader',
                },
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif|webp|pdf|ico)$/,
                loader: 'file-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
            },
            {
                test: /\.mp4$/,
                use: 'file-loader?name=videos/[name].[ext]',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./public/index.html" })
    ],
    devtool: 'source-map'
  };