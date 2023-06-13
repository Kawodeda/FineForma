module FineFormaCore.Domain.Path

open FineFormaCore.Domain.Math.Vector2

type LineSegment = {
    Start: Vector2
    End: Vector2
}

type QuadraticBezierSegment = {
    Start: Vector2
    Control: Vector2
    End: Vector2
}

type CubicBezierSegment = {
    Start: Vector2
    Control1: Vector2
    Control2: Vector2
    End: Vector2
}

type ArcSegment = {
    Start: Vector2
    End: Vector2
    Radius: Vector2
    XAxisRotation: float
}

type Segment =
    | Line of LineSegment
    | QuadraticBezier of QuadraticBezierSegment
    | CubicBezier of CubicBezierSegment
    | Arc of ArcSegment

type Path =
    | Closed of Segment list
    | Open of Segment list
