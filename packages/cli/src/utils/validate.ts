import { frameworks, templates } from '../constants/templates'
import type { Framework, Template } from '../types/template'

export const validFrameworkInput = (input: string): boolean => {
    return frameworks.includes(input as Framework)
}

export const validTemplateInput = (input: string): boolean => {
    return templates.includes(input as Template)
}
