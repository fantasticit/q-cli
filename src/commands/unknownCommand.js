const chalk = require('chalk')
const program = require('commander')

program.arguments('<command>').action(cmd => {
  program.outputHelp()
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}`))
  console.log()
})
