import type { Command } from 'commander'
import { program } from 'commander'

// 動態註冊命令
export const registerCommand = (fn: (command: Command) => Command) => {
    program.addCommand(fn(program))
}
