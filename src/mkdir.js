const fs = require('fs')

module.exports = function(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, err => {
      if (err) {
        reject(err)
      }

      resolve()
    })
  })
}
