export function deepCopy<T extends Array<any> | Record<string, any>>(obj: T) {
    const copy = Object.assign({}, obj) as T;

    for (const key in copy) {
        copy[key as any] = typeof obj[key] === 'object' ? deepCopy(obj[key as any]) : obj[key];
    }

    if (Array.isArray(obj)) {
        copy.length = obj.length;
        return Array.from(copy as any) as T;
    }

    return copy as T;
}

export function isEmptyObject(obj: Record<string, any>) {
    if (!obj || typeof obj !== 'object') { return false; }
    return !Object.keys(obj).length;
}

export function removeEmptyProperties<T extends Record<string, any>>(obj: T, onlyNullishValues = false): T {
    return _removeEmptyProperties(obj, onlyNullishValues);
}

function _removeEmptyProperties<T extends Record<string, any>>(
    obj: T,
    onlyNullishValues = false,
    recursion = false
): T {
    const data = recursion ? obj : deepCopy<T>(obj);

    for (const key in data) {
        const isPropertyObject = data[key] !== null && typeof data[key] === 'object';
        if (isPropertyObject) {
            _removeEmptyProperties(data[key], onlyNullishValues, true);
        }

        let shouldDelete = !data[key] || isEmptyObject(data[key]);

        if (onlyNullishValues) {
            shouldDelete = data[key] === null || data[key] === undefined;
        }

        if (shouldDelete) {
            delete data[key];
        }
    }

    return data || {} as T;
}