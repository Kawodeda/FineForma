import { Vector2 } from 'fine-forma-core/src/Math';
import { LineSegment, CubicBezierSegment, Path, ClosedPath } from 'fine-forma-core/src/Path';

export function pathHeart(): Path {
    return new ClosedPath([
        new LineSegment(new Vector2(0, 0), new Vector2(-4, -2)),
        new CubicBezierSegment(new Vector2(-4, -2), new Vector2(-4, -3), new Vector2(-46, -27), new Vector2(-97, -69)),
        new CubicBezierSegment(new Vector2(-97, -69), new Vector2(-145, -108), new Vector2(-210, -170), new Vector2(-254, -244)),
        new CubicBezierSegment(new Vector2(-254, -244), new Vector2(-285, -298), new Vector2(-300, -352), new Vector2(-300, -404)),
        new CubicBezierSegment(new Vector2(-300, -404), new Vector2(-300, -427), new Vector2(-296, -448), new Vector2(-288, -467)),
        new CubicBezierSegment(new Vector2(-288, -467), new Vector2(-281, -486), new Vector2(-269, -502), new Vector2(-255, -516)),
        new CubicBezierSegment(new Vector2(-255, -516), new Vector2(-227, -543), new Vector2(-188, -558), new Vector2(-146, -558)),
        new CubicBezierSegment(new Vector2(-146, -558), new Vector2(-121, -558), new Vector2(-98, -554), new Vector2(-78, -546)),
        new CubicBezierSegment(new Vector2(-78, -546), new Vector2(-59, -538), new Vector2(-43, -527), new Vector2(-30, -512)),
        new CubicBezierSegment(new Vector2(-30, -512), new Vector2(-16, -498), new Vector2(-6, -479), new Vector2(0, -459)),
        new CubicBezierSegment(new Vector2(0, -459), new Vector2(6, -479), new Vector2(16, -498), new Vector2(30, -512)),
        new CubicBezierSegment(new Vector2(30, -512), new Vector2(43, -527), new Vector2(59, -538), new Vector2(78, -546)),
        new CubicBezierSegment(new Vector2(78, -546), new Vector2(98, -554), new Vector2(121, -558), new Vector2(146, -558)),
        new CubicBezierSegment(new Vector2(146, -558), new Vector2(188, -558), new Vector2(227, -543), new Vector2(255, -516)),
        new CubicBezierSegment(new Vector2(255, -516), new Vector2(269, -502), new Vector2(281, -486), new Vector2(288, -467)),
        new CubicBezierSegment(new Vector2(288, -467), new Vector2(296, -448), new Vector2(300, -427), new Vector2(300, -404)),
        new CubicBezierSegment(new Vector2(300, -404), new Vector2(300, -352), new Vector2(285, -298), new Vector2(254, -244)),
        new CubicBezierSegment(new Vector2(254, -244), new Vector2(235, -211), new Vector2(210, -178), new Vector2(179, -146)),
        new CubicBezierSegment(new Vector2(179, -146), new Vector2(155, -120), new Vector2(128, -94), new Vector2(97, -69)),
        new CubicBezierSegment(new Vector2(97, -69), new Vector2(46, -27), new Vector2(4, -3), new Vector2(4, -2)),
        new LineSegment(new Vector2(4, -2), new Vector2(0, 0))
    ]);
}

export function pathApple(): Path {
    return new ClosedPath([
        new CubicBezierSegment(new Vector2(110, 40), new Vector2(104, 53.3), new Vector2(101.1, 59.3), new Vector2(93.4, 71)),
        new CubicBezierSegment(new Vector2(93.4, 71), new Vector2(82.6, 87.4), new Vector2(67.4, 107.9), new Vector2(48.5, 108.1)),
        new CubicBezierSegment(new Vector2(48.5, 108.1), new Vector2(31.7, 108.3), new Vector2(27.4, 97.2), new Vector2(4.7, 97.3)),
        new CubicBezierSegment(new Vector2(4.7, 97.3), new Vector2(-18, 97.4), new Vector2(-22.8, 108.3), new Vector2(-39.6, 108.1)),
        new CubicBezierSegment(new Vector2(-39.6, 108.1), new Vector2(-58.5, 107.9), new Vector2(-72.9, 89.4), new Vector2(-83.7, 73)),
        new CubicBezierSegment(new Vector2(-83.7, 73), new Vector2(-113.9, 27), new Vector2(-117.1, -26.9), new Vector2(-98.4, -55.6)),
        new CubicBezierSegment(new Vector2(-98.4, -55.6), new Vector2(-85.2, -76), new Vector2(-64.3, -87.9), new Vector2(-44.6, -87.9)),
        new CubicBezierSegment(new Vector2(-44.6, -87.9), new Vector2(-24.6, -87.9), new Vector2(-12.1, -76.9), new Vector2(4.5, -76.9)),
        new CubicBezierSegment(new Vector2(4.5, -76.9), new Vector2(20.5, -76.9), new Vector2(30.3, -87.9), new Vector2(53.4, -87.9)),
        new CubicBezierSegment(new Vector2(53.4, -87.9), new Vector2(70.9, -87.9), new Vector2(89.4, -78.4), new Vector2(102.6, -61.9)),
        new CubicBezierSegment(new Vector2(102.6, -61.9), new Vector2(59.3, -38.2), new Vector2(66.3, 23.5), new Vector2(110, 40)),
        new LineSegment(new Vector2(110, 40), new Vector2(110, 40)),
        new CubicBezierSegment(new Vector2(35.8, -106.2), new Vector2(44.2, -117), new Vector2(50.6, -132.2), new Vector2(48.3, -147.8)),
        new CubicBezierSegment(new Vector2(48.3, -147.8), new Vector2(34.6, -146.9), new Vector2(18.5, -138.1), new Vector2(9.2, -126.7)),
        new CubicBezierSegment(new Vector2(9.2, -126.7), new Vector2(0.7, -116.4), new Vector2(-6.3, -101.1), new Vector2(-3.6, -86.2)),
        new CubicBezierSegment(new Vector2(-3.6, -86.2), new Vector2(11.3, -85.7), new Vector2(26.8, -94.7), new Vector2(35.8, -106.2)),
        new LineSegment(new Vector2(35.8, -106.2), new Vector2(35.8, -106.2))
    ]);
}