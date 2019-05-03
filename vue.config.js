// import GenerateAssetPlugin from 'generate-asset-webpack-plugin'
module.exports = {
  // 修改为相对路径
  baseUrl: './',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  }
  // configureWebpack: {
  //   // 让打包的时候输出可配置的文件
  //   plugins: [
  //     new GenerateAssetPlugin({
  //       filename: 'serverconfig.json',
  //       fn: (compilation, cb) => {
  //         cb(null, (compilation) => {
  //           let cfgJson = {ApiUrl: 'http://10.63.21.5:9000/api/'}
  //           return JSON.stringify(cfgJson)
  //         })
  //       },
  //       extraFiles: []
  //     })
  //   ]
  // }
}
