# q-cli

> [English](./README_EN.md)

### 使用 **远程模板项目** 创建新的项目 脚手架

## 使用方法

进入本项目根目录，执行 `npm link`，即可全局安装本脚手架。

在命令行输入 `q-cli -h` 即可查看所有的命令说明。

## 添加模板

命令行键入 `q-cli config --all`，即可查看所有配置。请参照 `q-cli config templates` 的结构加入模板。

例如，假设 `q-cli` 的配置文件中暂无任何模板，同时我想添加 github 上的模板，过程如下：

```shell
q-cli config templates [] # config.tempaltes = []
q-cli config templates.0 {} # config.templates[0] = {}
q-cli config templates.0.rootURL justemit # config.templates[0].rootURL = "justemit"
q-cli config templates.0.templates [] # config.templates[0].templates = []
q-cli config templates.0.templates.0 vue-ssr-boilerplate # config.templates[0].templates[0] = "vue-ssr-boilerplate"
```

执行 `q-cli list`，命令行输出应为：

```shell
  1. justemit/vue-ssr-boilerplate
```

## 注意

如果使用私有 gitlab 的模板项目必须设置 `clone: true`，同时下载地址的形式应为：

```shell
git.yourdomain.com:group/projectname
```

例如：

```json
{
  "rootURL": "your-gitlab-domain.com:your-gitlab-group",
  "templates": ["repo"],
  "options": {
    "clone": true
  }
}
```
