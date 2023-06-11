import { expect } from 'chai';
import { Canvas, Image } from 'canvas';

import { 
    Brushes,
    DesignRenderer, 
    HitTestService, 
    IImageContentStorage, 
    IInputReceiverFactory, 
    IRendererFactory, 
    IRotationGrip, 
    ISelectionStyle, 
    ImageContentProvider, 
    InputReceiver, 
    ItemRendererFactory, 
    LayerRenderer, 
    Pen, 
    RendererFactory, 
    RotationGrip, 
    RotationGripRenderer, 
    RotationInputHandler, 
    SelectionInputHandler, 
    SelectionRenderer, 
    UiRenderer, 
    Viewer,
    ViewportInputHandler,
    arrayEquals
} from 'fine-forma-core';

import { TEST_RESOURCES_PATH } from './Settings';

export function rotationGrip(): IRotationGrip {
    return new RotationGrip(20, 24);
}

export function imageStorageDummy(): IImageContentStorage {
    return {
        getImageContent(storageId: string) {
            throw new Error('Not implemented');
        },
    };
}

export function rendererFactoryWithDummyImageStroage(): IRendererFactory {
    return new RendererFactory(
        new DesignRenderer(
            new LayerRenderer(
                new ItemRendererFactory(
                    new ImageContentProvider(imageStorageDummy())))),
        uiRendererFactory({ stroke: Pen.empty })
    );
}

export function uiRendererFactory(selectionStyle: ISelectionStyle): IRendererFactory {
    return {
        create: (designContext, viewportContext, selectionContext) => new UiRenderer([
            new SelectionRenderer(
                selectionContext,
                viewportContext,
                selectionStyle
            ),
            new RotationGripRenderer(
                selectionContext, 
                viewportContext, 
                { rotationGrip: rotationGrip() },
                { stroke: selectionStyle.stroke, fill: Brushes.white() })
        ])
    };
}

export function inputReceiverFactory(): IInputReceiverFactory {
    return {
        create: executor => new InputReceiver(
            new RotationInputHandler(
                rotationGrip(),
                executor,
                new HitTestService(executor),
                new SelectionInputHandler(
                    new HitTestService(executor),
                    executor,
                    new ViewportInputHandler({ wheelZoomSensitivity: 1, wheelScrollSensitivity: 1 })
                )
            ), 
            executor
        )
    };
}

export function assertViewer(actual: Viewer, expected: Viewer): void {
    expect(actual.design.equals(expected.design)).to.be.true;
    expect(actual.viewport.equals(expected.viewport)).to.be.true;
    expect(arrayEquals(actual.selection.items, expected.selection.items, (a, b) => a.equals(b))).to.be.true;
}

export function delay(milliseconds: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}

export function loadImage(name: string): Promise<Image> {
    return new Promise<Image>((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.onerror = () => reject();
        image.src = `${TEST_RESOURCES_PATH}\\${name}`;
    });
}

export function clearCanvas(canvas: Canvas): void {
    const ctx = canvas.getContext('2d');
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}