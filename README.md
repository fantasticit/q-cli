# hy-cli

> A simple CLI for scaffolding project via other template project.

## Install

As this CLI project is private,we can use `npm link` to install this CLI.

  ```shell
  git clone git@github.com:hyiron/hy-cli.git
  cd hy-cli
  npm link
  ```

Now,`hy-cli` is installed as a global command.

## Usage

`$ hy-cli init <project-name>`

Example:

`$ hy-cli init my-project`

## Templates

Current available templates include:

- [create-react-app](https://github.com/hyiron/create-react-app) - A simple Webpack + React + TypeScript setup with hot-reload, hot-update

- [create-electron-app](https://github.com/hyiron/create-electron-app) - A simple Webpack + Electron + TypeScript setup with hot-reload,hot-update
