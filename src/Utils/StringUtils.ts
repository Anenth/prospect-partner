export function replaceVariablesWithValues(string: string, values: Record<string, string>): string {
  return string.replace(/{{(.*?)}}/g, (_, key) => values[key] || '')
}
