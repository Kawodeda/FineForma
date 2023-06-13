module FineFormaCore.Domain.Math

module Vector2 =

    type Vector2 = {
        X: float
        Y: float
    }

    let create x y = {
        X = x
        Y = y
    }

    let zero = create 0 0

open Vector2

type Rectangle = {
    Corner1: Vector2
    Corner2: Vector2
}

type Transform = {
    Translate: Vector2
    Scale: Vector2
    Rotate: float
}
