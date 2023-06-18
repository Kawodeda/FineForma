import { 
    ArcSegment,
    Brush,
    ClosedShapeItem,
    ClosedShapeStyle,
    Color,
    CubicBezierSegment,
    DashSettings,
    Design,
    EllipseControls,
    IShapeControls,
    ImageItem,
    ImageStyle,
    Item,
    Layer,
    LineControls,
    LineSegment,
    OpenShapeItem,
    OpenShapeStyle,
    Path,
    PathControls,
    Pen,
    QuadraticBezierSegment,
    Rectangle,
    RectangleControls,
    RgbColor,
    Segment,
    SolidBrush,
    Transform, 
    Vector2 
} from 'fine-forma-core';

import * as Dto from '../Design';

export function buildDesignDto(design: Design): Dto.Design {
    return {
        layers: design.layers.elements.map(buildLayerDto)
    }
}

function buildLayerDto(layer: Layer): Dto.Layer {
    return {
        items: layer.items.elements.map(buildItemDto),
        zIndex: layer.zIndex
    }
}

function buildItemDto(item: Item): Dto.Item {
    if (item instanceof ClosedShapeItem) {
        return {
            closedShape: buildClosedShapeItemDto(item)
        }
    }
    if (item instanceof OpenShapeItem) {
        return {
            openShape: buildOpenShapeItemDto(item)
        }
    }
    if (item instanceof ImageItem) {
        return {
            image: buildImageItemDto(item)
        }
    }

    throw new Error('Unable to build item dto');
}

function buildClosedShapeItemDto(closedShapeItem: ClosedShapeItem): Dto.ClosedShapeItem {
    return {
        position: buildVector2Dto(closedShapeItem.position),
        transform: buildTransformDto(closedShapeItem.transform),
        controls: buildClosedShapeControlsDto(closedShapeItem.controls),
        style: buildClosedShapeStyleDto(closedShapeItem.style)
    }
}

function buildOpenShapeItemDto(openShapeItem: OpenShapeItem): Dto.OpenShapeItem {
    return {
        position: buildVector2Dto(openShapeItem.position),
        transform: buildTransformDto(openShapeItem.transform),
        controls: buildOpenShapeControlsDto(openShapeItem.controls),
        style: buildOpenShapeStyleDto(openShapeItem.style)
    }
}

function buildImageItemDto(imageItem: ImageItem): Dto.ImageItem {
    return {
        position: buildVector2Dto(imageItem.position),
        transform: buildTransformDto(imageItem.transform),
        controls: buildRectangleDto(imageItem.rectangle.rectangle),
        style: buildImageStyleDto(imageItem.style),
        storageId: imageItem.storageId
    }
}

function buildClosedShapeControlsDto(controls: IShapeControls): Dto.ClosedShapeControls {
    if (controls instanceof RectangleControls) {
        return {
            rectangle: buildRectangleDto(new Rectangle(controls.corner1, controls.corner2))
        };
    }
    if (controls instanceof EllipseControls) {
        return {
            ellipse: buildRectangleDto(controls.rectangle)
        };
    }
    if (controls instanceof PathControls) {
        return {
            path: buildClosedPathDto(controls.path)
        };
    }

    throw new Error('Unable to build closed shape controls dto');
}

function buildOpenShapeControlsDto(controls: IShapeControls): Dto.OpenShapeControls {
    if (controls instanceof LineControls) {
        return {
            line: buildLineDto(controls.start, controls.end)
        };
    }
    if (controls instanceof PathControls) {
        return {
            path: buildOpenPathDto(controls.path)
        };
    }

    throw new Error('Unable to build closed shape controls dto');
}

function buildClosedShapeStyleDto(style: ClosedShapeStyle): Dto.ShapeStyle {
    return {
        stroke: buildPenDto(style.stroke),
        fill: buildBrushDto(style.fill)
    }
}

function buildOpenShapeStyleDto(style: OpenShapeStyle): Dto.ShapeStyle {
    return {
        stroke: buildPenDto(style.stroke)
    }
}

