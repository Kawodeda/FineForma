import { first, last } from '../ArrayUtils';
import { Vector2, distance } from '../Math';
import { LineSegment } from '../Path';

export function simplify(polyline: readonly Vector2[], tolerance: number): LineSegment[] {
    const result = [...polyline];
    let removed = false;
    do {
        removed = simplifyParallelSegments(result, tolerance);
    } while (removed)
    console.log('simplification result', result);
    return toSegments(result);
}

function simplifyParallelSegments(polyline: Vector2[], tolerance: number): boolean {
    if (polyline.length < 3) {
        return false;
    }

    let removed = false;
    if (formSingleLine(last(polyline), first(polyline), polyline[1], tolerance)) {
        polyline.splice(0, 1);
        removed = true;
    }
    for (let i = 0; i < polyline.length - 2; i++) {
        if (formSingleLine(polyline[i], polyline[i + 1], polyline[i + 2], tolerance)) {
            polyline.splice(i + 1, 1);
            removed = true;
        }
    }
    if (formSingleLine(polyline[polyline.length - 2], last(polyline), first(polyline), tolerance)) {
        polyline.splice(polyline.length - 1, 1);
        removed = true;
    }

    return removed;
}

function formSingleLine(point1: Vector2 | undefined, point2: Vector2 | undefined, point3: Vector2 | undefined, tolerance: number): boolean {
    if (point1 == null || point2 == null || point3 == null) {
        return false;
    }
    
    const minValue = 1e-20;
    const tooCloseDistance = 20;

    const d1 = clampToMinAbs(distance(point1, point2), minValue);
    const d2 = clampToMinAbs(distance(point2, point3), minValue);

    const v1 = point1.subtract(point2);
    const v2 = point2.subtract(point3);

    const diff = angle(v1, v2);

    const factor = 1.5;
    if (Math.min(d1, d2) <= tooCloseDistance) {
        tolerance *= factor * tooCloseDistance / Math.min(d1, d2);
    }
    
    return diff <= tolerance;
}

function angle(point1: Vector2, point2: Vector2): number {
    return Math.acos(dotProduct(point1, point2) / (point1.magnitude * point2.magnitude));
}

function dotProduct(point1: Vector2, point2: Vector2): number {
    return point1.x * point2.x + point1.y * point2.y;
}

function clampToMinAbs(value: number, minAbs: number): number {
    if (Math.abs(value) < minAbs) {
        if (value >= 0) {
            return minAbs;
        }
        else {
            return -minAbs;
        }
    }

    return value;
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

function toSegments(points: readonly Vector2[]): LineSegment[] {
    return points.map((point, index) => new LineSegment(point, points[index + 1] ?? first(points)));
}