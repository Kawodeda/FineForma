import { Injectable } from '@angular/core';

import { 
    Brushes, 
    DashSettings, 
    Design,
    DesignRenderer, 
    IRendererFactory, 
    ImageContentProvider, 
    ItemRendererFactory, 
    Layer, 
    LayerRenderer, 
    Pen, 
    RendererFactory,
    RgbColor,
    Selection,
    SolidBrush,
    UiRenderer, 
    Vector2, 
    Viewer, 
    Viewport, 
    ViewportConstraints, 
    createCircle, 
    createImage, 
    createRectangle,
    InputReceiver,
    ViewportInputHandler,
    Rectangle,
    Margin,
    SelectionInputHandler,
    HitTestService,
    SelectionRenderer,
    RotationGripRenderer,
    RotationInputHandler,
    IRotationGrip,
    RotationGrip,
    ResizeGripsRenderer,
    ResizeInputHandler,
    SelectionDebugRenderer,
    IRenderer,
    Path,
    ClosedPath,
    CubicBezierSegment,
    LineSegment,
    ClosedShapeItem,
    Transform,
    PathControls,
    ClosedShapeStyle,
    ShapeDrawingInputHandler
} from 'fine-forma-core';

import { IViewerProvider } from './i-viewer-provider';
import { ExternalImageStorage } from './external-image-storage';

const DEBUG_MODE = false;

@Injectable()
export class ViewerProvider implements IViewerProvider {

    private readonly _viewer: Viewer;

    private _shapeDrawingInputHandler: ShapeDrawingInputHandler | null = null;

    constructor() {
        this._viewer = this._createViewer();
        this._viewer.selection = new Selection(this._viewer.design.layers.get(0).items.get(0));
    }

    get viewer(): Viewer {
        return this._viewer;
    }

    get shapeDrawingInputHandler(): ShapeDrawingInputHandler {
        if (this._shapeDrawingInputHandler == null) {
            throw new Error('Shape drawing input handler is not initialized');
        }

        return this._shapeDrawingInputHandler;
    }

    private _createViewer(): Viewer {
        const rotationGrip = new RotationGrip(20, 24);
        const resizeGripSize = 10;

        return new Viewer(
            this._createDesign(),
            new Viewport(
                new ViewportConstraints(
                    new Rectangle(new Vector2(0, 0), new Vector2(1000, 1000)),
                    new Margin(-100, -100, -100, -100), 
                    0.1, 
                    8,
                    new Vector2(1000, 1000)),
                new Vector2(0, 0),
                1,
                0),
            this._createRendererFactory(rotationGrip, resizeGripSize),
            { 
                create: executor => {
                    const hitTestService = new HitTestService(executor);
                    this._shapeDrawingInputHandler = new ShapeDrawingInputHandler(
                        new RotationInputHandler(
                            rotationGrip,
                            executor,
                            hitTestService,
                            new ResizeInputHandler(
                                executor,
                                hitTestService,
                                resizeGripSize,
                                new SelectionInputHandler(
                                    hitTestService, 
                                    executor,
                                    new ViewportInputHandler({ wheelZoomSensitivity: 1, wheelScrollSensitivity: 1 })
                                )
                            )   
                        )
                    );

                    return new InputReceiver(
                        this._shapeDrawingInputHandler, 
                        executor
                    )
                } 
            }
        );
    }

    private _createDesign(): Design {
        return new Design([
            new Layer([
                createCircle(100, 200, 90)
                    .setFill(Brushes.green())
                    .setStroke(new Pen(Brushes.black(), 0))
                    .build(),
                createRectangle(400, 200, 150, 80)
                    .setFill(Brushes.lavender())
                    .setStroke(new Pen(Brushes.red(), 4, new DashSettings([10, 10])))
                    .build(),
                new ClosedShapeItem(
                    new Vector2(400, 500),
                    Transform.createIdentity(),
                    new PathControls(this._pathApple()),
                    new ClosedShapeStyle(new Pen(Brushes.black(), 0), Brushes.red())
                ),
                createImage(700, 600, 200, 200, 'masyunya')
                .setBorder(new Pen(Brushes.black(), 0))
                .build(),
                createImage(800, 200, 200, 200, 'sima2')
                .setBorder(new Pen(Brushes.black(), 0))
                .build()
            ], 1)
        ]);
    }

