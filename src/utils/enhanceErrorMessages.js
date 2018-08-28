const program = require('commander')
const chalk = require('chalk')

module.exports = (method, log) => {
  program.Command.prototype[method] = function(...args) {
    if (method === 'unknownOption' && this._allowUnknownOption) {
      return
    }

    this.outputHelp()
    console.log(`  ` + chalk.red(log(...args)))
    console.log()
    process.exit(1)
  }
}
