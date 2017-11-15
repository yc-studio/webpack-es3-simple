var webpack = require('webpack'); //to access built-in plugins
var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const NODE_PATH = process.env.NODE_PATH;

if (!NODE_PATH) {
    console.error('Undefined ENV "NODE_PATH"');
    process.exit();
}

module.exports = function (env, argv) {

    const PRODUCTION = env.hasOwnProperty('prod');

    var plugins = [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ];
    if (PRODUCTION) {

        //配置选项参考： https://webpack.js.org/plugins/uglifyjs-webpack-plugin/#options
        plugins.push(new UglifyJSPlugin({
            uglifyOptions: {
                ie8: true,
                ecma: 6,
                parse: {},
                mangle: {
                },
                compress: {},
            },
            sourceMap: true,
        }));
    }

    return {
        devtool: "cheap-source-map",
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
                        'style-loader',
                        'css-loader'
                    ]
                },
                //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
                {
                    test: /\.(png|jpg)$/,
                    use: 'url-loader?limit=1&name=assets/[name]-[hash:6].[ext]'
                },
                {test: /\.html$/, use: ['html-loader']}
            ],
        },
        plugins: plugins,
        externals: {
            jquery: "jQuery",
            jQuery: "jQuery"
        },
        resolveLoader: {
            modules: [
                NODE_PATH,
                "node_modules"
            ]
        }
    };
};