import { execSync } from 'node:child_process'

export const getPnpmVersion = (): string => {
    return execSync('pnpm --version', { encoding: 'utf8' }).trim()
}

export const hasPnpm = (): boolean => {
    return getPnpmVersion() !== null
}
