const download = require('download-git-repo')

module.exports = function(repo, path) {
  return new Promise((resolve, reject) => {
    return download(repo, path, false, err => {
      if (err) {
        reject(err)
      }

      resolve()
    })
  })
}
