const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const program = require('commander')

module.exports = function(dir) {
  if (!fs.statSync(dir).isDirectory()) {
    console.log()
    console.log(
      `  ` + `Need a dir to load commands, but got ${chalk.yellow(dir)}`
    )
    process.exit(1)
  }

  const resolve = filePath => path.resolve(dir, filePath)

  return fs
    .readdirSync(dir)
    .filter(Boolean)
    .forEach(file => require(resolve(file)))
}
