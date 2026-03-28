import { program } from 'commander'

import '../command'

export const runCli = () => {
    program.parse(process.argv)
}
