const chalk = require('chalk')
const inquirer = require('inquirer')
const ora = require('ora')
const path = require('path')
const process = require('process')
const program = require('commander')

const { author, repos } = require('./constant')
const download = require('./download')
const mkdir = require('./mkdir')
const question = require('./question')

let projectName = '' // 新建项目名称

program
  .command('init')
  .description('Install github project to local')
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

      // 根据 项目名 创建新文件夹
      let dir = path.resolve(process.cwd(), `./${projectName}/`)

      await mkdir(dir)

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
      let Spinner = ora('Downloading project...')
      Spinner.start()
      await download(`${author}/${repo}`, dir)

      // github 模板 下载完成
      Spinner.stop()
      console.log(
        chalk.blue(`Download successfully.Now you can code with the project.`)
      )
    } catch (err) {
      console.log(chalk.red(err))
    }
  })

program.parse(process.argv)
