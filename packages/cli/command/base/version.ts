import type { Command } from 'commander'
import pc from 'picocolors'

import pkg from '../../package.json'

export const versionCommand = (command: Command) => {
    return command
        .createCommand('version')
        .description('Print the version number')
        .action(() => {
            console.log(pc.green(pkg.version))
        })
}
