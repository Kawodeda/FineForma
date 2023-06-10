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
    HitTestService
} from 'fine-forma-core';

import { IViewerProvider } from './i-viewer-provider';
import { ExternalImageStorage } from '../../shared/external-image-storage';

@Injectable()
export class ViewerProvider implements IViewerProvider {

    private readonly _viewer: Viewer;

    constructor() {
        this._viewer = this._createViewer();
        this._viewer.selection = new Selection(this._viewer.design.layers.get(0).items.get(0));
    }

    get viewer(): Viewer {
        return this._viewer;
    }

    private _createViewer(): Viewer {
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
            this._createRendererFactory(),
            { 
                create: executor => new InputReceiver(
                    new SelectionInputHandler(
                        new HitTestService(executor), 
                        executor,
                        new ViewportInputHandler({ wheelZoomSensitivity: 1, wheelScrollSensitivity: 1 })), 
                    executor
                ) 
            }
        );
    }

    private _createDesign(): Design {
        return new Design([
            new Layer([
                createCircle(200, 300, 90).setFill(Brushes.green()).build(),
                createRectangle(400, 200, 150, 80)
                    .setFill(Brushes.lavender())
                    .setStroke(new Pen(Brushes.red(), 4, new DashSettings([9, 4])))
                    .build(),
                createImage(600, 600, 200, 200, 'masyunya3').build(),
                createImage(800, 200, 200, 200, 'sima2').build()
            ], 1),
            new Layer([
                createRectangle(50, 50, 100, 100).build(),
                createRectangle(950, 950, 100, 100).build(),
                createRectangle(950, 50, 100, 100).build(),
                createRectangle(50, 950, 100, 100).build()
            ], 2)
        ]);
    }

    private _createRendererFactory(): IRendererFactory {
        const images = [
            ['masyunya', 'https://vk.com/sticker/1-71339-512'],
            ['masyunya2', 'https://vk.com/sticker/1-71326-512'],
            ['masyunya3', 'https://vk.com/sticker/1-71367-512'],
            ['sima', 'https://vk.com/sticker/1-79353-512'],
            ['sima2', 'https://vk.com/sticker/1-79342-512']
        ] as [string, string][];

        return new RendererFactory(
            new DesignRenderer(
                new LayerRenderer(
                    new ItemRendererFactory(
                        new ImageContentProvider(
                            new ExternalImageStorage(images))))),
            new UiRenderer({ stroke: new Pen(new SolidBrush(new RgbColor(0, 144, 255, 255)), 2) }));
    }
}