    private _createRendererFactory(rotationGrip: IRotationGrip, resizeGripSize: number): IRendererFactory {
        const images = [
            ['masyunya', 'https://vk.com/sticker/1-71339-512'],
            ['masyunya2', 'https://vk.com/sticker/1-71326-512'],
            ['masyunya3', 'https://vk.com/sticker/1-71367-512'],
            ['sima', 'https://vk.com/sticker/1-79353-512'],
            ['sima2', 'https://vk.com/sticker/1-79342-512']
        ] as [string, string][];
        const gripsStyle = { 
            stroke: new Pen(new SolidBrush(new RgbColor(0, 144, 255, 255)), 2),
            fill: Brushes.white() 
        };

        return new RendererFactory(
            new DesignRenderer(
                new LayerRenderer(
                    new ItemRendererFactory(
                        new ImageContentProvider(
                            new ExternalImageStorage(images))))),
            {
                create: (designContext, viewportContext, selectionContext) => {
                    const uiRenderers: IRenderer[] = [
                        new SelectionRenderer(
                            selectionContext,
                            viewportContext,
                            { stroke: gripsStyle.stroke }
                        ),
                        new ResizeGripsRenderer(
                            selectionContext,
                            viewportContext,
                            { gripSize: resizeGripSize },
                            gripsStyle
                        ),
                        new RotationGripRenderer(
                            selectionContext,
                            viewportContext,
                            { rotationGrip: rotationGrip },
                            gripsStyle
                        )
                    ];
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    if (DEBUG_MODE) {
                        uiRenderers.push(new SelectionDebugRenderer(selectionContext, viewportContext));
                    }

                    return new UiRenderer(uiRenderers);
                }
            }
        );
    }

    private _pathApple(): Path {
        return new ClosedPath([
            new CubicBezierSegment(new Vector2(110, 40), new Vector2(104, 53.3), new Vector2(101.1, 59.3), new Vector2(93.4, 71)),
            new CubicBezierSegment(new Vector2(93.4, 71), new Vector2(82.6, 87.4), new Vector2(67.4, 107.9), new Vector2(48.5, 108.1)),
            new CubicBezierSegment(new Vector2(48.5, 108.1), new Vector2(31.7, 108.3), new Vector2(27.4, 97.2), new Vector2(4.7, 97.3)),
            new CubicBezierSegment(new Vector2(4.7, 97.3), new Vector2(-18, 97.4), new Vector2(-22.8, 108.3), new Vector2(-39.6, 108.1)),
            new CubicBezierSegment(new Vector2(-39.6, 108.1), new Vector2(-58.5, 107.9), new Vector2(-72.9, 89.4), new Vector2(-83.7, 73)),
            new CubicBezierSegment(new Vector2(-83.7, 73), new Vector2(-113.9, 27), new Vector2(-117.1, -26.9), new Vector2(-98.4, -55.6)),
            new CubicBezierSegment(new Vector2(-98.4, -55.6), new Vector2(-85.2, -76), new Vector2(-64.3, -87.9), new Vector2(-44.6, -87.9)),
            new CubicBezierSegment(new Vector2(-44.6, -87.9), new Vector2(-24.6, -87.9), new Vector2(-12.1, -76.9), new Vector2(4.5, -76.9)),
            new CubicBezierSegment(new Vector2(4.5, -76.9), new Vector2(20.5, -76.9), new Vector2(30.3, -87.9), new Vector2(53.4, -87.9)),
            new CubicBezierSegment(new Vector2(53.4, -87.9), new Vector2(70.9, -87.9), new Vector2(89.4, -78.4), new Vector2(102.6, -61.9)),
            new CubicBezierSegment(new Vector2(102.6, -61.9), new Vector2(59.3, -38.2), new Vector2(66.3, 23.5), new Vector2(110, 40)),
            new LineSegment(new Vector2(110, 40), new Vector2(110, 40)),
            new CubicBezierSegment(new Vector2(35.8, -106.2), new Vector2(44.2, -117), new Vector2(50.6, -132.2), new Vector2(48.3, -147.8)),
            new CubicBezierSegment(new Vector2(48.3, -147.8), new Vector2(34.6, -146.9), new Vector2(18.5, -138.1), new Vector2(9.2, -126.7)),
            new CubicBezierSegment(new Vector2(9.2, -126.7), new Vector2(0.7, -116.4), new Vector2(-6.3, -101.1), new Vector2(-3.6, -86.2)),
            new CubicBezierSegment(new Vector2(-3.6, -86.2), new Vector2(11.3, -85.7), new Vector2(26.8, -94.7), new Vector2(35.8, -106.2)),
            new LineSegment(new Vector2(35.8, -106.2), new Vector2(35.8, -106.2))
        ]);
    }
}