import { Injectable } from '@angular/core';

import { 
    Brushes, 
    Design,
    DesignRenderer, 
    IRendererFactory, 
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
    createCircle 
} from 'fine-forma-core';

import { IViewerProvider } from './i-viewer-provider';

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
                new ViewportConstraints(new Vector2(-1000, -1000), new Vector2(1000, 1000), 0.1, 5),
                new Vector2(0, 0),
                1,
                0),
            this._createRendererFactory()
        );
    }

    private _createDesign(): Design {
        return new Design([
            new Layer([
                createCircle(200, 300, 90).setFill(Brushes.magenta()).build()
            ], 1)
        ]);
    }

    private _createRendererFactory(): IRendererFactory {
        return new RendererFactory(
            new DesignRenderer(
                new LayerRenderer(
                    new ItemRendererFactory({
                        getContent: () => {
                            throw new Error()
                        }
                    }))),
            new UiRenderer({ stroke: new Pen(new SolidBrush(new RgbColor(0, 144, 255, 255)), 2) }));
    }
}