function buildImageStyleDto(style: ImageStyle): Dto.ShapeStyle {
    return {
        border: buildPenDto(style.border),
        fill: buildBrushDto(style.fill)
    }
}

function buildPenDto(pen: Pen): Dto.Pen {
    return {
        style: buildBrushDto(pen.style),
        width: pen.width,
        dash: buildDashSettingsDto(pen.dash)
    }
}

function buildDashSettingsDto(dashSettings: DashSettings): Dto.DashSettings {
    return {
        dashes: [...dashSettings.dashes],
        dashOffset: dashSettings.dashOffset
    }
}

function buildBrushDto(brush: Brush): Dto.Brush {
    if (brush instanceof SolidBrush) {
        return {
            solid: buildSolidBrushDto(brush)
        }
    }

    throw new Error('Unable to build brush dto');
}

function buildSolidBrushDto(solidBrush: SolidBrush): Dto.SolidBrush {
    return {
        color: buildColorDto(solidBrush.color)
    }
}

function buildColorDto(color: Color): Dto.Color {
    if (color instanceof RgbColor) {
        return {
            rgb: buildRgbColorDto(color)
        };
    }

    throw new Error('Unable to build color dto');
}

function buildRgbColorDto(rgbColor: RgbColor): Dto.RgbColor {
    return {
        r: rgbColor.r.value,
        g: rgbColor.g.value,
        b: rgbColor.b.value,
        a: rgbColor.alpha.value
    }
}

function buildClosedPathDto(path: Path): Dto.Path {
    return {
        closed: path.segments.map(buildSegmentDto)
    }
}

function buildOpenPathDto(path: Path): Dto.Path {
    return {
        open: path.segments.map(buildSegmentDto)
    }
}

function buildSegmentDto(segment: Segment): Dto.Segment {
    if (segment instanceof LineSegment) {
        return {
            line: buildLineDto(segment.start, segment.end)
        }
    }
    if (segment instanceof QuadraticBezierSegment) {
        return {
            quadraticBezier: buildQuadraticBezierSegmentDto(segment)
        }
    }
    if (segment instanceof CubicBezierSegment) {
        return {
            cubicBezier: buildCubicBezierSegmentDto(segment)
        }
    }
    if (segment instanceof ArcSegment) {
        return {
            arc: buildArcSegmentDto(segment)
        }
    }

    throw new Error('Unable to build segment dto');
}

function buildQuadraticBezierSegmentDto(quadraticBezier: QuadraticBezierSegment): Dto.QuadraticBezierSegment {
    return {
        start: buildVector2Dto(quadraticBezier.start),
        control: buildVector2Dto(quadraticBezier.control),
        end: buildVector2Dto(quadraticBezier.end)
    }
}

function buildCubicBezierSegmentDto(cubicBezier: CubicBezierSegment): Dto.CubicBezierSegment {
    return {
        start: buildVector2Dto(cubicBezier.start),
        control1: buildVector2Dto(cubicBezier.control1),
        control2: buildVector2Dto(cubicBezier.control2),
        end: buildVector2Dto(cubicBezier.end)
    }
}

function buildArcSegmentDto(arcSegment: ArcSegment): Dto.ArcSegment {
    return {
        start: buildVector2Dto(arcSegment.start),
        end: buildVector2Dto(arcSegment.end),
        radius: buildVector2Dto(arcSegment.radius),
        xAxisRotation: arcSegment.xAxisRotation
    }
}

function buildRectangleDto(rectangle: Rectangle): Dto.Rectangle {
    return {
        corner1: buildVector2Dto(rectangle.corner1),
        corner2: buildVector2Dto(rectangle.corner2)
    }
}

function buildLineDto(start: Vector2, end: Vector2): Dto.Line {
    return {
        start: buildVector2Dto(start),
        end: buildVector2Dto(end)
    }
}

function buildTransformDto(transform: Transform): Dto.Transform {
    return {
        translate: buildVector2Dto(transform.shift),
        scale: buildVector2Dto(transform.scaleFactor),
        rotate: transform.angle
    }
}

function buildVector2Dto(vector: Vector2): Dto.Vector2 {
    return {
        x: vector.x,
        y: vector.y
    }
}