module FineFormaCore.Domain.Style

module Color =

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

open Color

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
