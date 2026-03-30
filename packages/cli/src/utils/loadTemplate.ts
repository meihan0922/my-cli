import fs from 'fs-extra'
import { downloadTemplate } from 'giget'
import { join } from 'node:path'
import ora from 'ora'

import type { Template } from '../types/template'

import { logger } from './logger'

export type LoadLocalTemplateOptions = {
    projectName: string
    template: Template
}

export type LoadRemoteTemplateOptions = {
    projectName: string
}

export type LoadTemplateOptions = {
    remote?: boolean
} & LoadLocalTemplateOptions &
    LoadRemoteTemplateOptions

const rewritePackageJson = async (projectName: string) => {
    const projectPath = join(process.cwd(), projectName)
    const originPkgJsonContent = await fs.readJson(`${projectPath}/package.json`)
    await fs.writeJson(
        `${projectPath}/package.json`,
        {
            ...originPkgJsonContent,
            name: projectName,
            version: '1.0.0'
        },
        { spaces: 4 }
    )
}

export const loadLocalTemplate = async (options: LoadLocalTemplateOptions) => {
    const { template, projectName } = options

    const spinner = ora({
        text: 'Creating project...',
        spinner: 'dots',
        color: 'green'
    })

    try {
        spinner.start()

        const templatePath = join(__dirname, `../../templates/template-${template}`)
        const projectPath = join(process.cwd(), projectName)

        // 複製模板到專案目錄，process.cwd()：當前工作目錄，不能用 __dirname 因為 __dirname 是文件的目錄，不是工作目錄
        await fs.copy(templatePath, projectPath)

        spinner.spinner = 'moon'
        spinner.text = '拷貝模板完成'

        await rewritePackageJson(projectName)

        spinner.succeed('Project created successfully')

        // 刪除臨時目錄
        await fs.remove(`${process.cwd()}/.temp`)
    } catch (error) {
        spinner.fail('Project created failed')
        logger.error(error)
    }
}

export const loadRemoteTemplate = async (options: LoadRemoteTemplateOptions) => {
    const { projectName } = options

    const spinner = ora({
        text: 'Creating project...',
        spinner: 'dots',
        color: 'green'
    })

    try {
        spinner.start()

        // 下載模板暫存到臨時目錄
        const { dir } = await downloadTemplate(
            'https://codeload.github.com/design-sparx/antd-multipurpose-dashboard/tar.gz/refs/heads/main',
            {
                dir: `${process.cwd()}/.temp`
            }
        )

        await fs.copy(dir, join(process.cwd(), projectName))

        spinner.spinner = 'moon'
        spinner.text = '拷貝模板完成'

        await rewritePackageJson(projectName)

        spinner.succeed('Project created successfully')

        // 刪除臨時目錄
        await fs.remove(`${process.cwd()}/.temp`)
    } catch (error) {
        spinner.fail('Project created failed')
        logger.error(error)
    }
}

export const loadTemplate = async (options: LoadTemplateOptions) => {
    const { remote } = options

    if (remote) {
        return loadRemoteTemplate(options)
    }

    return loadLocalTemplate(options)
}
