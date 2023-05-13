import { suite, test } from 'mocha';
import { expect } from 'chai';

import { ArcSegment, Bounds, CubicBezierSegment, LineSegment, QuadraticBezierSegment, Rectangle, Vector2 } from 'fine-forma-core';

const assertBounds = (actual: Bounds, expected: Bounds): void => {
    expect(actual.corner1.x).to.be.approximately(expected.corner1.x, 0.001);
    expect(actual.corner1.y).to.be.approximately(expected.corner1.y, 0.001);
    expect(actual.corner2.x).to.be.approximately(expected.corner2.x, 0.001);
    expect(actual.corner2.y).to.be.approximately(expected.corner2.y, 0.001);
};

suite('Line segment bounds', () => {
    const testCases = [
        {
            line: () => new LineSegment(new Vector2(0, 0), new Vector2(0, 0)),
            expected: new Bounds(new Vector2(0, 0), new Vector2(0, 0))
        },
        {
            line: () => new LineSegment(new Vector2(20, 30), new Vector2(20, 30)),
            expected: new Bounds(new Vector2(20, 30), new Vector2(20, 30))
        },
        {
            line: () => new LineSegment(new Vector2(0, 0), new Vector2(100, 100)),
            expected: new Bounds(new Vector2(0, 0), new Vector2(100, 100))
        },
        {
            line: () => new LineSegment(new Vector2(100, 100), new Vector2(0, 0)),
            expected: new Bounds(new Vector2(0, 0), new Vector2(100, 100))
        },
        {
            line: () => new LineSegment(new Vector2(100, 0), new Vector2(0, 100)),
            expected: new Bounds(new Vector2(0, 0), new Vector2(100, 100))
        },
        {
            line: () => new LineSegment(new Vector2(0, 100), new Vector2(100, 0)),
            expected: new Bounds(new Vector2(0, 0), new Vector2(100, 100))
        },
        {
            line: () => new LineSegment(new Vector2(-80, -80), new Vector2(80, 80)),
            expected: new Bounds(new Vector2(-80, -80), new Vector2(80, 80))
        },
        {
            line: () => new LineSegment(new Vector2(80, 80), new Vector2(-80, -80)),
            expected: new Bounds(new Vector2(-80, -80), new Vector2(80, 80))
        },
        {
            line: () => new LineSegment(new Vector2(80, -80), new Vector2(-80, 80)),
            expected: new Bounds(new Vector2(-80, -80), new Vector2(80, 80))
        },
        {
            line: () => new LineSegment(new Vector2(-80, 80), new Vector2(80, -80)),
            expected: new Bounds(new Vector2(-80, -80), new Vector2(80, 80))
        }
    ];

    testCases.forEach(({ line, expected }, index) => {
        test(`line #${index + 1}`, () => {
            assertBounds(line().bounds, expected);
        });
    });
});

