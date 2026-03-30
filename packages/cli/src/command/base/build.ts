import { spawn } from 'child_process'
import type { Command } from 'commander'

import { hasPnpm } from '../../utils/env'

export const buildCommand = (command: Command) => {
    return command
        .createCommand('build')
        .description('Build the project')
        .action(async () => {
            const _hasPnpm = hasPnpm()
            const command = _hasPnpm ? 'pnpm' : 'npm'
            const args = _hasPnpm ? ['build'] : ['run', 'build']
            const child = spawn(command, args, { stdio: 'inherit' })
            child.on('close', code => {
                process.exit(code)
            })
        })
}
