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
    - api # 接口交互模块
    - components  # 公共组件
    - filters   # 过滤器
    - directives  # 指令集合
    - router   # vue router
    - store   # vuex
    - views   # 视图组件

    - App.vue
    - main.js   # 入口js
    - main.styl # 全局样式
  - .gitlab-ci.yml # cicd 配置文件
  ```

### 命名规范， 见[vue风格指南](https://cn.vuejs.org/v2/style-guide/)
- 文件名：　
  - *.vue 结尾的文件及与其对应的 *.js *.styl 使用大驼峰　——　`HelloWorld.vue; HelloWorld.js; HelloWorld.styl`
  - 其他文件使用小驼峰 —— `main.js`
- 变量命名：小驼峰　——　`userName`

## 开发流程

### 分支结构
- master 生产分支，只允许从integration分支合并； 每次提交会发布预发布[staging]环境； `上线需要手动触发CI[repositry master可以触发]`
- integration 测试分支， 只允许从feature分支合并； 每次提交会发布测试[integration]环境
- feature 模块分支， 从integration切出来，开发每个模块，开发完了之后合并到integration分支，并删除feature分支

### 代码审核
- master 分支、 integration 分支的合并 assign 给团队其他人。
- 尽量避免自己提交merge request； 自己合并

### 上线
- integration环境提测
- 测试通过合并master分支
- 验证staging环境是否正确
- 让项目的 master/owner 去 staging 对应的 pipline 手动出发生产的部署命令
