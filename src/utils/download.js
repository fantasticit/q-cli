const os = require('os')
const fs = require('fs-extra')
const path = require('path')
const download = require('download-git-repo')
const packageJSON = require('./packageJSON')

module.exports = async function fetchRemotePreset(name, template, clone) {
  const tmpdir = path.join(os.tmpdir(), packageJSON.name)

  // clone will fail if tmpdir already exists
  if (clone) {
    fs.removeSync(tmpdir)
  }

  await new Promise((resolve, reject) => {
    download(template, tmpdir, { clone }, err => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })

  // 从临时文件夹 copy 文件到 目标路径
  const targetPath = path.resolve(process.cwd(), `./${name}/`)
  return await fs.copy(tmpdir, targetPath)
}
