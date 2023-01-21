const functionalComposeLeftToRight = <T>(
    ...fns: ((v: T) => T)[]
) => (x: T) => fns.reduce((y, fn) => fn(y), x)

export default functionalComposeLeftToRight
