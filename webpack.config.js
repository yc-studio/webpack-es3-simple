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
    let IS_DEV = env && env.mode === 'development';
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
                    use: ['babel-loader'],
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
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            }),

            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: resolve('public/index.html')
            }),

            // function (compiler) {
            // console.log(compiler.hooks.compilation);
            // process.exit();

            // // 尝试让 IE8 支持 import/export
            // compiler.hooks.compilation.tap('Es3Compat', function(compilation) {
            //     compilation.mainTemplate.hooks.requireExtensions.tap('MainTemplate', function (source, chunk, hash) {
            //         console.log(source.split("\n"));
            //         process.exit();
            //         //
            //         const lines = source.split("\n");
            //         lines[10] = "exports[name] = getter(); // Es3 Fixed";
            //         lines[16] = lines[17] = lines[18] = '';
            //         lines[19] = "exports.__esModule = true; // Es3 Fixed";
            //
            //         return lines.join("\n");
            //     });
            // });
            // }
        ],
        resolve: {
            alias: {
                '@': resolve('src/'),
            }
        },
        externals: {
            jquery: "jQuery" // import $ from 'jquery';  window.jQuery;
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