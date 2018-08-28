#!/usr/bin/env node

const path = require('path')
const chalk = require('chalk')
const program = require('commander')
const loadCommands = require('./utils/loadCommand')
const enhanceErrorMessages = require('./utils/enhanceErrorMessages')

loadCommands(path.resolve(__dirname, './commands/'))

// no input, output help
if (process.argv.slice(2).length === 0) {
  program.outputHelp()
}

// enhance common error messages
enhanceErrorMessages(
  'missingArgument',
  argName => `Missing required argument <${chalk.yellow(`${argName}`)}>`
)

enhanceErrorMessages(
  'optionMissingArgument',
  (option, flag) =>
    `Missing required argument for option ${chalk.yellow(option.flags)}` +
    (flag ? `, got ${chalk.yellow(flag)}` : ``)
)

program.parse(process.argv)
