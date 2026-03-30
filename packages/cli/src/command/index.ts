import { program } from 'commander'

import pkg from '../../package.json'

import { buildCommand } from './base/build'
import { createCommand } from './base/create'
import { versionCommand } from './base/version'
import { registerCommand } from './registerCommand'

program.version(pkg.version).description(pkg.description)

// 用插件的方式來註冊命令
registerCommand(versionCommand)

// 註冊 create 命令，create 命令用於創建新專案
registerCommand(createCommand)

// 註冊 build 命令，build 命令用於構建項目
registerCommand(buildCommand)
