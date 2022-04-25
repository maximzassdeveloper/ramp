export function classnames(...args: any[]): string {
  let classes: string[] = []

  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i]
    if (!arg) continue
    const argType = typeof arg

    if (argType === 'string' || argType === 'number') {
      classes.push(arg.toString().trim())
    } else if (Array.isArray(arg)) {
      classes = [...classes, ...arg]
    } else if  (argType === 'object') {
      Object.entries(arg).forEach(([key, val]) => {
        if (val) classes.push(key)
      })
    }

  }

  return classes.join(' ')
}