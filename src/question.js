const readline = require('readline')
const process = require('process')

const rl = readline.createInterface(process.stdin, process.stdout)

module.exports = function(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, answer => {
      rl.close()
      resolve(answer)
    })
  })
}
