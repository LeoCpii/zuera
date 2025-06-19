export function wait<T>(callback: () => T, ms: number) {
    return new Promise<T>(resolve => {
        setTimeout(() => { resolve(callback()); }, ms);
    });
}