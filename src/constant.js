const path = require('path')

const config = require(path.resolve(__dirname, '../package.json'))

// 导出 package.json 字段
module.exports = {
  author: config.author,
  cliName: config.name,
  repos: config.repos,
  repository: config.repository.url,
  version: config.version
}
