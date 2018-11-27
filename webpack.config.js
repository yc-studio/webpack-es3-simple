// var HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
var webpack = require('webpack'); //to access built-in plugins
var TerserPlugin = require('terser-webpack-plugin'); // uglify-webpack-plugin => terser-webpack-plugin
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (env, argv) {
    var IS_DEV = env && env.mode === 'development';
    console.log('Dev: ', IS_DEV);

    var extendOptions = IS_DEV ?
        { //Development options
            mode: 'development',
            devtool: 'cheap-eval-source-map'
        } :
        { //Production options
            mode: 'production',
            optimization: {
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            ie8: true,
                        },
                        sourceMap: true,
                    })
                ]
            }
        };


    return Object.assign({
        entry: {
            main: './src/index'
        },
        output: {
            filename: '[name].js',
            libraryTarget: 'umd'
        },
        module: {
            //加载器配置
            rules: [
                //.css 文件使用 style-loader 和 css-loader 来处理
                {
                    test: /\.css$/,
                    use: IS_DEV ? [
                        // 开发模式使用 style-loader 支持 hot reload (修改样式无刷新样式变更)
                        'style-loader',
                        'css-loader',
                    ] : [
                        // 生产环境CSS打包压缩
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
        plugins: [
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
        ],
        externals: {
            jquery: "jQuery",
            jQuery: "jQuery"
        },
    }, extendOptions);
};