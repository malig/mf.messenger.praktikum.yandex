function isPlainObject(value) {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}
function isArray(value) {
    return Array.isArray(value);
}
function isArrayOrObject(value) {
    return isPlainObject(value) || isArray(value);
}
function getKey(key, parentKey) {
    return parentKey ? `${parentKey}[${key}]` : key;
}
function getParams(data, parentKey) {
    const result = [];
    for (const [key, value] of Object.entries(data)) {
        if (isArrayOrObject(value)) {
            result.push(...getParams(value, getKey(key, parentKey)));
        }
        else {
            result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
        }
    }
    return result;
}
export function queryString(data) {
    if (!isPlainObject(data)) {
        throw new Error('input must be an object');
    }
    return getParams(data).map(arr => arr.join('=')).join('&');
}
//# sourceMappingURL=queryString.js.map