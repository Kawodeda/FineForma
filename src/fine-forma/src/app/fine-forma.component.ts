import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import {
    Viewer,
    Viewport,
    Design,
    Layer,
    createCircle,
    Brushes,
    RendererFactory,
    DesignRenderer,
    LayerRenderer,
    ItemRendererFactory,
    IRendererFactory,
    UiRenderer,
    Pen,
    ViewportConstraints,
    Vector2,
    Command,
    SelectItemAtCommand,
    ClearSelectionCommand,
    ZoomCommand,
    RemoveItemCommand,
    AddItemToLayerAtCommand,
    createRectangle,
    SolidBrush,
    RgbColor
} from 'fine-forma-core';

import { RenderingContext } from './rendering-context';

@Component({
    selector: 'fine-forma',
    templateUrl: './fine-forma.component.html',
    styleUrls: ['./fine-forma.component.scss']
})
export class FineFormaComponent implements AfterViewInit {

    @ViewChild('mainCanvas')
    canvas!: ElementRef<HTMLCanvasElement>;

    private readonly _viewer: Viewer;

    constructor() {
        this._viewer = this._createViewer();
    }

    ngAfterViewInit(): void {
        const ctx = this.canvas.nativeElement.getContext('2d')!;
        const context = new RenderingContext(ctx);

        const renderFrame = (time: number) => {
            ctx.resetTransform();
            ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
            this._viewer.renderer.render(context);

            requestAnimationFrame(renderFrame);
        };

        renderFrame(0);
    }

    async onSelectClick(): Promise<void> {
        console.log('select');
        await this._viewer.execute(new Command([], [], [
            new SelectItemAtCommand(0, 0)
        ]));
    }

    async onClearSelectionClick(): Promise<void> {
        console.log('clear');
        await this._viewer.execute(new Command([], [], [
            new ClearSelectionCommand()
        ]));
    }

    async onZoomIn(): Promise<void> {
        await this._viewer.execute(new Command([], [
            new ZoomCommand(1.1)
        ], []));
    }

    async onZoomOut(): Promise<void> {
        await this._viewer.execute(new Command([], [
            new ZoomCommand(0.909)
        ], []));
    }

    async deleteItem(): Promise<void> {
        if (!this._viewer.selection.isSingle)
            return;

        await this._viewer.execute(new Command([
            new RemoveItemCommand(this._viewer.selection.single)
        ], [], [
            new SelectItemAtCommand(0, 0)
        ]));
    }

    async addItem(): Promise<void> {
        const item = createCircle(
            Math.random() * 400 + 100,
            Math.random() * 400 + 100,
            Math.random() * 90 + 10
        )
            .setFill(new SolidBrush(
                new RgbColor(Math.random() * 255, Math.random() * 255, Math.random() * 255, 255)))
            .build();;

        await this._viewer.execute(new Command([
            new AddItemToLayerAtCommand(item, 0)
        ], [], []));
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
                createCircle(200, 300, 100).setFill(Brushes.green()).build()
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