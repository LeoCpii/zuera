export function decode<T>(token: string) {
    try {
        return JSON.parse(window.atob(token.split('.')[1])) as T;
    } catch {
        throw new Error('Invalid token');
    }
}