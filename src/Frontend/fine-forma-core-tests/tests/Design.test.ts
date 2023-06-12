import { suite, test } from 'mocha';
import { expect } from 'chai';

import { Brushes, Design, ImageStyle, Layer, Pen, Transform, createCircle, createImage, createLine, createRectangle } from 'fine-forma-core';

suite('Design', () => {
    suite('equals', () => {
        const testCases = [
            {
                a: new Design([]),
                b: new Design([]),
                expected: true
            },
            {
                a: new Design([new Layer([], 0)]),
                b: new Design([]),
                expected: false
            },
            {
                a: new Design([new Layer([], 0)]),
                b: new Design([new Layer([], 1)]),
                expected: false
            },
            {
                a: new Design([new Layer([], 0)]),
                b: new Design([new Layer([], 0)]),
                expected: true
            },
            {
                a: new Design([new Layer([createCircle(100, 100, 80).build()], 1)]),
                b: new Design([new Layer([createCircle(100, 100, 80).build()], 1)]),
                expected: true
            },
            {
                a: new Design([new Layer([createCircle(100, 100, 80).build()], 1)]),
                b: new Design([new Layer([createRectangle(100, 100, 80, 80).build()], 1)]),
                expected: false
            },
            {
                a: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                b: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                expected: true
            },
            {
                a: new Design([
                    new Layer([createCircle(99, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                b: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                expected: false
            },
            {
                a: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 1),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                b: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                expected: false
            },
            {
                a: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image1')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                b: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                expected: false
            },
            {
                a: new Design([
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                b: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                expected: false
            },
            {
                a: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.black(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                b: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                expected: false
            },
            {
                a: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                b: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                expected: false
            },
            {
                a: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(8))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                b: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                expected: false
            },
            {
                a: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                b: new Design([
                    new Layer([createCircle(100, 100, 80).build()], 2),
                    new Layer([createRectangle(0, 0, 800, 200).build()], 0),
                    new Layer([
                        createImage(200, 308, 80, 120, 'image')
                            .setBorder(new Pen(Brushes.cyan(), 10))
                            .setFill(Brushes.lavender())
                            .setTransform(Transform.createIdentity().rotate(40))
                            .build(),
                        createLine(-10, -20, 300, 290).build()
                    ], -10)
                ]),
                expected: false
            }
        ];

        testCases.forEach(({ a, b, expected }, index) => {
            test(`equals ${index + 1}`, () => {
                expect(a.equals(b)).to.be.equal(expected);
            });
        });
    });
});