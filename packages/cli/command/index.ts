import { program } from 'commander'

import pkg from '../package.json'

import { versionCommand } from './base/version'
import { registerCommand } from './registerCommand'

program.version(pkg.version).description(pkg.description)

// 用插件的方式來註冊命令
registerCommand(versionCommand)
