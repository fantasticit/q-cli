const fs = require('fs-extra')
const program = require('commander')
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const symbols = require('log-symbols')
const download = require('../utils/download')
const { author, name: cliName } = require('../utils/packageJSON')
const { templates, templatesObj } = require('../utils/getTemplates')

async function selectTemplate() {
  let questions = [
    {
      type: 'list',
      name: 'template',
      message: 'Please select a remote template to generate',
      choices: templates
    }
  ]
  const { template } = await inquirer.prompt(questions)
  return template
}

program
  .command('init <name>')
  .description('generate a project from a remote template')
  .option('-c --clone', 'Use git clone when fetching remote template')
  .action(async (name, command) => {
    const template = await selectTemplate()
    const clone = templatesObj[template].clone || Boolean(command.clone)

    const spinner = ora('Start downloading...')
    spinner.start()

    try {
      await download(name, template, clone)
      spinner.stop()

      console.log()
      console.log(
        ` `,
        symbols.success,
        `${cliName} · Generated ${chalk.yellow(name)} successfully.\n`
      )
      console.log('  # ' + chalk.green(`Project initialization finished!`))
      console.log('  # ================================\n')
      console.log('  To get started: \n')
      console.log(`  ` + chalk.yellow(`  cd ${name}`))
      console.log(`  ` + chalk.yellow(`  npm install (or if using yarn: yarn)`))
      console.log(`  ` + chalk.yellow(`  npm run dev\n`))
    } catch (err) {
      spinner.fail(`${cliName} · Generated ${chalk.red(name)} failed.\n`)
      console.log(symbols.error, chalk.red(err.message || err))
    }
  })
