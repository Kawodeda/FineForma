module FineFormaCore.Design

type Vector2 = {
    X: float
    Y: float
}

let vector2 (x, y) = {
    X = x
    Y = y
}

let zeroVector2 = vector2 (0, 0)

type Rectangle = {
    Corner1: Vector2
    Corner2: Vector2
}

type Transform = {
    Translate: Vector2
    Scale: Vector2
    Rotate: float
}

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

type RgbColor = {
    R: byte
    G: byte
    B: byte
    A: byte
}

type Color = Rgb of RgbColor

let rgba r g b a =
    Rgb {
        R = r
        G = g
        B = b
        A = a
    }

let rgb r g b = rgba r g b 255uy

type SolidBrush = { Color: Color }

type Brush = Solid of SolidBrush

type DashSettings = {
    Dashes: float list
    DashOffset: float
}

type Pen = {
    Style: Brush
    Width: float
    Dash: DashSettings
}

type ClosedShapeControls =
    | Rectangle of Rectangle
    | Ellipse of Rectangle
    | Path of Path

type OpenShapeControls =
    | Line
    | Path of Path

type ClosedShapeItem = {
    Position: Vector2
    Transform: Transform
    Controls: ClosedShapeControls
    Style: {|
        Stroke: Pen
        Fill: Brush
    |}
}

type OpenShapeItem = {
    Position: Vector2
    Transform: Transform
    Contols: OpenShapeControls
    Style: {| Stroke: Pen |}
}

type ImageItem = {
    Position: Vector2
    Transform: Transform
    Contols: Rectangle
    Style: {|
        Border: Pen
        Fill: Brush
    |}
    StorageId: string
}

type Item =
    | ClosedShape of ClosedShapeItem
    | OpenShape of OpenShapeItem
    | Image of ImageItem

type Layer = {
    Items: Item list
    ZIndex: int
}

type Design = { Layers: Layer list }
