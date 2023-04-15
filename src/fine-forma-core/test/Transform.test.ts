import { suite, test } from 'mocha';
import { expect } from 'chai';

import { Transform } from '../src/Transform';
import { Vector2, Matrix } from '../src/Math';

suite('Transform', () => {
    const epsilon = 0.01;
    const assertVectors = (a: Vector2, b: Vector2): void => {
        expect(a.x).to.be.closeTo(b.x, epsilon);
        expect(a.y).to.be.closeTo(b.y, epsilon);
    };

    suite('apply translate to vector', () => {
        const testCases = [
            { 
                transform: () => Transform.createIdentity().translate(new Vector2(10, -10)), 
                vector: new Vector2(0, 0), 
                expected: new Vector2(10, -10) 
            },
            { 
                transform: () => Transform.createIdentity().translate(new Vector2(4.2, 40)), 
                vector: new Vector2(0, 0), 
                expected: new Vector2(4.2, 40) 
            },
            { 
                transform: () => Transform.createIdentity().translate(new Vector2(10, -10)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-100, 4)
            },
            { 
                transform: () => Transform.createIdentity().translate(new Vector2(0, 0)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-110, 14)
            },
            { 
                transform: () => Transform.createIdentity(), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-110, 14)
            },
            { 
                transform: () => Transform.createIdentity().translate(new Vector2(-200, -200.04)), 
                vector: new Vector2(80.03, 99), 
                expected: new Vector2(-119.97, -101.04)
            },
            { 
                transform: () => new Transform(new Matrix(1, 0, 0, 1, 10, -10)), 
                vector: new Vector2(0, 0), 
                expected: new Vector2(10, -10) 
            },
            { 
                transform: () => new Transform(new Matrix(1, 0, 0, 1, 4.2, 40)), 
                vector: new Vector2(0, 0), 
                expected: new Vector2(4.2, 40) 
            },
            { 
                transform: () => new Transform(new Matrix(1, 0, 0, 1, 10, -10)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-100, 4)
            },
            { 
                transform: () => new Transform(new Matrix(1, 0, 0, 1, 0, 0)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-110, 14)
            },
            { 
                transform: () => new Transform(new Matrix(1, 0, 0, 1, -200, -200.04)), 
                vector: new Vector2(80.03, 99), 
                expected: new Vector2(-119.97, -101.04)
            }
        ];

        testCases.forEach(({ transform, vector, expected }, index) => {
            test(`translate #${index + 1}`, () => {
                assertVectors(transform().applyTo(vector), expected);
            });
        });
    });

    suite('apply scale to vector', () => {
        const testCases = [
            { 
                transform: () => Transform.createIdentity().scale(new Vector2(1, 1)), 
                vector: new Vector2(0, 0), 
                expected: new Vector2(0, 0) 
            },
            { 
                transform: () => Transform.createIdentity().scale(new Vector2(1, 1)), 
                vector: new Vector2(4.2, 40), 
                expected: new Vector2(4.2, 40) 
            },
            { 
                transform: () => Transform.createIdentity().scale(new Vector2(2, -2)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-220, -28)
            },
            { 
                transform: () => Transform.createIdentity().scale(new Vector2(0, 0)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(0, 0)
            },
            { 
                transform: () => Transform.createIdentity().scale(new Vector2(2.5, 2.4)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-275, 33.6)
            },
            { 
                transform: () => Transform.createIdentity().scale(new Vector2(-200, -200.04)), 
                vector: new Vector2(-80.03, 99), 
                expected: new Vector2(16006, -19803.96)
            },
            { 
                transform: () => new Transform(new Matrix(1, 0, 0, 1, 0, 0)), 
                vector: new Vector2(0, 0), 
                expected: new Vector2(0, 0) 
            },
            { 
                transform: () => new Transform(new Matrix(1, 0, 0, 1, 0, 0)), 
                vector: new Vector2(4.2, 40), 
                expected: new Vector2(4.2, 40) 
            },
            { 
                transform: () => new Transform(new Matrix(2, 0, 0, -2, 0, 0)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-220, -28)
            },
            { 
                transform: () => new Transform(new Matrix(0, 0, 0, 0, 0, 0)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(0, 0)
            },
            { 
                transform: () => new Transform(new Matrix(2.5, 0, 0, 2.4, 0, 0)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-275, 33.6)
            },
            { 
                transform: () => new Transform(new Matrix(-200, 0, 0, -200.04, 0, 0)), 
                vector: new Vector2(-80.03, 99), 
                expected: new Vector2(16006, -19803.96)
            }
        ];

        testCases.forEach(({ transform, vector, expected }, index) => {
            test(`scale #${index + 1}`, () => {
                assertVectors(transform().applyTo(vector), expected);
            });
        });
    });

    suite('apply rotate to vector', () => {
        const testCases = [
            { 
                transform: () => Transform.createIdentity().rotate(0), 
                vector: new Vector2(10, -10), 
                expected: new Vector2(10, -10) 
            },
            { 
                transform: () => Transform.createIdentity().rotate(30), 
                vector: new Vector2(4.2, 40), 
                expected: new Vector2(-16.36, 36.74)
            },
            { 
                transform: () => Transform.createIdentity().rotate(90), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-14, -110)
            },
            { 
                transform: () => Transform.createIdentity().rotate(-30), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-88.26, 67.12)
            },
            { 
                transform: () => Transform.createIdentity().rotate(330), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-88.26, 67.12)
            },
            { 
                transform: () => Transform.createIdentity().rotate(180), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(110, -14)
            },
            { 
                transform: () => Transform.createIdentity().rotate(-180), 
                vector: new Vector2(-80.03, 99), 
                expected: new Vector2(80.03, -99)
            },
            { 
                transform: () => Transform.createIdentity().rotate(1.5), 
                vector: new Vector2(-80.03, 99), 
                expected: new Vector2(-82.59, 96.87)
            },
            { 
                transform: () => new Transform(new Matrix(1, 0, 0, 1, 0, 0)), 
                vector: new Vector2(10, -10), 
                expected: new Vector2(10, -10) 
            },
            { 
                transform: () => new Transform(new Matrix(0.866, -0.5, 0.5, 0.866, 0, 0)), 
                vector: new Vector2(4.2, 40), 
                expected: new Vector2(-16.36, 36.74)
            },
            { 
                transform: () => new Transform(new Matrix(0, -1, 1, 0, 0, 0)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-14, -110)
            },
            { 
                transform: () => new Transform(new Matrix(0.866, 0.5, -0.5, 0.866, 0, 0)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-88.26, 67.12)
            },
            { 
                transform: () => new Transform(new Matrix(-1, 0, 0, -1, 0, 0)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(110, -14)
            },
            { 
                transform: () => new Transform(new Matrix(0.99965, -0.02617, 0.02617, 0.99965, 0, 0)), 
                vector: new Vector2(-80.03, 99), 
                expected: new Vector2(-82.59, 96.87)
            }
        ];

        testCases.forEach(({ transform, vector, expected }, index) => {
            test(`rotate #${index + 1}`, () => {
                assertVectors(transform().applyTo(vector), expected);
            });
        });
    });

    suite('apply complex transform to vector', () => {
        const testCases = [
            { 
                transform: () => Transform.createIdentity()
                    .translate(new Vector2(20, -10))
                    .scale(new Vector2(-2, 2))
                    .rotate(30), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(224.52, -95.752) 
            },
            { 
                transform: () => Transform.createIdentity()
                    .scale(new Vector2(-2, 2))
                    .rotate(30)
                    .translate(new Vector2(20, -10)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(224.52, -95.752) 
            },
            { 
                transform: () => Transform.createIdentity()
                    .scale(new Vector2(-2, 2))
                    .translate(new Vector2(10, 10))
                    .rotate(30)
                    .translate(new Vector2(10, 10)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(224.52, -65.752) 
            },
            { 
                transform: () => Transform.createIdentity()
                    .translate(new Vector2(10, 10))
                    .scale(new Vector2(-2, 2))
                    .translate(new Vector2(20, -5))
                    .rotate(30)
                    .scale(new Vector2(-2, -3))
                    .rotate(90), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(311.5, 604.57)
            },
            
            { 
                transform: () => new Transform(new Matrix(-1.732, 1, 1, 1.732, 20, -10)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(224.52, -95.752) 
            },
            { 
                transform: () => new Transform(new Matrix(-1.732, 1, 1, 1.732, 20, 20)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(224.52, -65.752) 
            },
            { 
                transform: () => new Transform(new Matrix(-3, -3.464, -5.196, 2, 30, 5)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(311.504, 604.56)
            }
        ];

        testCases.forEach(({ transform, vector, expected }, index) => {
            test(`transform #${index + 1}`, () => {
                assertVectors(transform().applyTo(vector), expected);
            });
        });
    });
});