module FineFormaCore.Domain.Design

open FineFormaCore.Domain.Math
open FineFormaCore.Domain.Path
open FineFormaCore.Domain.Style

type ClosedShapeControls =
    | Rectangle of Rectangle
    | Ellipse of Rectangle
    | Path of Path

type OpenShapeControls =
    | Line of Line
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
    Controls: OpenShapeControls
    Style: {| Stroke: Pen |}
}

type ImageItem = {
    Position: Vector2
    Transform: Transform
    Controls: Rectangle
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
