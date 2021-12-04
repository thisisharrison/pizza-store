function toArray(object: Record<string, any>) {
    return Object.keys(object).map((_) => object[_]);
}

function reduceByKey(object: Record<string, any>, key: string) {
    return Object.keys(object).reduce((acc, cur) => (acc += object[cur][key]), 0);
}

export const ObjectUtil = Object.freeze({
    toArray,
    reduceByKey,
});
