
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlBeautifyPlugin  = require("html-beautify-webpack-plugin");
const path = require('path');
const PUBLIC_PATH = path.join(__dirname, 'public');
const SRC_PATH = path.join(__dirname, 'src');

//postcss-loader
const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: () => [
            // require('autoprefixer')('last 2 versions', 'Safari >= 9', 'ie >= 11', 'ff >= 40', 'Chrome >= 40', 'iOS >= 9'),
        ],
    },
};

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: PUBLIC_PATH,
        filename: 'index.js',
    },
    module: {

        rules: [
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        interpolate: true,
                        // minimize: true,
                    },
                }],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    "sass-loader?sourceMap",
                    postcssLoader
                ]
            },
            {
                test: /\.(png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(SRC_PATH, 'index.html')
        }),
        new HtmlBeautifyPlugin(),
    ],
    devServer: {
        contentBase: PUBLIC_PATH,
        compress: true,
        port: 9000,
        host: 'localhost'
    },
};
