type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return (
        typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]'
    );
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || Array.isArray(value);
}

function getKey(key: string, parentKey?: string) {
    return parentKey ? `${parentKey}[${key}]` : key;
}

function getParameters(data: PlainObject | [], parentKey?: string) {
    return Object.entries(data).reduce<[string, string][]>((accumulator, [key, value]) => {
        if (isArrayOrObject(value)) {
            accumulator.push(...getParameters(value, getKey(key, parentKey)));
        } else {
            accumulator.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
        }

        return accumulator;
    }, []);
}

export function queryString(data: unknown) {
    if (!isPlainObject(data)) {
        throw new Error('input must be an object');
    }

    return getParameters(data)
        .map((array) => array.join('='))
        .join('&');
}
