const chalk = require('chalk')
const inquirer = require('inquirer')
const ora = require('ora')
const path = require('path')
const process = require('process')
const program = require('commander')
const rm = require('rimraf')

const log = console.log

const { author, cliName, repository, repos, version } = require('./constant')
const download = require('./download')
const mkdir = require('./mkdir')
const question = require('./question')

let projectName = '' // 新建项目名称
let hasMkdir = false // 是否已经新建文件夹

// 版本
program.version(version)

// 初始化
program
  .command('init')
  .description('generated new project via other template')
  .action(async opts => {
    try {
      if (typeof opts !== 'string') {
        projectName = await question("Please enter the new project's name: ")
      } else {
        projectName = opts
      }

      if (!projectName) {
        return
      }

      // inquiere 列表提问
      let questions = [
        {
          type: 'list',
          name: 'repo',
          message: 'Which repo do you want to install?',
          choices: repos
        }
      ]
      const { repo } = await inquirer.prompt(questions)

      // github 模板 下载开始
      let Spinner = ora('downloading template')
      Spinner.start()

      // 根据 项目名 创建新文件夹
      let dir = path.resolve(process.cwd(), `./${projectName}/`)

      await mkdir(dir)
      hasMkdir = true
      await download(`${author}/${repo}`, dir)

      // github 模板 下载完成
      Spinner.stop()
      log(`\n    ${cliName} · Generated "${projectName}".\n`)
      log('# ' + chalk.green(`Project initialization finished!`))
      log('# ================================\n')
      log('To get started: \n')
      log(chalk.yellow(`  cd ${projectName}`))
      log(chalk.yellow(`  npm install (or if using yarn: yarn)`))
      log(chalk.yellow(`  npm run dev\n`))
      log(`${cliName}'s source code is in ${repository}\n\n`)
    } catch (err) {
      if (hasMkdir && projectName) {
        // 删除新建的文件夹
        rm(path.resolve(process.cwd(), `./${projectName}/`), err => {
          if (err) {
            throw new Error(err)
          }

          hasMkdir = false
          projectName = ''
        })
      }
    }
  })

// 监听错误
process.on('unhandledRejection', reason => log(chalk.red(reason)))

program.parse(process.argv)
