import { Maybe } from 'tsmonad';

import { 
    ArcSegment, 
    Brush, 
    ClosedPath, 
    ClosedShapeItem, 
    ClosedShapeStyle, 
    Color, 
    CubicBezierSegment, 
    DashSettings, 
    Design, 
    EllipseControls, 
    IClosedShapeControls, 
    IOpenShapeControls, 
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

import * as Dto from '../Design'

export function parseDesign(dto: Dto.Design): Maybe<Design> {
    if (dto.layers == null) {
        return Maybe.nothing();
    }

    const layers = [];
    for (const layer of dto.layers) {
        const parsedLayer = parseLayer(layer);
        if (Maybe.isNothing(parsedLayer)) {
            return Maybe.nothing();
        }

        layers.push(parsedLayer.valueOrThrow());
    }

    return Maybe.just(new Design(layers));
}

function parseLayer(dto: Dto.Layer): Maybe<Layer> {
    if (dto.items == null || dto.zIndex == null) {
        return Maybe.nothing();
    }

    const items = [];
    for (const item of dto.items) {
        const parsedItem = parseItem(item);
        if (Maybe.isNothing(parsedItem)) {
            return Maybe.nothing();
        }

        items.push(parsedItem.valueOrThrow());
    }

    return Maybe.just(new Layer(items, dto.zIndex));
}

function parseItem(dto: Dto.Item): Maybe<Item> {
    if (dto.closedShape != null) {
        return parseClosedShapeItem(dto.closedShape);
    }
    if (dto.openShape != null) {
        return parseOpenShapeItem(dto.openShape);
    }
    if (dto.image != null) {
        return parseImageItem(dto.image);
    }

    return Maybe.nothing();
}

function parseClosedShapeItem(dto: Dto.ClosedShapeItem): Maybe<ClosedShapeItem> {
    const position = Maybe.maybe(dto.position).bind(p => parseVector2(p));
    const transform = Maybe.maybe(dto.transform).bind(t => parseTransform(t));
    const controls = Maybe.maybe(dto.controls).bind(c => parseClosedShapeControls(c));
    const style = Maybe.maybe(dto.style).bind(s => parseClosedShapeStyle(s));

    return position
        .bind(() => transform)
        .bind(() => controls)
        .bind(() => style)
        .lift(() => new ClosedShapeItem(
            position.valueOrThrow(),
            transform.valueOrThrow(),
            controls.valueOrThrow(),
            style.valueOrThrow()
        ))
}

function parseOpenShapeItem(dto: Dto.OpenShapeItem): Maybe<OpenShapeItem> {
    const position = Maybe.maybe(dto.position).bind(p => parseVector2(p));
    const transform = Maybe.maybe(dto.transform).bind(t => parseTransform(t));
    const controls = Maybe.maybe(dto.controls).bind(c => parseOpenShapeControls(c));
    const style = Maybe.maybe(dto.style).bind(s => parseOpneShapeStyle(s));

    return position
        .bind(() => transform)
        .bind(() => controls)
        .bind(() => style)
        .lift(() => new OpenShapeItem(
            position.valueOrThrow(),
            transform.valueOrThrow(),
            controls.valueOrThrow(),
            style.valueOrThrow()
        ))
}

function parseImageItem(dto: Dto.ImageItem): Maybe<ImageItem> {
    const position = Maybe.maybe(dto.position).bind(p => parseVector2(p));
    const transform = Maybe.maybe(dto.transform).bind(t => parseTransform(t));
    const controls = Maybe.maybe(dto.controls).bind(c => parseRectangle(c));
    const style = Maybe.maybe(dto.style).bind(s => parseImageStyle(s));

    return position
        .bind(() => transform)
        .bind(() => controls)
        .bind(() => style)
        .bind(() => Maybe.maybe(dto.storageId))
        .lift(storageId => new ImageItem(
            position.valueOrThrow(),
            transform.valueOrThrow(),
            new RectangleControls(controls.valueOrThrow().corner1, controls.valueOrThrow().corner2),
            style.valueOrThrow(),
            storageId
        ))
}

function parseTransform(dto: Dto.Transform): Maybe<Transform> {
    if (dto.translate != null && dto.scale != null && dto.rotate != null) {
        const translate = parseVector2(dto.translate);
        const scale = parseVector2(dto.scale);
        const rotate = dto.rotate;

        return translate
            .bind(t => scale.lift(s => ({ t: t, s: s })))
            .lift(({ t, s }) => new Transform(t, s, rotate))
    }

    return Maybe.nothing();
}

function parseClosedShapeControls(dto: Dto.ClosedShapeControls): Maybe<IClosedShapeControls> {
    if (dto.rectangle != null) {
        return parseRectangle(dto.rectangle)
            .lift(rectangle => new RectangleControls(rectangle.corner1, rectangle.corner2));
    }
    if (dto.ellipse != null) {
        return parseRectangle(dto.ellipse)
            .lift(rectangle => new EllipseControls(rectangle));
    }
    if (dto.path != null) {
        return parsePath(dto.path)
            .lift(path => new PathControls(path));
    }

    return Maybe.nothing();
}

function parseOpenShapeControls(dto: Dto.OpenShapeControls): Maybe<IOpenShapeControls> {
    if (dto.line != null) {
        return parseLine(dto.line).lift(line => new LineControls(line.start, line.end));
    }
    if (dto.path != null) {
        return parsePath(dto.path)
            .lift(path => new PathControls(path));
    }

    return Maybe.nothing();
}

function parseClosedShapeStyle(dto: Dto.ShapeStyle): Maybe<ClosedShapeStyle> {
    if (dto.stroke != null && dto.fill != null) {
        const stroke = parsePen(dto.stroke);
        const fill = parseBrush(dto.fill);

        return stroke.bind(() => fill)
            .lift(() => new ClosedShapeStyle(
                stroke.valueOrThrow(),
                fill.valueOrThrow()
            ))
    }

    return Maybe.nothing();
}

function parseOpneShapeStyle(dto: Dto.ShapeStyle): Maybe<OpenShapeStyle> {
    return Maybe.maybe(dto.stroke)
        .bind(stroke => parsePen(stroke))
        .lift(stroke => new OpenShapeStyle(stroke));
}

function parseImageStyle(dto: Dto.ShapeStyle): Maybe<ImageStyle> {
    if (dto.border != null && dto.fill != null) {
        const border = parsePen(dto.border);
        const fill = parseBrush(dto.fill);

        return border.bind(() => fill)
            .lift(() => new ImageStyle(
                border.valueOrThrow(),
                fill.valueOrThrow()
            ))
    }

    return Maybe.nothing();
}

function parsePath(dto: Dto.Path): Maybe<Path> {
    return Maybe.maybe(dto.closed)
        .bind(segments => parseSegments(segments))
        .lift(segments => new ClosedPath(segments));
}

function parseSegments(dtos: Dto.Segment[]): Maybe<Segment[]> {
    const segments: Segment[] = [];
        for (const segment of dtos) {
            const parsedSegment = parseSegment(segment);
            if (Maybe.isNothing(parsedSegment)) {
                return Maybe.nothing();
            }

            segments.push(parsedSegment.valueOrThrow());
        }

        return Maybe.just(segments);
}

function parseSegment(dto: Dto.Segment): Maybe<Segment> {
    if (dto.line != null) {
        return parseLineSegment(dto.line);
    }
    if (dto.quadraticBezier != null) {
        return parseQuadratcBezierSegment(dto.quadraticBezier);
    }
    if (dto.cubicBezier != null) {
        return parseCubicBezierSegment(dto.cubicBezier);
    }
    if (dto.arc != null) {
        return parseArcSegment(dto.arc);
    }

    return Maybe.nothing();
}

function parseLineSegment(dto: Dto.LineSegment): Maybe<LineSegment> {
    return parseLine({ start: dto.start, end: dto.end } as Dto.Line)
        .lift(({ start, end }) => new LineSegment(start, end));
}

function parseQuadratcBezierSegment(dto: Dto.QuadraticBezierSegment): Maybe<QuadraticBezierSegment> {
    const start = Maybe.maybe(dto.start).bind(s => parseVector2(s));
    const control = Maybe.maybe(dto.control).bind(c => parseVector2(c));
    const end = Maybe.maybe(dto.end).bind(e => parseVector2(e));
    
    return Maybe.sequence({ start: start, control: control, end: end })
        .lift(() => new QuadraticBezierSegment(
            start.valueOrThrow(), 
            control.valueOrThrow(), 
            end.valueOrThrow()
        ))
}

function parseCubicBezierSegment(dto: Dto.CubicBezierSegment): Maybe<CubicBezierSegment> {
    const start = Maybe.maybe(dto.start).bind(s => parseVector2(s));
    const control1 = Maybe.maybe(dto.control1).bind(c => parseVector2(c));
    const control2 = Maybe.maybe(dto.control2).bind(c => parseVector2(c));
    const end = Maybe.maybe(dto.end).bind(e => parseVector2(e));
    
    return Maybe.sequence({ start: start, control1: control1, control2: control2, end: end })
        .lift(() => new CubicBezierSegment(
            start.valueOrThrow(), 
            control1.valueOrThrow(),
            control2.valueOrThrow(),
            end.valueOrThrow()
        ))
}

function parseArcSegment(dto: Dto.ArcSegment): Maybe<ArcSegment> {
    const start = Maybe.maybe(dto.start).bind(s => parseVector2(s));
    const end = Maybe.maybe(dto.end).bind(e => parseVector2(e));
    const radius = Maybe.maybe(dto.radius).bind(r => parseVector2(r));
    const xAxisRotation = Maybe.maybe(dto.xAxisRotation);
    
    return Maybe.sequence({ start: start, end: end, radius: radius })
        .bind(() => xAxisRotation)
        .lift(() => new ArcSegment(
            start.valueOrThrow(), 
            end.valueOrThrow(),
            radius.valueOrThrow(),
            xAxisRotation.valueOrThrow()
        ))
}

function parseRectangle(dto: Dto.Rectangle): Maybe<Rectangle> {
    const corner1 = Maybe.maybe(dto.corner1).bind(c => parseVector2(c));
    const corner2 = Maybe.maybe(dto.corner2).bind(c => parseVector2(c));

    return Maybe.sequence({ corner1: corner1, corner2: corner2 })
        .lift(() => new Rectangle(corner1.valueOrThrow(), corner2.valueOrThrow()));
}

function parseLine(dto: Dto.Line): Maybe<{ start: Vector2; end: Vector2 }> {
    
    return Maybe.maybe(dto.start)
        .bind(start => parseVector2(start))
        .bind(start => Maybe.maybe(dto.end).lift(end => ({ start: start, end: end })))
        .bind(({ start, end }) => parseVector2(end).lift(e => ({ start: start, end: e })))
        .lift(({ start, end }) => ({ start: start, end: end }));
}

function parsePen(dto: Dto.Pen): Maybe<Pen> {
    if (dto.style != null && dto.width != null && dto.dash != null) {
        const style = parseBrush(dto.style);
        const width = dto.width;
        const dashSettings = parseDashSettings(dto.dash);

        return style.bind(() => dashSettings)
            .lift(() => new Pen(
                style.valueOrThrow(),
                width,
                dashSettings.valueOrThrow()
            ));
    }

    return Maybe.nothing();
}

function parseDashSettings(dto: Dto.DashSettings): Maybe<DashSettings> {
    if (dto.dashes != null && dto.dashOffset != null) {
        return Maybe.just(new DashSettings(dto.dashes, dto.dashOffset));
    }

    return Maybe.nothing();
}

function parseBrush(dto: Dto.Brush): Maybe<Brush> {
    return Maybe.maybe(dto.solid)
        .bind(solid => parseSolidBrush(solid));
}

function parseSolidBrush(dto: Dto.SolidBrush): Maybe<SolidBrush> {
    if (dto.color != null) {
        return parseColor(dto.color)
            .lift(color => new SolidBrush(color));
    }

    return Maybe.nothing();
}

function parseColor(dto: Dto.Color): Maybe<Color> {
    return Maybe.maybe(dto.rgb)
        .bind(rgb => parseRgbColor(rgb));
}

function parseRgbColor(dto: Dto.RgbColor): Maybe<RgbColor> {
    if (dto.r != null && dto.g != null && dto.b != null && dto.a != null) {
        return Maybe.just(new RgbColor(dto.r, dto.g, dto.b, dto.a));
    }

    return Maybe.nothing();
}

function parseVector2(dto: Dto.Vector2): Maybe<Vector2> {
    if (dto.x != null && dto.y != null) {
        return Maybe.just(new Vector2(dto.x, dto.y));
    }

    return Maybe.nothing();
}