import { assert } from "chai";
import { suite, test } from "mocha";
import { Vector2 } from "../../src/Math/Vector2";

suite('Vector2', () => {
    suite('add', () => {
        const testCases = [
            { a: new Vector2(2, 2), b: new Vector2(1, 1), result: new Vector2(3, 3) },
            { a: new Vector2(3, 3), b: new Vector2(2, 4), result: new Vector2(5, 7) },
            { a: new Vector2(-1, 2.5), b: new Vector2(0, 0), result: new Vector2(-1, 2.5) },
            { a: new Vector2(-9, 4.67), b: new Vector2(3.2, -4), result: new Vector2(-5.8, 0.67) },
            { a: new Vector2(-100390, -3956703.56701), b: new Vector2(100390, 3956703.56701), result: new Vector2(0, 0) },
            { a: new Vector2(0.76, 99), b: new Vector2(11, -5.8), result: new Vector2(11.76, 93.2) }
        ];

        testCases.forEach(({ a, b, result }) => {
            test(`add (${a.x}, ${a.y}) to (${b.x}, ${b.y})`, () => {
                assert.deepEqual(a.add(b), result);
            });
        });
    });

    test('scale', () => {
        assert.fail();
    });
});