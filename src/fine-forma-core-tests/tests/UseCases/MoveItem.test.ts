import { suite, test } from 'mocha';
import * as chai from 'chai';
import { Canvas, createCanvas } from 'canvas';

import { 
    Brushes,
    Command,
    Design,
    Layer,
    Transform,
    Vector2,
    Viewer, 
    Viewport, 
    ViewportConstraints, 
    createCircle,
    createImage,
    degreeToRadians,
    MoveItemCommand,
    SelectItemCommand,
    SelectItemAtCommand,
    Pen,
    Rectangle,
    Margin
} from 'fine-forma-core';

import { rendererFactory } from './Utils';
import { ImageContentStorageStub } from '../ImageContentStorageStub';
import { TEST_RESOURCES_PATH } from '../Settings';
import { RenderingContextFake } from '../RenderingContextFake';
import { clearCanvas, delay, inputReceiverFactory, loadImage } from '../Utils';

const expect = chai.expect;

suite('UseCase: move item', () => {
    const imageStorage = ImageContentStorageStub.setup(new Map([
        ['sima', `${TEST_RESOURCES_PATH}\\sima.png`]
    ]));

    test('move existing items', async () => {
        const viewer = new Viewer(
            new Design([new Layer([
                createCircle(9, 9, 70)
                    .setFill(Brushes.green())
                    .build(),
                createImage(300, 200, 150, 150, 'sima')
                    .setTransform(Transform.createIdentity().rotate(-32))
                    .build()
            ], 0)]), 
            new Viewport(
                new ViewportConstraints(
                    new Rectangle(new Vector2(-500, -500), new Vector2(500, 500)), 
                    new Margin(0, 0, 0, 0), 
                    0.2, 
                    5,
                    new Vector2(500, 500)),
                new Vector2(0, -100),
                1.5,
                0),
            rendererFactory(await imageStorage, { stroke: new Pen(Brushes.cyan(), 2) }),
            inputReceiverFactory()
        );
        const canvas = createBlankCanvas();
        const ctx = canvas.getContext('2d');
        const context = new RenderingContextFake(ctx);
        
        viewer.renderer.render(context);
        assertSnapshot1(canvas);

        await delay(50);
        await viewer.execute(new Command([], [], [
            new SelectItemCommand(viewer.design.layers.get(0).items.get(0))
        ]));

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot2(canvas);

        await viewer.execute(new Command([
            new MoveItemCommand(viewer.selection.single, new Vector2(250, 155))
        ]));

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot3(canvas);

        await viewer.execute(new Command([], [], [
            new SelectItemCommand(viewer.design.layers.get(0).items.get(1))
        ]));
        await viewer.execute(new Command([
            new MoveItemCommand(viewer.selection.single, new Vector2(-280, 0))
        ], [], [
            new SelectItemAtCommand(0, 1)
        ]));

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot4(canvas);
    }).timeout(2000);

    const createBlankCanvas = (): Canvas => createCanvas(800, 800);

    const assertSnapshot1 = (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(0, 100);
        ctx.scale(1.5, 1.5);

        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.beginPath();
        ctx.ellipse(9, 9, 70, 70, 0, 0, Math.PI);
        ctx.ellipse(9, 9, 70, 70, 0, -Math.PI, 0);
        ctx.fill();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot2 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(0, 100);
        ctx.scale(1.5, 1.5);

        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.beginPath();
        ctx.ellipse(9, 9, 70, 70, 0, 0, Math.PI);
        ctx.ellipse(9, 9, 70, 70, 0, -Math.PI, 0);
        ctx.fill();

        ctx.save();
        ctx.translate(300, 200);
        ctx.rotate(degreeToRadians(-32));
        ctx.drawImage(await loadImage('sima.png'), -75, -75, 150, 150);
        ctx.restore();

        ctx.strokeStyle = 'rgb(0,255,255)';
        ctx.lineWidth = 1.33333333;
        ctx.beginPath();
        ctx.moveTo(-61, -61);
        ctx.lineTo(79, -61);
        ctx.lineTo(79, 79);
        ctx.lineTo(-61, 79);
        ctx.closePath();
        ctx.stroke();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot3 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(0, 100);
        ctx.scale(1.5, 1.5);

        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.beginPath();
        ctx.ellipse(259, 164, 70, 70, 0, 0, Math.PI);
        ctx.ellipse(259, 164, 70, 70, 0, -Math.PI, 0);
        ctx.fill();

        ctx.translate(300, 200);
        ctx.rotate(degreeToRadians(-32));
        ctx.drawImage(await loadImage('sima.png'), -75, -75, 150, 150);

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot4 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(0, 100);
        ctx.scale(1.5, 1.5);

        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.beginPath();
        ctx.ellipse(259, 164, 70, 70, 0, 0, Math.PI);
        ctx.ellipse(259, 164, 70, 70, 0, -Math.PI, 0);
        ctx.fill();

        ctx.translate(20, 200);
        ctx.rotate(degreeToRadians(-32));
        ctx.drawImage(await loadImage('sima.png'), -75, -75, 150, 150);

        ctx.strokeStyle = 'rgb(0,255,255)';
        ctx.lineWidth = 1.33333333;
        ctx.beginPath();
        ctx.moveTo(-75, -75);
        ctx.lineTo(75, -75);
        ctx.lineTo(75, 75);
        ctx.lineTo(-75, 75);
        ctx.closePath();
        ctx.stroke();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }
});