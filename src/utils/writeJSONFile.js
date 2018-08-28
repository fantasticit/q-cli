const fs = require('fs-extra')

module.exports = function(jsonFilePath, content) {
  try {
    fs.writeJsonSync(jsonFilePath, content, {
      spaces: 2
    })
  } catch (err) {}
}
