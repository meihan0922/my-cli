export const vueTemplateChoices = [
    {
        title: 'Vue TypeScript',
        value: 'vue-ts'
    },
    {
        title: 'Vue JavaScript',
        value: 'vue'
    }
]

export const reactTemplateChoices = [
    {
        title: 'React TypeScript',
        value: 'react-ts'
    },
    {
        title: 'React JavaScript',
        value: 'react'
    }
]

export const vanillaTemplateChoices = [
    {
        title: 'Vanilla TypeScript',
        value: 'vanilla-ts'
    },
    {
        title: 'Vanilla JavaScript',
        value: 'vanilla'
    }
]

export const templatesChoices = {
    react: reactTemplateChoices,
    vue: vueTemplateChoices,
    vanilla: vanillaTemplateChoices
}

export const frameworksChoices = {
    react: { title: 'React', value: 'react' },
    vue: { title: 'Vue', value: 'vue' },
    vanilla: { title: 'Vanilla', value: 'vanilla' }
}

export const frameworks = ['vue', 'react', 'vanilla'] as const
export const templates = ['react', 'react-ts', 'vue', 'vue-ts', 'vanilla', 'vanilla-ts'] as const
