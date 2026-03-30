import type { Command } from 'commander'
import pc from 'picocolors'

import pkg from '../../../package.json'
import { logger } from '../../utils/logger'

export const versionCommand = (command: Command) => {
    return command
        .createCommand('version')
        .description('Print the version number')
        .action(() => {
            logger.log(pc.bgBlue(pkg.version))
        })
}
