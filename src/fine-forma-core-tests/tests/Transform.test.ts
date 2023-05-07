import { suite, test } from 'mocha';
import { expect } from 'chai';

import { Vector2, Transform } from 'fine-forma-core';

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
                transform: () => new Transform(new Vector2(10, -10), new Vector2(1, 1), 0), 
                vector: new Vector2(0, 0), 
                expected: new Vector2(10, -10) 
            },
            { 
                transform: () => new Transform(new Vector2(4.2, 40), new Vector2(1, 1), 0), 
                vector: new Vector2(0, 0), 
                expected: new Vector2(4.2, 40) 
            },
            { 
                transform: () => new Transform(new Vector2(10, -10), new Vector2(1, 1), 0), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-100, 4)
            },
            { 
                transform: () => new Transform(new Vector2(0, 0), new Vector2(1, 1), 0), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-110, 14)
            },
            { 
                transform: () => new Transform(new Vector2(-200, -200.04), new Vector2(1, 1), 0), 
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
                transform: () => new Transform(Vector2.zero, new Vector2(1, 1), 0), 
                vector: new Vector2(0, 0), 
                expected: new Vector2(0, 0) 
            },
            { 
                transform: () => new Transform(Vector2.zero, new Vector2(1, 1), 0), 
                vector: new Vector2(4.2, 40), 
                expected: new Vector2(4.2, 40) 
            },
            { 
                transform: () => new Transform(Vector2.zero, new Vector2(2, -2), 0), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-220, -28)
            },
            { 
                transform: () => new Transform(Vector2.zero, new Vector2(0, 0), 0), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(0, 0)
            },
            { 
                transform: () => new Transform(Vector2.zero, new Vector2(2.5, 2.4), 0), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-275, 33.6)
            },
            { 
                transform: () => new Transform(Vector2.zero, new Vector2(-200, -200.04), 0), 
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
                transform: () => new Transform(Vector2.zero, new Vector2(1, 1), 0), 
                vector: new Vector2(10, -10), 
                expected: new Vector2(10, -10) 
            },
            { 
                transform: () => new Transform(Vector2.zero, new Vector2(1, 1), 30), 
                vector: new Vector2(4.2, 40), 
                expected: new Vector2(-16.36, 36.74)
            },
            { 
                transform: () => new Transform(Vector2.zero, new Vector2(1, 1), 90), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-14, -110)
            },
            { 
                transform: () => new Transform(Vector2.zero, new Vector2(1, 1), -30), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-88.26, 67.12)
            },
            { 
                transform: () => new Transform(Vector2.zero, new Vector2(1, 1), 330), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(-88.26, 67.12)
            },
            { 
                transform: () => new Transform(Vector2.zero, new Vector2(1, 1), 180), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(110, -14)
            },
            { 
                transform: () => new Transform(Vector2.zero, new Vector2(1, 1), -180), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(110, -14)
            },
            { 
                transform: () => new Transform(Vector2.zero, new Vector2(1, 1), 1.5),
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
                expected: new Vector2(196.52, 124.248) 
            },
            { 
                transform: () => Transform.createIdentity()
                    .scale(new Vector2(-2, 2))
                    .rotate(30)
                    .translate(new Vector2(20, -10)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(196.52, 124.248) 
            },
            { 
                transform: () => Transform.createIdentity()
                    .translate(new Vector2(20, -10))
                    .rotate(30)
                    .scale(new Vector2(-2, 2)),
                vector: new Vector2(-110, 14), 
                expected: new Vector2(196.52, 124.248) 
            },
            { 
                transform: () => Transform.createIdentity()
                    .scale(new Vector2(-2, 2))
                    .translate(new Vector2(10, 10))
                    .rotate(30)
                    .translate(new Vector2(10, 10)), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(196.52, 154.248) 
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
                expected: new Vector2(322.744, -334.05)
            },
            
            { 
                transform: () => new Transform(new Vector2(20, -10), new Vector2(-2, 2), 30), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(196.52, 124.248) 
            },
            { 
                transform: () => new Transform(new Vector2(20, 20), new Vector2(-2, 2), 30), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(196.52, 154.248) 
            },
            { 
                transform: () => new Transform(new Vector2(30, 5), new Vector2(4, -6), 120), 
                vector: new Vector2(-110, 14), 
                expected: new Vector2(322.744, -334.05)
            }
        ];

        testCases.forEach(({ transform, vector, expected }, index) => {
            test(`transform #${index + 1}`, () => {
                assertVectors(transform().applyTo(vector), expected);
            });
        });
    });
});