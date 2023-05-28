import { suite, test } from 'mocha';
import * as chai from 'chai';
import { Canvas, createCanvas } from 'canvas';

import { 
    Brushes,
    Command,
    Design,
    Layer,
    Margin,
    Pen,
    Rectangle,
    RotateItemCommand,
    SelectItemAtCommand,
    SelectItemCommand,
    Transform,
    Vector2,
    Viewer, 
    Viewport, 
    ViewportConstraints,
    createEllipse,
    createImage,
    degreeToRadians
} from 'fine-forma-core';

import { rendererFactory } from './Utils';
import { ImageContentStorageStub } from '../ImageContentStorageStub';
import { TEST_RESOURCES_PATH } from '../Settings';
import { RenderingContextFake } from '../RenderingContextFake';
import { clearCanvas, delay, inputReceiverFactory, loadImage } from '../Utils';

const expect = chai.expect;

suite('UseCase: rotate item', () => {
    const imageStorage = ImageContentStorageStub.setup(new Map([
        ['sima', `${TEST_RESOURCES_PATH}\\sima.png`],
        ['masyunya2', `${TEST_RESOURCES_PATH}\\masyunya2.png`]
    ]));

    test('rotate existing items', async () => {
        const viewer = new Viewer(
            new Design([
                new Layer([
                    createEllipse(9, 9, 70, 100)
                        .setFill(Brushes.green())
                        .build(),
                    createImage(500, 400, 160, 160, 'sima')
                        .setTransform(Transform.createIdentity().rotate(-32))
                        .build()
                ], 0),
                new Layer([
                    createImage(100, 300, 160, 160, 'masyunya2')
                        .setTransform(Transform.createIdentity().rotate(32))
                        .build()
                ], 1)
            ]), 
            new Viewport(
                new ViewportConstraints(
                    new Rectangle(new Vector2(-500, -500), new Vector2(500, 500)), 
                    new Margin(0, 0, 0, 0), 
                    0.2, 
                    5,
                    new Vector2(500, 500)),
                new Vector2(-100, -100),
                1.2,
                0),
            rendererFactory(await imageStorage, { stroke: new Pen(Brushes.blue(), 3) }),
            inputReceiverFactory()
        );
        const canvas = createBlankCanvas();
        const ctx = canvas.getContext('2d');
        const context = new RenderingContextFake(ctx);
        
        viewer.renderer.render(context);
        assertSnapshot1(canvas);

        await delay(50);
        await viewer.execute(new Command([], [], [
            new SelectItemAtCommand(0, 1)
        ]));

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot2(canvas);

        await viewer.execute(new Command([
            new RotateItemCommand(viewer.selection.single, 60)
        ], [], [
            new SelectItemAtCommand(0, 1)
        ]));

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot3(canvas);

        await viewer.execute(new Command([], [], [
            new SelectItemCommand(viewer.design.layers.get(1).items.get(0))
        ]));
        await viewer.execute(new Command([
            new RotateItemCommand(viewer.selection.single, 55)
        ], [], [
            new SelectItemAtCommand(1, 0)
        ]));

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot4(canvas);

        await viewer.execute(new Command([], [], [
            new SelectItemCommand(viewer.design.layers.get(0).items.get(0))
        ]));
        await viewer.execute(new Command([
            new RotateItemCommand(viewer.selection.single, 111)
        ], [], [
            new SelectItemAtCommand(0, 0)
        ]));

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot5(canvas);

        await viewer.execute(new Command([
            new RotateItemCommand(viewer.design.layers.get(0).items.get(1), -66)
        ], [], [
            new SelectItemAtCommand(0, 1)
        ]));

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot6(canvas);
    }).timeout(2000);

    const createBlankCanvas = (): Canvas => createCanvas(800, 800);

    const assertSnapshot1 = (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(1.2, 1.2);

        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.beginPath();
        ctx.ellipse(9, 9, 35, 50, 0, 0, Math.PI);
        ctx.ellipse(9, 9, 35, 50, 0, -Math.PI, 0);
        ctx.fill();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot2 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(1.2, 1.2);

        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.beginPath();
        ctx.ellipse(9, 9, 35, 50, 0, 0, Math.PI);
        ctx.ellipse(9, 9, 35, 50, 0, -Math.PI, 0);
        ctx.fill();

        ctx.save();
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(-32));
        ctx.drawImage(await loadImage('sima.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.save();
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(32));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.strokeStyle = 'rgb(0,0,255)';
        ctx.lineWidth = 3;
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(-32));
        ctx.beginPath();
        ctx.moveTo(-80, -80);
        ctx.lineTo(80, -80);
        ctx.lineTo(80, 80);
        ctx.lineTo(-80, 80);
        ctx.closePath();
        ctx.stroke();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot3 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(1.2, 1.2);

        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.beginPath();
        ctx.ellipse(9, 9, 35, 50, 0, 0, Math.PI);
        ctx.ellipse(9, 9, 35, 50, 0, -Math.PI, 0);
        ctx.fill();

        ctx.save();
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(28));
        ctx.drawImage(await loadImage('sima.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.save();
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(32));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.strokeStyle = 'rgb(0,0,255)';
        ctx.lineWidth = 3;
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(28));
        ctx.beginPath();
        ctx.moveTo(-80, -80);
        ctx.lineTo(80, -80);
        ctx.lineTo(80, 80);
        ctx.lineTo(-80, 80);
        ctx.closePath();
        ctx.stroke();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot4 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(1.2, 1.2);

        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.beginPath();
        ctx.ellipse(9, 9, 35, 50, 0, 0, Math.PI);
        ctx.ellipse(9, 9, 35, 50, 0, -Math.PI, 0);
        ctx.fill();

        ctx.save();
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(28));
        ctx.drawImage(await loadImage('sima.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.save();
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(87));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.strokeStyle = 'rgb(0,0,255)';
        ctx.lineWidth = 3;
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(87));
        ctx.beginPath();
        ctx.moveTo(-80, -80);
        ctx.lineTo(80, -80);
        ctx.lineTo(80, 80);
        ctx.lineTo(-80, 80);
        ctx.closePath();
        ctx.stroke();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot5 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(1.2, 1.2);

        ctx.save()
        ctx.translate(9, 9);
        ctx.rotate(degreeToRadians(111));
        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 35, 50, 0, 0, Math.PI);
        ctx.ellipse(0, 0, 35, 50, 0, -Math.PI, 0);
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(28));
        ctx.drawImage(await loadImage('sima.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.save();
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(87));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.strokeStyle = 'rgb(0,0,255)';
        ctx.lineWidth = 3;
        ctx.translate(9, 9);
        ctx.rotate(degreeToRadians(111));
        ctx.beginPath();
        ctx.moveTo(-35, -50);
        ctx.lineTo(35, -50);
        ctx.lineTo(35, 50);
        ctx.lineTo(-35, 50);
        ctx.closePath();
        ctx.stroke();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot6 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(1.2, 1.2);

        ctx.save()
        ctx.translate(9, 9);
        ctx.rotate(degreeToRadians(111));
        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 35, 50, 0, 0, Math.PI);
        ctx.ellipse(0, 0, 35, 50, 0, -Math.PI, 0);
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(-38));
        ctx.drawImage(await loadImage('sima.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.save();
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(87));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.strokeStyle = 'rgb(0,0,255)';
        ctx.lineWidth = 3;
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(-38));
        ctx.beginPath();
        ctx.moveTo(-80, -80);
        ctx.lineTo(80, -80);
        ctx.lineTo(80, 80);
        ctx.lineTo(-80, 80);
        ctx.closePath();
        ctx.stroke();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }
});