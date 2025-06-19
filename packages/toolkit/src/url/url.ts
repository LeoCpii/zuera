const isBrowser = () => typeof (window) !== 'undefined';

export function getParams<T>(): T {
    if (!isBrowser()) { return {} as T; }

    return window.location.search
        .replace('?', '')
        .split('&')
        .reduce<T>((acc, value: string) => {
            const [l, v] = value.split('=') as [keyof T, any];
            acc[l] = v;
            return acc;
        }, {} as T);
}

export function getPage<T>(): T {
    return window.location.pathname
        .split('/')
        .reverse()
        .filter(Boolean)[0] as T;
}

export function getPath<T>(): T {
    return window.location.pathname
        .split('/')
        .filter(Boolean)[0] as T;
}

export function getDomain() {
    const hostname = window.location.hostname;

    if (hostname === 'localhost') { return hostname; }

    const match = hostname.match(/^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/);

    return match ? ['.', match[1]].join('') : hostname;
}

export function serialize(data: Record<string, any>) {
    return new URLSearchParams(data).toString();
}