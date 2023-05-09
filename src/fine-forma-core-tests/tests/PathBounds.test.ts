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
