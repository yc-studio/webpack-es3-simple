const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const mergeWith = require('lodash/mergeWith');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

function resolve(name) {
    return path.resolve(__dirname, name);
}

function assets(name) {
    return 'assets/' + name;
}

module.exports = function (env, argv) {
    const IS_DEV = env && env.mode === 'development';
    const DEBUG  = env && env.debug;
    console.log('Dev: ', IS_DEV);

    let extendOptions = IS_DEV ? {
        mode: 'development',
        devtool: 'cheap-module-source-map',
        devServer: {
            host: '0.0.0.0',
            disableHostCheck: true,
            contentBase: resolve('public'),
            inline: true,
        },
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        // 开发模式使用 style-loader 支持 hot reload (修改样式无刷新样式变更)
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                },
            ]
        }
    } : {
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        // 生产环境CSS打包压缩
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new CopyWebpackPlugin([{
                from: resolve('public'),
            }]),
            new MiniCssExtractPlugin({
                filename: assets("[name].[hash:6].min.css"),
                chunkFilename: assets("[id].[hash:6].min.css"),
            }),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        ie8: true,
                    },
                    sourceMap: true,
                }),
                new OptimizeCSSAssetsPlugin(),
            ]
        }
    };

    const options = {
        entry: {
            main: '@/index'
        },
        output: {
            filename: assets('[name].[hash:6].js'),
            // libraryTarget: 'umd'
        },
        module: {
            //加载器配置
            rules: [
                {
                    test: /\.js$/,
                    use: ['eslint-loader'],
                    enforce: 'pre',
                    include: [resolve('src')],
                },
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            // cacheDirectory: resolve('.tmp'),
                            // babelrc: true,
                        }
                    },
                    include: [resolve('src')],
                },
                //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
                {
                    test: /\.(png|jpg|gif|svg)(\?.*)?$/,
                    use: ['url-loader?limit=1&name=' + assets('[name].[hash:6].[ext]')]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg)(\?.*)?$/,
                    use: ['url-loader?limit=1&name=' + assets('[name].[hash:6].[ext]')]
                },
                {test: /\.html$/, use: ['html-loader']}
            ],
        },
        plugins: [
            // new webpack.ProvidePlugin({
            //     $: 'jquery',
            //     jQuery: 'jquery',
            // }),

            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: resolve('public/index.html')
            }),
        ],
        resolve: {
            alias: {
                '@': resolve('src/'),
            }
        },
        externals: {
            // jquery: "jQuery" // import $ from 'jquery';  window.jQuery;
        },
    };

    mergeWith(options, extendOptions, (objValue, srcValue) => {
        if (Array.isArray(objValue)) {
            return objValue.concat(srcValue);
        }
    });

    // console.log(options);
    // console.log(extendOptions);
    // process.exit();
    return options;
};