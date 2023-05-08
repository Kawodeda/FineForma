export class ReadonlyCollection<T> {
    
    private readonly _elements: readonly T[];

    constructor(elements: readonly T[]) {
        this._elements = [...elements];
    }

    get elements(): readonly T[] {
        return this._elements;
    }

    add(element: T): ReadonlyCollection<T> {
        return new ReadonlyCollection<T>([...this.elements, element]);
    }

    remove(element: T): ReadonlyCollection<T> {
        if (!this.elements.includes(element)) {
            throw new Error('Specified element is missing in collection');
        }

        return new ReadonlyCollection<T>([...this.elements.filter(item => item !== element)]);
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

    includes(searchElement: T): boolean {
        return this.elements.includes(searchElement);
    }

    find(predicate: (value: T) => boolean): T | undefined {
        return this.elements.find(predicate);
    }
}