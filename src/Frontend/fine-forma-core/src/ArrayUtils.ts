export function arrayEquals<T>(a: readonly T[], b: readonly T[], comparer: (a: T, b: T) => boolean): boolean {
    if (a.length != b.length) {
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