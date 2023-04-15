import { expect } from 'chai';
import { suite, test } from 'mocha';

import { Vector2 } from '../../src/Math/Vector2';

suite('Vector2', () => {
    suite('create Vector2 from non-real numbers result in error', () => {
        const testCases = [
            () => new Vector2(Infinity, 0),
            () => new Vector2(0, Infinity),
            () => new Vector2(-Infinity, Infinity),
            () => new Vector2(NaN, 0),
            () => new Vector2(0, NaN),
            () => new Vector2(NaN, NaN)
        ];

        testCases.forEach((createVector, index) => {
            test(`non-real numbers #${index + 1}`, () => {
                expect(createVector).to.throw(Error);
            });
        });
    });

    suite('add returns the sum of vectors', () => {
        const testCases = [
            { a: new Vector2(2, 2), b: new Vector2(1, 1), expected: new Vector2(3, 3) },
            { a: new Vector2(3, 3), b: new Vector2(2, 4), expected: new Vector2(5, 7) },
            { a: new Vector2(-1, 2.5), b: new Vector2(0, 0), expected: new Vector2(-1, 2.5) },
            { a: new Vector2(-9, 4.67), b: new Vector2(3.2, -4), expected: new Vector2(-5.8, 0.67) },
            { a: new Vector2(-100390, -3956703.56701), b: new Vector2(100390, 3956703.56701), expected: new Vector2(0, 0) },
            { a: new Vector2(0.76, 99), b: new Vector2(11, -5.8), expected: new Vector2(11.76, 93.2) }
        ];

        testCases.forEach(({ a, b, expected }) => {
            test(`add (${a.x}, ${a.y}) to (${b.x}, ${b.y})`, () => {
                void expect(a.add(b).equals(expected)).to.be.true;
            });
        });
    });

    suite('add operation is commutative', () => {
        const testCases = [
            { a: new Vector2(2, 2), b: new Vector2(1, 1) },
            { a: new Vector2(3, 3), b: new Vector2(2, 4) },
            { a: new Vector2(-1, 2.5), b: new Vector2(0, 0) },
            { a: new Vector2(-9, 4.67), b: new Vector2(3.2, -4) },
            { a: new Vector2(-100390, -3956703.56701), b: new Vector2(100390, 3956703.56701) },
            { a: new Vector2(0.76, 99), b: new Vector2(11, -5.8) }
        ];

        testCases.forEach(({ a, b }) => {
            test(`add vectors (${a.x}, ${a.y}) and (${b.x}, ${b.y})`, () => {
                void expect(a.add(b).equals(b.add(a))).to.be.true;
            });
        });
    });

    suite('scale returns scaled vector', () => {
        const testCases = [
            { vector: new Vector2(0, 0), scalar: 0, expected: new Vector2(0, 0) },
            { vector: new Vector2(1.5, -4), scalar: 0, expected: new Vector2(0, 0) },
            { vector: new Vector2(0, 0), scalar: 12, expected: new Vector2(0, 0) },
            { vector: new Vector2(80, 14.2), scalar: 1, expected: new Vector2(80, 14.2) },
            { vector: new Vector2(-910.05, 11), scalar: 1, expected: new Vector2(-910.05, 11) },
            { vector: new Vector2(-910.05, 11), scalar: 2, expected: new Vector2(-1820.1, 22) },
            { vector: new Vector2(80, 14.2), scalar: 10, expected: new Vector2(800, 142) },
            { vector: new Vector2(80, 14.2), scalar: 2.5, expected: new Vector2(200, 35.5) },
            { vector: new Vector2(80, 14.2), scalar: -1, expected: new Vector2(-80, -14.2) },
            { vector: new Vector2(80, -14.2), scalar: -3, expected: new Vector2(-240, 42.6) }
        ];

        testCases.forEach(({ vector, scalar, expected }) => {
            test(`scale (${vector.x}, ${vector.y}) by ${scalar}`, () => {
                void expect(vector.scale(scalar).equals(expected)).to.be.true;
            });
        });
    });
});