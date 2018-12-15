# webpack4 ES6 simple

Webpack4 + ES6 导出兼容 IE6/7/8 示例结构


为确保依赖库是最新版本, 用以下命令添加至依赖库
```
yarn add webpack webpack-dev-server url-loader style-loader mini-css-extract-plugin html-loader file-loader css-loader -D
```

## 注意不支持事项

不支持 es6 `import`, `export`, `async`, `await`, `yield` 语法

原因是 Webpack 不支持，若语法中有 `import` 相关关键字，webpack 导出结构会使用了 `Object.definedProperty`。

解决方案： 目前想到需要写插件， 替换Webpack的 `MainTemplate`。
