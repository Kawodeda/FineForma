import { suite, test } from 'mocha';
import { expect } from 'chai';

import { Matrix } from '../../src/Math/Matrix';

suite('Matrix', () => {
    suite('create Matrix from non-real numbers results in error', () => {
        const testCases = [
            () => new Matrix(Infinity, 0, 0, 1, 0, 0),
            () => new Matrix(-Infinity, 0, 0, 1, 0, 0),
            () => new Matrix(1, Infinity, 0, 1, 0, 0),
            () => new Matrix(1, 0, Infinity, 1, 0, 0),
            () => new Matrix(1, 0, 0, Infinity, 0, 0),
            () => new Matrix(1, 0, 0, 1, Infinity, 0),
            () => new Matrix(1, 0, 0, 1, 0, Infinity),
            () => new Matrix(Infinity, -Infinity, Infinity, Infinity, -Infinity, Infinity),
            () => new Matrix(NaN, 0, 0, 1, 0, 0),
            () => new Matrix(1, NaN, 0, 1, 0, 0),
            () => new Matrix(1, 0, NaN, 1, 0, 0),
            () => new Matrix(1, 0, 0, NaN, 0, 0),
            () => new Matrix(1, 0, 0, 1, NaN, 0),
            () => new Matrix(1, 0, 0, 1, 0, NaN),
            () => new Matrix(NaN, NaN, NaN, NaN, NaN, NaN),
            () => new Matrix(-NaN, 0, 0, 1, 0, 0)
        ];

        testCases.forEach((createMatrix, index) => {
            test(`non-real numbers #${index + 1}`, () => {
                expect(createMatrix).to.throw(Error);
            })
        });
    });

    suite('append returns product of matrices', () => {
        const testCases = [
            { 
                a: new Matrix(0, 0, 0, 0, 0, 0), 
                b: new Matrix(0, 0, 0, 0, 0, 0), 
                expected: new Matrix(0, 0, 0, 0, 0, 0) 
            },
            { 
                a: new Matrix(1, 0, 0, 1, 0, 0), 
                b: new Matrix(0, 0, 0, 0, 0, 0), 
                expected: new Matrix(0, 0, 0, 0, 0, 0) 
            },
            { 
                a: new Matrix(1, 0, 0, 1, 0, 0), 
                b: new Matrix(4.2, -1, 1, 2.4, 20, 32.11), 
                expected: new Matrix(4.2, -1, 1, 2.4, 20, 32.11) 
            },
            { 
                a: new Matrix(4.2, -1, 1, 2.4, 20, 32.11),
                b: new Matrix(1, 0, 0, 1, 0, 0),
                expected: new Matrix(4.2, -1, 1, 2.4, 20, 32.11) 
            },
            { 
                a: new Matrix(2, 0, 0, 2, 0, 0),
                b: new Matrix(1, 0, 0, 1, 40, 20.2),
                expected: new Matrix(2, 0, 0, 2, 80, 40.4) 
            },
            { 
                a: new Matrix(1, 0, 0, 1, 40, 20.2),
                b: new Matrix(2, 0, 0, 2, 0, 0),
                expected: new Matrix(2, 0, 0, 2, 40, 20.2) 
            },
            { 
                a: new Matrix(0, -1, 1, 0, 0, 0),
                b: new Matrix(2.4, 0, 0, 2.4, 0, 0),
                expected: new Matrix(0, -2.4, 2.4, 0, 0, 0) 
            },
            { 
                a: new Matrix(2.4, 0, 0, 2.4, 0, 0),
                b: new Matrix(0, -1, 1, 0, 0, 0),
                expected: new Matrix(0, -2.4, 2.4, 0, 0, 0) 
            },
            { 
                a: new Matrix(0.866, -0.5, 0.5, 0.866, 0, 0),
                b: new Matrix(1, 0, 0, 1, -48, 112),
                expected: new Matrix(0.866, -0.5, 0.5, 0.866, -97.568, 72.992)
            },
            { 
                a: new Matrix(1, 0, 0, 1, -48, 112),
                b: new Matrix(0.866, -0.5, 0.5, 0.866, 0, 0),
                expected: new Matrix(0.866, -0.5, 0.5, 0.866, -48, 112)
            },
            { 
                a: new Matrix(2.5, 0, 0, 2.5, 0, 0),
                b: new Matrix(0.866, -0.5, 0.5, 0.866, 0, 0),
                expected: new Matrix(2.165, -1.25, 1.25, 2.165, 0, 0)
            },
            { 
                a: new Matrix(0.866, -0.5, 0.5, 0.866, 0, 0),
                b: new Matrix(2.5, 0, 0, 2.5, 0, 0),
                expected: new Matrix(2.165, -1.25, 1.25, 2.165, 0, 0)
            },
            { 
                a: new Matrix(2.5, 0, 0, 2.5, -148, 12),
                b: new Matrix(0.866, -0.5, 0.5, 0.866, 0, 0),
                expected: new Matrix(2.165, -1.25, 1.25, 2.165, -148, 12)
            },
            { 
                a: new Matrix(0.866, -0.5, 0.5, 0.866, 0, 0),
                b: new Matrix(2.5, 0, 0, 2.5, -148, 12),
                expected: new Matrix(2.165, -1.25, 1.25, 2.165, -134.168, -63.608)
            }
        ];

        testCases.forEach(({ a, b, expected }, index) => {
            test(`append #${index + 1}`, () => {
                void expect(a.append(b).equals(expected)).to.be.true;
            });
        });
    });

    suite('prepend result is reversed append', () => {
        const testCases = [
            { 
                a: new Matrix(1, 0, 0, 1, 0, 0), 
                b: new Matrix(4.2, -1, 1, 2.4, 20, 32.11) 
            },
            { 
                a: new Matrix(2, 0, 0, 2, 0, 0),
                b: new Matrix(1, 0, 0, 1, 40, 20.2)
            },
            { 
                a: new Matrix(0, -1, 1, 0, 0, 0),
                b: new Matrix(2.4, 0, 0, 2.4, 0, 0)
            },
            { 
                a: new Matrix(0.866, -0.5, 0.5, 0.866, 0, 0),
                b: new Matrix(1, 0, 0, 1, -48, 112)
            },
            { 
                a: new Matrix(2.5, 0, 0, 2.5, 0, 0),
                b: new Matrix(0.866, -0.5, 0.5, 0.866, 0, 0)
            },
            { 
                a: new Matrix(2.5, 0, 0, 2.5, -148, 12),
                b: new Matrix(0.866, -0.5, 0.5, 0.866, 0, 0)
            }
        ];

        testCases.forEach(({ a, b }, index) => {
            test(`prepend #${index + 1}`, () => {
                void expect(a.prepend(b).equals(b.append(a))).to.be.true;
            });
        });
    });

    suite('inverse matrix appended to original results in identity', () => {
        const testCases = [
            new Matrix(1, 0, 0, 1, 0, 0),
            new Matrix(4.2, -1, 1, 2.4, 20, 32.11),
            new Matrix(2, 0, 0, 2, 0, 0),
            new Matrix(1, 0, 0, 1, 40, 20.2),
            new Matrix(2, 0, 0, 2, 0, 0),
            new Matrix(2.4, 0, 0, 2.4, 0, 0),
            new Matrix(0.866, -0.5, 0.5, 0.866, 0, 0),
            new Matrix(1, 0, 0, 1, -48, 112),
            new Matrix(2.5, 0, 0, 2.5, 0, 0),
            new Matrix(2.5, 0, 0, 2.5, -148, 12)
        ];

        testCases.forEach((matrix, index) => {
            test(`inverse #${index + 1}`, () => {
                void expect(matrix.inverse().append(matrix).equals(Matrix.identity)).to.be.true;
            })
        });
    });
});