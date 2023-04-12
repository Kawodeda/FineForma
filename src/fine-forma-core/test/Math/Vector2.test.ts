import { assert } from "chai";
import { expect } from "chai";
import { suite, test } from "mocha";

import { Vector2 } from "../../src/Math/Vector2";

suite('Vector2', () => {
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
                expect(a.add(b)).to.be.deep.equal(expected);
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
            { a: new Vector2(0.76, 99), b: new Vector2(11, -5.8) },
        ];

        testCases.forEach(({ a, b }) => {
            test(`add vectors (${a.x}, ${a.y}) and (${b.x}, ${b.y})`, () => {
                expect(a.add(b)).to.be.deep.equal(b.add(a));
            });
        });
    });
    });
});