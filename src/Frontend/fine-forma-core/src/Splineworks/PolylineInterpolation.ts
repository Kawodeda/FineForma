import { Vector2, distance } from '../Math';
import { CubicBezierSegment, LineSegment, Segment } from '../Path';

export function interpolate(polyline: readonly LineSegment[], t: number): Segment[] {
    const points = fromSegments(polyline);
    if (points.length < 4) {
        return [...polyline];
    }
    const sections: CubicBezierSegment[] = [];

    sections[0] = bezier(points[points.length - 1], points[0], points[1], points[2], t);
    for (let i = 1; i < points.length - 2; i++) {
        sections[i] = bezier(points[i - 1], points[i], points[i + 1], points[i + 2], t);
    }
    sections[points.length - 2] = bezier(
        points[points.length - 3], 
        points[points.length - 2], 
        points[points.length - 1], 
        points[0], t);
    sections[points.length - 1] = bezier(points[points.length - 2], points[points.length - 1], points[0], points[1], t);

    return sections;
}

function bezier(point1: Vector2 | undefined, point2: Vector2 | undefined, point3: Vector2 | undefined, point4: Vector2 | undefined, t: number): CubicBezierSegment {
    if (point1 == null || point2 == null || point3 == null || point4 == null) {
        throw new Error('One of the points was undefined');
    }
    
    const dx1 = point1.x - point3.x;
    const dy1 = point1.y - point3.y;
    const d12 = distance(point1, point2);
    const d23 = distance(point2, point3);

    const x1 = point2.x - dx1 * t * Math.min(d23 / d12, 1);
    const y1 = point2.y - dy1 * t * Math.min(d23 / d12, 1);
    const cp1 = new Vector2(x1, y1);

    const dx2 = point2.x - point4.x;
    const dy2 = point2.y - point4.y;
    const d34 = distance(point3, point4);

    const x2 = point3.x + dx2 * t * Math.min(d23 / d34, 1);
    const y2 = point3.y + dy2 * t * Math.min(d23 / d34, 1);
    const cp2 = new Vector2(x2, y2);

    return new CubicBezierSegment(point2, cp1, cp2, point3);
}

function fromSegments(segments: readonly LineSegment[]): Vector2[] {
    return segments.flatMap((segment, index) => {
        const prevSegmentEnd = segments[index - 1]?.end;
        if (prevSegmentEnd != null && segment.start.equals(prevSegmentEnd)) {
            return [segment.end];
        }

        return [segment.start, segment.end];
    });
}