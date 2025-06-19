export function shuffle<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export const flatten = <T>(array: Array<T | T[]>): T[] =>
    array.reduce<T[]>((acc, val) => acc.concat(val), []);

export const uniq = <T>(array: Array<T>) => [...new Set(array)];

export function removeDuplicate(a: any[]) {
    const objs = [];
    const prims = { 'boolean': {}, 'number': {}, 'string': {} };

    return a.filter((item) => {
        const type = typeof item;
        if (type in prims)
            return Object.prototype.hasOwnProperty.call(prims[type], item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item as never) >= 0 ? false : objs.push(item as never);
    });
}

export function chooseNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandom<T>(arr: T[]): T {
    const shuffled = shuffle(arr);
    const chosen = chooseNumber(0, shuffled.length - 1);

    return shuffled[chosen];
}

export function getFilledArray(length: number) {
    return Array.from(Array(length), (_, index) => index);
}

export function orderByIndex<T>(arr: Array<T>, prop: keyof T, order: string[]) {
    return arr.sort((a, b) => order.indexOf(a[prop as any]) - order.indexOf(b[prop as any]));
}

export function groupBy<T>(arr: Array<T>, props: Array<keyof T>) {
    const blockList: string[] = [];

    return arr.reduce<T[]>((acc, item) => {
        const refs = props
            .filter(Boolean)
            .map(prop => item[prop]);
        const key = refs.join('-');
        const has = blockList.some(i => i === key);

        if (!has) {
            blockList.push(key);
            acc.push(item);
        }

        return acc;
    }, []);
}