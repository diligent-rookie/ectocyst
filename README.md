# jduc web

## introduction
- 地震监测的前端框架 —— vue

## TODO LIST
- 1 前端页面开发 后端接口开发
- 2 前后端联调
- 3 集体测试 测试上线

## build step

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start

# build for production with minification
npm run build
```

##　开发环境：　
- node: 8.10
- npm: 6.1
- vue: 2.5
- vue/cli: 3.0

## 项目结构

### 目录结构
  ```bash
  - public
    - favicon.ico
    - index.html  # 入口html
  - src   # 业务代码
    - assets  # 图片，字体等资源
    - service # 接口交互模块
    - components  # 公共组件
    - filters   # 过滤器
    - directives  # 指令集合
    - router   # vue router
    - store   # vuex
    - views   # 视图组件

    - App.vue
    - main.js   # 入口js
    - main.styl # 全局样式
  ```

### 命名规范， 见[vue风格指南](https://cn.vuejs.org/v2/style-guide/)
- 文件名：　
  - *.vue 结尾的文件及与其对应的 *.js *.styl 使用大驼峰　——　`HelloWorld.vue; HelloWorld.js; HelloWorld.styl`
  - 其他文件使用小驼峰 —— `main.js`
- 变量命名：小驼峰　——　`userName`

### 需求分析
- 结合文档和原系统截图分析
- 结合后端接口分析项目需求
