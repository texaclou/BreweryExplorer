export const ToFirstUpperCase = (stringIn: string): string => {
    return `${stringIn.substring(0, 1).toLocaleUpperCase()}${stringIn.substring(1)}`
}