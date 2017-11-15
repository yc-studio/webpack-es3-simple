Webpack 公共环境说明
====================

## 配置 Webpack 公共环境

### 1. 安装公共依赖

```bash
npm -g i "webpack@^3" "webpack-dev-server@^2" css-loader "style-loader@0.18.2" file-loader url-loader html-loader "uglifyjs-webpack-plugin@^1"
```

或者

```bash
npm run init-webpack
```

> Note: "style-loader@0.19.0"  IE6/7 兼容问题

### 2. 设置`NODE_PATH` 环境变量

- Linux `export NODE_PATH=/usr/local/lib/node_modules`
- Windows 前往环境变量设置 `set NODE_PATH=C:\Users\{USERNAME}\AppData\Roaming\npm\node_modules`
