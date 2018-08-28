const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const { templates } = require('../utils/getTemplates')

program
  .command('list')
  .description('show all remote templates')
  .action(_ => templates.forEach(log))

function log(text, i) {
  if (i == 0) {
    console.log()
  }

  console.log(`  ` + chalk.yellow(`${i + 1}. ${text}`))
}
