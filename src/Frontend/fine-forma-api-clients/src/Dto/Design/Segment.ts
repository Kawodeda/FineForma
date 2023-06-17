import { ArcSegment } from './ArcSegment';
import { CubicBezierSegment } from './CubicBezierSegment';
import { LineSegment } from './LineSegment'
import { QuadraticBezierSegment } from './QuadraticBezierSegment';

export type Segment = {

    line?: LineSegment;

    quadraticBezier?: QuadraticBezierSegment;

    cubicBezier?: CubicBezierSegment;

    arc?: ArcSegment;
}