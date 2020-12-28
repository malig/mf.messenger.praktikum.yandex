function isPlainObject(value) {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}
function isArrayOrObject(value) {
    return isPlainObject(value) || Array.isArray(value);
}
function getKey(key, parentKey) {
    return parentKey ? `${parentKey}[${key}]` : key;
}
function getParams(data, parentKey) {
    return Object.entries(data).reduce((acc, [key, value]) => {
        if (isArrayOrObject(value)) {
            acc.push(...getParams(value, getKey(key, parentKey)));
        }
        else {
            acc.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
        }
        return acc;
    }, []);
}
export function queryString(data) {
    if (!isPlainObject(data)) {
        throw new Error('input must be an object');
    }
    return getParams(data).map(arr => arr.join('=')).join('&');
}
//# sourceMappingURL=queryString.js.map