module FineFormaCore.Domain.Math

type Vector2 = {
    X: float
    Y: float
}

module Vector2 =

    let create x y = {
        X = x
        Y = y
    }

    let zero = create 0 0

type Line = {
    Start: Vector2
    End: Vector2
}

type Rectangle = {
    Corner1: Vector2
    Corner2: Vector2
}

type Transform = {
    Translate: Vector2
    Scale: Vector2
    Rotate: float
}
