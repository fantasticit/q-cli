const path = require('path')
const program = require('commander')
const chalk = require('chalk')
const { name } = require('../utils/packageJSON')
const config = require('../config.json')
const writeJSONFile = require('../utils/writeJSONFile')

function getOrUpdateConfigViaKeyPath(keyPath, value) {
  const keys = keyPath.split('.')
  const lastKey = keys.pop()

  let target = keys.reduce((accu, key, i) => {
    accu = accu && accu[key]
    return accu
  }, config)

  if (!value) {
    return JSON.stringify(target[lastKey], null, 2)
  } else {
    try {
      value = JSON.parse(value)
    } catch (e) {}

    target[lastKey] = value
    return config
  }
}

function updateConfigJSONFile(content) {
  return writeJSONFile(path.resolve(__dirname, '../config.json'), content)
}

function output(value) {
  console.log()
  console.log(`${chalk.yellow(value)}`)
}

program
  .command('config [keyPath] [value]')
  .description(`show config via specified keyPath`)
  .option('-a --all', 'show all config')
  .action((keyPath, value, command) => {
    if (!keyPath || command.all || keyPath === '*' || keyPath === 'all') {
      updateConfigJSONFile(config)
      return output(JSON.stringify(config, null, 2))
    }

    if (!value) {
      return output(getOrUpdateConfigViaKeyPath(keyPath))
    }

    return updateConfigJSONFile(getOrUpdateConfigViaKeyPath(keyPath, value))
  })
