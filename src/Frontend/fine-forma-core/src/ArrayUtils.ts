export function first<T>(array: readonly T[]): T {
    if (array.length === 0) {
        throw new Error('Given array was empty');
    }

    const result = array[0];
    if (result === undefined) {
        throw new Error();
    }

    return result;
}

export function last<T>(array: readonly T[]): T {
    if (array.length === 0) {
        throw new Error('Given array was empty');
    }

    const result = array[array.length - 1];
    if (result === undefined) {
        throw new Error();
    }

    return result;
}

export function add<T>(array: readonly T[], element: T): T[] {
    return [...array, element]
}

export function arrayEquals<T>(a: readonly T[], b: readonly T[], comparer: (a: T, b: T) => boolean): boolean {
    if (a.length !== b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i++) {
        if (!compare<T>(comparer, a[i], b[i])) {
            return false;
        }
    }

    return true;
}

function compare<T>(comparer: (a: T, b: T) => boolean, a?: T, b?: T): boolean {
    return a === b || (a != null && b != null && comparer(a, b));
}