suite('Arc segment bounds', () => {
    const testCases = [
        {
            arc: () => new ArcSegment(new Vector2(0, 0), new Vector2(40, 0), new Vector2(20, 20), 0),
            expected: new Bounds(new Vector2(0, 0), new Vector2(40, 20))
        },
        {
            arc: () => new ArcSegment(new Vector2(0, 0), new Vector2(40, 0), new Vector2(20, 20), 41),
            expected: new Bounds(new Vector2(0, 0), new Vector2(40, 20))
        },
        {
            arc: () => new ArcSegment(new Vector2(0, 0), new Vector2(40, 0), new Vector2(20, 20), -56),
            expected: new Bounds(new Vector2(0, 0), new Vector2(40, 20))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 20), new Vector2(0, 20), new Vector2(20, 20), 0),
            expected: new Bounds(new Vector2(0, 0), new Vector2(40, 20))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 20), new Vector2(0, 20), new Vector2(20, 20), 41),
            expected: new Bounds(new Vector2(0, 0), new Vector2(40, 20))
        },
        {
            arc: () => new ArcSegment(new Vector2(0, 20), new Vector2(0, 0), new Vector2(40, 10), 0),
            expected: new Bounds(new Vector2(0, 0), new Vector2(40, 20))
        },
        {
            arc: () => new ArcSegment(new Vector2(0, 20), new Vector2(0, 0), new Vector2(40, 10), 41),
            expected: new Bounds(new Vector2(0, 0), new Vector2(11.268, 22.034))
        },
        {
            arc: () => new ArcSegment(new Vector2(0, 20), new Vector2(0, 0), new Vector2(40, 10), -56),
            expected: new Bounds(new Vector2(0, -0.2298), new Vector2(4.706, 20))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(40, 20), new Vector2(40, 10), 0),
            expected: new Bounds(new Vector2(0, 0), new Vector2(40, 20))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(40, 20), new Vector2(40, 10), 41),
            expected: new Bounds(new Vector2(28.731, -2.034), new Vector2(40, 20))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(0, 0), new Vector2(20, 20), 0),
            expected: new Bounds(new Vector2(0, -20), new Vector2(40, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(0, 0), new Vector2(20, 20), 41),
            expected: new Bounds(new Vector2(0, -20), new Vector2(40, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(-18, 38), new Vector2(30, 40), 0),
            expected: new Bounds(new Vector2(-21.311, -24.082), new Vector2(40, 38))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(-18, 38), new Vector2(30, 40), 41),
            expected: new Bounds(new Vector2(-18, -3.862), new Vector2(40, 38))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(-18, 38), new Vector2(30, 40), -56),
            expected: new Bounds(new Vector2(-30.5173, -18.3687), new Vector2(40, 38))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(51, -29), new Vector2(30, 40), 0),
            expected: new Bounds(new Vector2(40, -29), new Vector2(51, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(51, -29), new Vector2(30, 40), 41),
            expected: new Bounds(new Vector2(40, -29), new Vector2(51.003, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(15, 0), new Vector2(30, 0), 0),
            expected: new Bounds(new Vector2(15, 0), new Vector2(40, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(15, 0), new Vector2(30, 0), 41),
            expected: new Bounds(new Vector2(15, 0), new Vector2(40, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(20, -13), new Vector2(30, 0), 0),
            expected: new Bounds(new Vector2(20, -13), new Vector2(40, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(20, -13), new Vector2(30, 0), 41),
            expected: new Bounds(new Vector2(20, -13), new Vector2(40, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(20, -13), new Vector2(0, 30), 0),
            expected: new Bounds(new Vector2(20, -13), new Vector2(40, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(20, -13), new Vector2(0, 30), 41),
            expected: new Bounds(new Vector2(20, -13), new Vector2(40, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(20, -13), new Vector2(0, 30), -56),
            expected: new Bounds(new Vector2(20, -13), new Vector2(40, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(20, -13), new Vector2(0, 0), 0),
            expected: new Bounds(new Vector2(20, -13), new Vector2(40, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(20, -13), new Vector2(0, 0), 41),
            expected: new Bounds(new Vector2(20, -13), new Vector2(40, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(40, -139), new Vector2(30, 50), 0),
            expected: new Bounds(new Vector2(40, -139), new Vector2(81.7, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, 0), new Vector2(40, -139), new Vector2(30, 50), 41),
            expected: new Bounds(new Vector2(40, -148.098), new Vector2(113.607, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, -139), new Vector2(40, 0), new Vector2(30, 50), 0),
            expected: new Bounds(new Vector2(-1.7, -139), new Vector2(40, 0))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, -139), new Vector2(40, 0), new Vector2(30, 50), 41),
            expected: new Bounds(new Vector2(-33.608, -139), new Vector2(40, 9.097))
        },
        {
            arc: () => new ArcSegment(new Vector2(40, -139), new Vector2(40, 0), new Vector2(30, 50), -56),
            expected: new Bounds(new Vector2(-52.652, -147.033), new Vector2(40, 0))
        }
    ];

    testCases.forEach(({ arc, expected }, index) => {
        test(`arc #${index + 1}`, () => {
            assertBounds(arc().bounds, expected);
        });
    });
});

suite('Quadratic bezier segment bounds', () => {
    const testCases = [
        {
            curve: () => new QuadraticBezierSegment(new Vector2(1, 2), new Vector2(1, 2), new Vector2(1, 2)),
            expected: new Bounds(new Vector2(1, 2), new Vector2(1, 2))
        },
        {
            curve: () => new QuadraticBezierSegment(new Vector2(0, 0), new Vector2(0, -50), new Vector2(80, 0)),
            expected: new Bounds(new Vector2(0, -25), new Vector2(80, 0))
        },
        {
            curve: () => new QuadraticBezierSegment(new Vector2(0, 0), new Vector2(40, -40), new Vector2(80, 0)),
            expected: new Bounds(new Vector2(0, -20), new Vector2(80, 0))
        },
        {
            curve: () => new QuadraticBezierSegment(new Vector2(0, 0), new Vector2(40, 0), new Vector2(80, 0)),
            expected: new Bounds(new Vector2(0, 0), new Vector2(80, 0))
        },
        {
            curve: () => new QuadraticBezierSegment(new Vector2(0, 0), new Vector2(44, 99), new Vector2(80, 0)),
            expected: new Bounds(new Vector2(0, 0), new Vector2(80, 49.5))
        },
        {
            curve: () => new QuadraticBezierSegment(new Vector2(0, 0), new Vector2(225, 0), new Vector2(80, 0)),
            expected: new Bounds(new Vector2(0, 0), new Vector2(136.824, 0))
        },
        {
            curve: () => new QuadraticBezierSegment(new Vector2(0, 0), new Vector2(171, 17), new Vector2(73, 98)),
            expected: new Bounds(new Vector2(0, 0), new Vector2(108.702, 98))
        },
        {
            curve: () => new QuadraticBezierSegment(new Vector2(96, 28), new Vector2(163, -23), new Vector2(73, 98)),
            expected: new Bounds(new Vector2(73, 12.8779), new Vector2(124.592, 98))
        },
        {
            curve: () => new QuadraticBezierSegment(new Vector2(246, 57), new Vector2(-325, -172), new Vector2(-63, 204)),
            expected: new Bounds(new Vector2(-145.406, -29.6793), new Vector2(246, 204))
        }
    ];

    testCases.forEach(({curve, expected}, index) => {
        test(`quadratic bezier #${index + 1}`, () => {
            assertBounds(curve().bounds, expected);
        });
    });
});

suite('Cubic bezier segment bounds', () => {
    const testCases = [
        {
            curve: () => new CubicBezierSegment(new Vector2(10, -10), new Vector2(10, -10), new Vector2(10, -10), new Vector2(10, -10)),
            expected: new Bounds(new Vector2(10, -10), new Vector2(10, -10))
        },
        {
            curve: () => new CubicBezierSegment(new Vector2(0, 0), new Vector2(30, 0), new Vector2(60, 0), new Vector2(90, 0)),
            expected: new Bounds(new Vector2(0, 0), new Vector2(90, 0))
        },
        {
            curve: () => new CubicBezierSegment(new Vector2(0, 0), new Vector2(0, -57), new Vector2(90, 67), new Vector2(90, 0)),
            expected: new Bounds(new Vector2(0, -15.4579), new Vector2(90, 20.454))
        },
        {
            curve: () => new CubicBezierSegment(new Vector2(-33, -12), new Vector2(-69, 77), new Vector2(193, 10), new Vector2(88, -18)),
            expected: new Bounds(new Vector2(-36.4255, -18), new Vector2(112.999, 32.598))
        },
        {
            curve: () => new CubicBezierSegment(new Vector2(-33, -12), new Vector2(-125, 99), new Vector2(194, -56), new Vector2(74, -19)),
            expected: new Bounds(new Vector2(-49.9104, -24.8505), new Vector2(101.370, 28.753))
        },
        {
            curve: () => new CubicBezierSegment(new Vector2(-26, -29), new Vector2(198, 51), new Vector2(-89, 112), new Vector2(74, -19)),
            expected: new Bounds(new Vector2(-26, -29), new Vector2(74, 57.271))
        },
        {
            curve: () => new CubicBezierSegment(new Vector2(-13, -14), new Vector2(198, 51), new Vector2(-89, 112), new Vector2(152, 45)),
            expected: new Bounds(new Vector2(-13, -14), new Vector2(152, 74.103))
        },
        {
            curve: () => new CubicBezierSegment(new Vector2(-13, -14), new Vector2(147, 12), new Vector2(147, 12), new Vector2(-17, 55)),
            expected: new Bounds(new Vector2(-17, -14), new Vector2(106.504, 55))
        },
        {
            curve: () => new CubicBezierSegment(new Vector2(-23, -10), new Vector2(38, -9), new Vector2(41, 45), new Vector2(-23, 46)),
            expected: new Bounds(new Vector2(-23, -10), new Vector2(23.881, 46))
        },
        {
            curve: () => new CubicBezierSegment(new Vector2(-23, -10), new Vector2(14, 175), new Vector2(-126, 25), new Vector2(-23, 46)),
            expected: new Bounds(new Vector2(-61.5864, -10), new Vector2(-16.598, 83.607))
        }
    ];

    testCases.forEach(({curve, expected}, index) => {
        test(`cubic bezier #${index + 1}`, () => {
            assertBounds(curve().bounds, expected);
        });
    });
});