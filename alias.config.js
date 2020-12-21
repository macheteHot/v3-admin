// alias.config.js
/**
 * webStorm 配置别名专用文件
 * @param dir
 * @returns {*}
 */
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src')
      // 'common': resolve('src/common'),
      // 'api': resolve('src/api'),
      // 'xxx': resolve('src/xxxx')
    }
  }
}
