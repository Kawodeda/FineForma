import { suite, test } from 'mocha';
import { expect } from 'chai';

import { ArcSegment, LineSegment, Rectangle, Vector2 } from 'fine-forma-core';

suite('Line segment bounds', () => {
    const testCases = [
        {
            line: new LineSegment(new Vector2(0, 0), new Vector2(0, 0)),
            expected: new Rectangle(new Vector2(0, 0), new Vector2(0, 0))
        },
        {
            line: new LineSegment(new Vector2(20, 30), new Vector2(20, 30)),
            expected: new Rectangle(new Vector2(20, 30), new Vector2(20, 30))
        },
        {
            line: new LineSegment(new Vector2(0, 0), new Vector2(100, 100)),
            expected: new Rectangle(new Vector2(0, 0), new Vector2(100, 100))
        },
        {
            line: new LineSegment(new Vector2(100, 100), new Vector2(0, 0)),
            expected: new Rectangle(new Vector2(0, 0), new Vector2(100, 100))
        },
        {
            line: new LineSegment(new Vector2(100, 0), new Vector2(0, 100)),
            expected: new Rectangle(new Vector2(0, 0), new Vector2(100, 100))
        },
        {
            line: new LineSegment(new Vector2(0, 100), new Vector2(100, 0)),
            expected: new Rectangle(new Vector2(0, 0), new Vector2(100, 100))
        },
        {
            line: new LineSegment(new Vector2(-80, -80), new Vector2(80, 80)),
            expected: new Rectangle(new Vector2(-80, -80), new Vector2(80, 80))
        },
        {
            line: new LineSegment(new Vector2(80, 80), new Vector2(-80, -80)),
            expected: new Rectangle(new Vector2(-80, -80), new Vector2(80, 80))
        },
        {
            line: new LineSegment(new Vector2(80, -80), new Vector2(-80, 80)),
            expected: new Rectangle(new Vector2(-80, -80), new Vector2(80, 80))
        },
        {
            line: new LineSegment(new Vector2(-80, 80), new Vector2(80, -80)),
            expected: new Rectangle(new Vector2(-80, -80), new Vector2(80, 80))
        }
    ];

    testCases.forEach(({ line, expected }, index) => {
        test(`line #${index + 1}`, () => {
            expect(line.bounds.equals(expected)).to.be.true;
        });
    });
});

suite('Arc segment bounds', () => {
    const testCases = [
        {
            arc: new ArcSegment(new Vector2(0, 0), new Vector2(40, 0), new Vector2(20, 20), 0),
            expected: new Rectangle(new Vector2(0, 0), new Vector2(40, 20))
        },
        {
            arc: new ArcSegment(new Vector2(40, 20), new Vector2(0, 20), new Vector2(20, 20), 0),
            expected: new Rectangle(new Vector2(0, 0), new Vector2(40, 20))
        },
        {
            arc: new ArcSegment(new Vector2(0, 20), new Vector2(0, 0), new Vector2(40, 10), 0),
            expected: new Rectangle(new Vector2(0, 0), new Vector2(40, 20))
        },
        {
            arc: new ArcSegment(new Vector2(40, 0), new Vector2(40, 20), new Vector2(40, 10), 0),
            expected: new Rectangle(new Vector2(0, 0), new Vector2(40, 20))
        },
        {
            arc: new ArcSegment(new Vector2(40, 0), new Vector2(0, 0), new Vector2(20, 20), 0),
            expected: new Rectangle(new Vector2(0, -20), new Vector2(40, 0))
        },
        {
            arc: new ArcSegment(new Vector2(40, 0), new Vector2(-18, 38), new Vector2(30, 40), 0),
            expected: new Rectangle(new Vector2(-21.305, -24.0637), new Vector2(40, 38))
        },
        {
            arc: new ArcSegment(new Vector2(40, 0), new Vector2(51, -29), new Vector2(30, 40), 0),
            expected: new Rectangle(new Vector2(40, -29), new Vector2(51, 0))
        },
        {
            arc: new ArcSegment(new Vector2(40, 0), new Vector2(15, 0), new Vector2(30, 0), 0),
            expected: new Rectangle(new Vector2(15, 0), new Vector2(40, 0))
        },
        {
            arc: new ArcSegment(new Vector2(40, 0), new Vector2(20, -13), new Vector2(30, 0), 0),
            expected: new Rectangle(new Vector2(20, -13), new Vector2(40, 0))
        },
        {
            arc: new ArcSegment(new Vector2(40, 0), new Vector2(40, -139), new Vector2(30, 50), 0),
            expected: new Rectangle(new Vector2(40, -139), new Vector2(81.7, 0))
        },
        {
            arc: new ArcSegment(new Vector2(40, -139), new Vector2(40, 0), new Vector2(30, 50), 0),
            expected: new Rectangle(new Vector2(-1.7, -139), new Vector2(40, 0))
        }
    ];

    testCases.forEach(({ arc, expected }, index) => {
        test(`arc #${index + 1}`, () => {
            expect(arc.bounds.equals(expected)).to.be.true;
        });
    });
});