import { arrayEquals } from './ArrayUtils';

export class ReadonlyCollection<T> {
    
    private readonly _elements: readonly T[];

    constructor(elements: readonly T[]) {
        this._elements = [...elements];
    }

    get elements(): readonly T[] {
        return this._elements;
    }

    get length(): number {
        return this.elements.length;
    }

    *[Symbol.iterator](): Generator<T, void> {
        for (const element of this.elements) {
            yield element;
        }
    }

    get(index: number): T {
        const result = this.elements[index];
        if (result == null) {
            throw new Error('Element at specified index does not exist');
        }

        return result;
    }

    add(element: T): ReadonlyCollection<T> {
        return new ReadonlyCollection<T>([...this.elements, element]);
    }

    addRange(elements: readonly T[]): ReadonlyCollection<T> {
        return new ReadonlyCollection<T>(this.elements.concat(elements));
    }

    remove(element: T): ReadonlyCollection<T> {
        if (!this.elements.includes(element)) {
            throw new Error('Specified element is missing in collection');
        }

        return new ReadonlyCollection<T>(this.elements.filter(item => item !== element));
    }

    removeRange(elements: readonly T[]): ReadonlyCollection<T> {
        if (elements.some(element => !this.elements.includes(element))) {
            throw new Error('At least one of specified element is missing in collection');
        }

        return new ReadonlyCollection<T>(this.elements.filter(item => !elements.includes(item)));
    }

    update(existing: T, updated: T): ReadonlyCollection<T> {
        if (!this.elements.includes(existing)) {
            throw new Error('Specified element is missing in collection');
        }

        const index = this.elements.findIndex(item => item === existing);

        return new ReadonlyCollection<T>([
            ...this.elements.slice(0, index), 
            updated, 
            ...this.elements.slice(index + 1)
        ]);
    }

    equals(other: ReadonlyCollection<T>, comparer: (a: T, b: T) => boolean): boolean {
        return arrayEquals<T>(this.elements, other.elements, comparer);
    }

    includes(searchElement: T): boolean {
        return this.elements.includes(searchElement);
    }

    find(predicate: (value: T) => boolean): T | undefined {
        return this.elements.find(predicate);
    }

    sort(compareFn?: (a: T, b: T) => number): ReadonlyCollection<T> {
        return new ReadonlyCollection([...this.elements].sort(compareFn));
    }

    indexOf(element: T): number {
        const index = this.elements.indexOf(element);
        if (index === -1) {
            throw new Error('Specified element is missing in collection');
        }

        return index;
    }
}