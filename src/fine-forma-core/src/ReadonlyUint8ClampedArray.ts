
type MutableProperties = 'copyWithin' | 'fill' | 'reverse' | 'set' | 'sort';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/consistent-indexed-object-style
export interface ReadonlyUint8ClampedArray extends Omit<Uint8ClampedArray, MutableProperties> {

    readonly [index: number]: number;
}