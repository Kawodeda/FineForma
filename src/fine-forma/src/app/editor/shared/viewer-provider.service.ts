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
    UiRenderer, 
    Vector2, 
    Viewer, 
    Viewport, 
    ViewportConstraints, 
    createCircle 
} from 'fine-forma-core';

@Injectable()
export class ViewerProvider {

    private readonly _viewer: Viewer;

    constructor() {
        this._viewer = this._createViewer();
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
                        getContent: (storageId) => {
                            throw new Error()
                        }
                    }))),
            new UiRenderer({ stroke: new Pen(Brushes.cyan(), 2) }));
    }
}