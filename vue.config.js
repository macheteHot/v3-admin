const path = require('path')
const CssGeneratorPlugin = require('css-generator-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const LogInfo = require('log-info-webpack-plugin')
const importAssetsFromCdn = require('import-assets-from-cdn')
const { version, dependencies: deps } = require('./package.json')

function resolve (dir) {
  return path.join(__dirname, dir)
}
const cdn = { // 将会注入index.html js 顺序不可乱 注意版本
  css: [
  ],
  js: [
    `https://g.alicdn.com/dingding/dingtalk-jsapi/${deps['dingtalk-jsapi']}/dingtalk.open.js`,
    `https://cdn.jsdelivr.net/npm/vue@${deps.vue}/dist/vue.min.js`,
    `https://cdn.jsdelivr.net/npm/vue-router@${deps['vue-router']}/dist/vue-router.min.js`,
    `https://cdn.jsdelivr.net/npm/axios@${deps.axios}/dist/axios.min.js`,
    `https://cdn.jsdelivr.net/npm/moment@${deps.moment}/moment.min.js`,
    `https://cdn.jsdelivr.net/npm/moment@${deps.moment}/locale/zh-cn.min.js`,
    `https://cdn.jsdelivr.net/npm/lodash@${deps.lodash}/lodash.min.js`
  ]
}

module.exports = {
  runtimeCompiler : true,
  devServer       : {
    // host: "localhost",
    port             : 8080, // 端口号
    https            : false, // https:{type:Boolean}
    open             : false, // 配置自动启动浏览器
    disableHostCheck : true, // 解决127.0.0.1指向其他域名时出现"Invalid Host header"问题
    proxy            : {
      '/api': {
        target      : 'http://xxx:8000',
        changOrigin : true,
        pathRewrite : { '^/api': '/' }
      }
    }
  },
  publicPath   : process.env.VUE_APP_PUBLIC_PATH,
  outputDir    : 'dist', // 项目名
  lintOnSave   : true, // 编译警告
  // auto fix eslint
  chainWebpack : config => {
    config
      .module
      .rule('less')
      .oneOf('normal')
      .use('less-loader')
      .loader('less-loader')
      .options({
        modifyVars: {
          hack: `true; @import "${resolve('/src/style/antdMearge.less')}";`
        },
        javascriptEnabled: true
      })
    config
      .plugin('importAssetsFromCdn')
      .use(importAssetsFromCdn, [cdn])
      .end()
      .plugin('LogInfo')
      .use(LogInfo, [{ version }])
      .end()
      .plugin('CssGeneratorPlugin')
      .use(CssGeneratorPlugin)
    config.resolve.alias
      .set('@', resolve('src'))
    config
      .module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      // 6kb 过于小会导致请求次数变多 影响优化
      // 同时添加css 路径到cdn
      .tap(options => Object.assign(options, {
        limit: 6144
      }))
    config
      .when(process.env.NODE_ENV === 'production',
        config => {
          config.merge({
            externals: {
              vue              : 'Vue',
              'vue-router'     : 'VueRouter',
              axios            : 'axios',
              lodash           : '_',
              moment           : 'moment',
              'dingtalk-jsapi' : 'dd'
            }
          })
          config.devtool('none')
          config.optimization.minimizer('terser').tap((args) => {
            args[0].terserOptions.compress.drop_console = true // 移除 console.log
            return args
          })
          config
            // 生成gzip文件
            .plugin('CompressionPlugin')
            .use(CompressionPlugin)
            .end()
        }
      )
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('eval-source-map')
      )
  }
}
