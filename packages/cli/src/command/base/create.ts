import type { Command } from 'commander'
import pc from 'picocolors'
import prompts from 'prompts'

import { frameworksChoices, templatesChoices } from '../../constants/templates'
import type { Framework, Template } from '../../types/template'
import { loadTemplate } from '../../utils/loadTemplate'
import { logger } from '../../utils/logger'
import { validFrameworkInput, validTemplateInput } from '../../utils/validate'

interface CreateOptions {
    framework: Framework
    template: Template
    remote?: boolean
}

export const createCommand = (command: Command) => {
    return command
        .createCommand('create')
        .arguments('<projectName>')
        .option('-f, --framework <framework>', 'please select framework')
        .option('-t, --template <template>', 'please select template')
        .option('-r, --remote', 'Is remote template?')
        .description('按照模板創建新專案')
        .helpOption('-h, --help', 'display help for command')
        .action(async (projectName: string, options: CreateOptions) => {
            let { framework, template } = options

            // 如果沒有選擇框架，則提示選擇框架
            if (!framework || !validFrameworkInput(framework)) {
                const response = await prompts({
                    type: 'select',
                    name: 'framework',
                    message: '請選擇框架',
                    choices: Object.values(frameworksChoices)
                })

                framework = response.framework
            }

            if (!template || !validTemplateInput(template)) {
                const response = await prompts({
                    type: 'select',
                    name: 'template',
                    message: '請選擇技術棧',
                    choices: templatesChoices[framework as keyof typeof templatesChoices]
                })

                template = response.template
            }

            // logger.log(pc.bgGreen('Project name: ' + projectName))
            // logger.log(pc.bgGreen('Framework: ' + framework))
            // logger.log(pc.bgGreen('Template: ' + template))
            // logger.log(pc.bgGreen('Creating a new project...'))
            if (!template || !framework) {
                logger.error('Invalid framework or template')
                process.exit(1)
            }

            logger.info(pc.bgGreen(`Create project: ${projectName} with ${framework} and ${template}`))

            await loadTemplate({
                projectName,
                template,
                remote: options?.remote ?? false
            })
        })
}
