// var HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
var webpack = require('webpack'); //to access built-in plugins
var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (env, argv) {

    var plugins = [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
    ];

    return {
        devServer: {
            publicPath: "/dist/"
        },
        entry: {
            main: './src/index'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            libraryTarget: 'umd'
        },
        module: {
            //加载器配置
            rules: [
                //.css 文件使用 style-loader 和 css-loader 来处理
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader?minimize=true'
                    ]
                },
                //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
                {
                    test: /\.(png|jpg|gif|svg)(\?.*)?$/,
                    use: ['url-loader?limit=1&name=assets/[name].[ext]?[hash:6]']
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg)(\?.*)?$/,
                    use: ['url-loader?limit=1&name=assets/[name].[ext]?[hash:6]']
                },
                {test: /\.html$/, use: ['html-loader']}
            ],
        },
        plugins: plugins,
        externals: {
            jquery: "jQuery",
            jQuery: "jQuery"
        },
        optimization: {
            minimizer: [
                new UglifyJSPlugin({
                    uglifyOptions: {
                        ie8: true,
                        parse: {},
                        mangle: {},
                        compress: {},
                    },
                    sourceMap: true,
                })
            ]
        }
    };
};