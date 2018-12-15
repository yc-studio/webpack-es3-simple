module.exports = {
    root: true,
    "parser": "babel-eslint",
    parserOptions: {
        "sourceType": "module",
        "allowImportExportEverywhere": false,
        // "codeFrame": true,
        "ecmaVersion": 2017,
    },
    env: {
        browser: true,
        node: true,
        es6: true,
        jquery: true,
        commonjs: true,
        amd: true,
    },
    extends: ["eslint:recommended"],
    rules: {
        'no-console': 'off',
        "indent": [
            "error",
            4
        ],
        "no-var": [
            "error"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        'no-return-assign': [0],
        'one-var': 0,
        'space-before-function-paren': 0,
        'semi': 2,
    },
    // check if imports actually resolve
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': 'webpack.conf.js'
            }
        }
    },
    "globals": {
        'Promise': true,
        '__webpack_public_path__': true,
        'YCGAME_CORS_PROXY_HTML': true,
    },
    "plugins": [
        "babel"
    ]
    // add your custom rules here
    //it is base on https://github.com/vuejs/eslint-config-vue
}
