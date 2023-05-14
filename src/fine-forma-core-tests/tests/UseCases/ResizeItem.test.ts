import { suite, test } from 'mocha';
import * as chai from 'chai';
import { Canvas, createCanvas } from 'canvas';

import { 
    Brushes,
    ClosedShapeItem,
    ClosedShapeStyle,
    Command,
    Design,
    Layer,
    PathControls,
    Pen,
    Rectangle,
    Transform,
    Vector2,
    Viewer, 
    Viewport, 
    ViewportConstraints,
    createImage,
    degreeToRadians
} from 'fine-forma-core';

import { rendererFactory } from './Utils';
import { ImageContentStorageStub } from '../ImageContentStorageStub';
import { TEST_RESOURCES_PATH } from '../Settings';
import { RenderingContextFake } from '../RenderingContextFake';
import { clearCanvas, delay, loadImage } from '../Utils';
import { pathApple } from '../TestPaths';
import { ResizeItemCommand } from '../../../fine-forma-core/src/Commands/Design/Items/ResizeItemCommand';

const expect = chai.expect;

suite('UseCase: resize item', () => {
    const imageStorage = ImageContentStorageStub.setup(new Map([
        ['sima', `${TEST_RESOURCES_PATH}\\sima.png`],
        ['masyunya2', `${TEST_RESOURCES_PATH}\\masyunya2.png`]
    ]));

    test('resize existing items', async () => {
        const viewer = new Viewer(
            new Design([
                new Layer([
                    new ClosedShapeItem(
                        new Vector2(250, 250),
                        Transform.createIdentity(),
                        new PathControls(pathApple()),
                        new ClosedShapeStyle(new Pen(Brushes.black(), 2), Brushes.red())
                    ),
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
                new ViewportConstraints(new Vector2(-500, -500), new Vector2(500, 500), 0.2, 5),
                new Vector2(-100, -100),
                0.9,
                0),
            rendererFactory(await imageStorage)
        );
        const canvas = createBlankCanvas();
        const ctx = canvas.getContext('2d');
        const context = new RenderingContextFake(ctx);
        
        viewer.renderer.render(context);
        assertSnapshot1(canvas);

        await delay(50);

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot2(canvas);

        await viewer.execute(
            new Command([
                new ResizeItemCommand(
                    viewer.design.layers.get(0).items.get(1), 
                    new Rectangle(new Vector2(-120, -120), new Vector2(120, 120)))
            ])
        );

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot3(canvas);

        await viewer.execute(
            new Command([
                new ResizeItemCommand(
                    viewer.design.layers.get(0).items.get(0), 
                    new Rectangle(new Vector2(-220.01, -295.6), new Vector2(220, 216.204)))
            ])
        );

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot4(canvas);

        await viewer.execute(
            new Command([
                new ResizeItemCommand(
                    viewer.design.layers.get(1).items.get(0), 
                    new Rectangle(new Vector2(-80, -80), new Vector2(160, 80)))
            ])
        );

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot5(canvas);

        await viewer.execute(
            new Command([
                new ResizeItemCommand(
                    viewer.design.layers.get(0).items.get(1), 
                    new Rectangle(new Vector2(-120, -40), new Vector2(120, 40)))
            ])
        );

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot6(canvas);
    }).timeout(1000);

    const createBlankCanvas = (): Canvas => createCanvas(800, 800);

    const assertSnapshot1 = (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(0.9, 0.9);

        ctx.translate(250, 250);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(110, 40);
        ctx.bezierCurveTo(104, 53.3, 101.1, 59.3, 93.4, 71);
        ctx.bezierCurveTo(82.6, 87.4, 67.4, 107.9, 48.5, 108.1);
        ctx.bezierCurveTo(31.7, 108.3, 27.4, 97.2, 4.7, 97.3);
        ctx.bezierCurveTo(-18, 97.4, -22.8, 108.3, -39.6, 108.1);
        ctx.bezierCurveTo(-58.5, 107.9, -72.9, 89.4, -83.7, 73);
        ctx.bezierCurveTo(-113.9, 27, -117.1, -26.9, -98.4, -55.6);
        ctx.bezierCurveTo(-85.2, -76, -64.3, -87.9, -44.6, -87.9);
        ctx.bezierCurveTo(-24.6, -87.9, -12.1, -76.9, 4.5, -76.9);
        ctx.bezierCurveTo(20.5, -76.9, 30.3, -87.9, 53.4, -87.9);
        ctx.bezierCurveTo(70.9, -87.9, 89.4, -78.4, 102.6, -61.9);
        ctx.bezierCurveTo(59.3, -38.2, 66.3, 23.5, 110, 40);
        ctx.lineTo(110, 40);
        ctx.moveTo(35.8, -106.2);
        ctx.bezierCurveTo(44.2, -117, 50.6, -132.2, 48.3, -147.8);
        ctx.bezierCurveTo(34.6, -146.9, 18.5, -138.1, 9.2, -126.7);
        ctx.bezierCurveTo(0.7, -116.4, -6.3, -101.1, -3.6, -86.2);
        ctx.bezierCurveTo(11.3, -85.7, 26.8, -94.7, 35.8, -106.2);
        ctx.lineTo(35.8, -106.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot2 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(0.9, 0.9);

        ctx.save();
        ctx.translate(250, 250);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(110, 40);
        ctx.bezierCurveTo(104, 53.3, 101.1, 59.3, 93.4, 71);
        ctx.bezierCurveTo(82.6, 87.4, 67.4, 107.9, 48.5, 108.1);
        ctx.bezierCurveTo(31.7, 108.3, 27.4, 97.2, 4.7, 97.3);
        ctx.bezierCurveTo(-18, 97.4, -22.8, 108.3, -39.6, 108.1);
        ctx.bezierCurveTo(-58.5, 107.9, -72.9, 89.4, -83.7, 73);
        ctx.bezierCurveTo(-113.9, 27, -117.1, -26.9, -98.4, -55.6);
        ctx.bezierCurveTo(-85.2, -76, -64.3, -87.9, -44.6, -87.9);
        ctx.bezierCurveTo(-24.6, -87.9, -12.1, -76.9, 4.5, -76.9);
        ctx.bezierCurveTo(20.5, -76.9, 30.3, -87.9, 53.4, -87.9);
        ctx.bezierCurveTo(70.9, -87.9, 89.4, -78.4, 102.6, -61.9);
        ctx.bezierCurveTo(59.3, -38.2, 66.3, 23.5, 110, 40);
        ctx.lineTo(110, 40);
        ctx.moveTo(35.8, -106.2);
        ctx.bezierCurveTo(44.2, -117, 50.6, -132.2, 48.3, -147.8);
        ctx.bezierCurveTo(34.6, -146.9, 18.5, -138.1, 9.2, -126.7);
        ctx.bezierCurveTo(0.7, -116.4, -6.3, -101.1, -3.6, -86.2);
        ctx.bezierCurveTo(11.3, -85.7, 26.8, -94.7, 35.8, -106.2);
        ctx.lineTo(35.8, -106.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(-32));
        ctx.drawImage(await loadImage('sima.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(32));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 160, 160);
        ctx.restore();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot3 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(0.9, 0.9);

        ctx.save();
        ctx.translate(250, 250);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(110, 40);
        ctx.bezierCurveTo(104, 53.3, 101.1, 59.3, 93.4, 71);
        ctx.bezierCurveTo(82.6, 87.4, 67.4, 107.9, 48.5, 108.1);
        ctx.bezierCurveTo(31.7, 108.3, 27.4, 97.2, 4.7, 97.3);
        ctx.bezierCurveTo(-18, 97.4, -22.8, 108.3, -39.6, 108.1);
        ctx.bezierCurveTo(-58.5, 107.9, -72.9, 89.4, -83.7, 73);
        ctx.bezierCurveTo(-113.9, 27, -117.1, -26.9, -98.4, -55.6);
        ctx.bezierCurveTo(-85.2, -76, -64.3, -87.9, -44.6, -87.9);
        ctx.bezierCurveTo(-24.6, -87.9, -12.1, -76.9, 4.5, -76.9);
        ctx.bezierCurveTo(20.5, -76.9, 30.3, -87.9, 53.4, -87.9);
        ctx.bezierCurveTo(70.9, -87.9, 89.4, -78.4, 102.6, -61.9);
        ctx.bezierCurveTo(59.3, -38.2, 66.3, 23.5, 110, 40);
        ctx.lineTo(110, 40);
        ctx.moveTo(35.8, -106.2);
        ctx.bezierCurveTo(44.2, -117, 50.6, -132.2, 48.3, -147.8);
        ctx.bezierCurveTo(34.6, -146.9, 18.5, -138.1, 9.2, -126.7);
        ctx.bezierCurveTo(0.7, -116.4, -6.3, -101.1, -3.6, -86.2);
        ctx.bezierCurveTo(11.3, -85.7, 26.8, -94.7, 35.8, -106.2);
        ctx.lineTo(35.8, -106.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(-32));
        ctx.drawImage(await loadImage('sima.png'), -120, -120, 240, 240);
        ctx.restore();

        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(32));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 160, 160);
        ctx.restore();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot4 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(0.9, 0.9);

        ctx.save();
        ctx.translate(250, 250);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(220, 80);
        ctx.bezierCurveTo(208, 106.6, 202.2, 118.6, 186.8, 142);
        ctx.bezierCurveTo(165.2, 174.8, 134.8, 215.8, 97, 216.2);
        ctx.bezierCurveTo(63.4, 216.6, 54.8, 194.4, 9.4, 194.6);
        ctx.bezierCurveTo(-36, 194.8, -45.6, 216.6, -79.2, 216.2);
        ctx.bezierCurveTo(-117, 215.8, -145.8, 178.8, -167.4, 146);
        ctx.bezierCurveTo(-227.8, 54, -234.2, -53.8, -196.8, -111.2);
        ctx.bezierCurveTo(-170.4, -152, -128.6, -175.8, -89.2, -175.8);
        ctx.bezierCurveTo(-49.2, -175.8, -24.2, -153.8, 9, -153.8);
        ctx.bezierCurveTo(41, -153.8, 60.6, -175.8, 106.8, -175.8);
        ctx.bezierCurveTo(141.8, -175.8, 178.8, -156.8, 205.2, -123.8);
        ctx.bezierCurveTo(118.6, -76.4, 132.6, 47, 220, 80);
        ctx.lineTo(220, 80);
        ctx.moveTo(71.6, -212.4);
        ctx.bezierCurveTo(88.4, -234, 101.2, -264.4, 96.6, -295.6);
        ctx.bezierCurveTo(69.2, -293.8, 37, -276.2, 18.4, -253.4);
        ctx.bezierCurveTo(1.4, -232.8, -12.6, -202.2, -7.2, -172.4);
        ctx.bezierCurveTo(22.6, -171.4, 53.6, -189.4, 71.6, -212.4);
        ctx.lineTo(71.6, -212.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(-32));
        ctx.drawImage(await loadImage('sima.png'), -120, -120, 240, 240);
        ctx.restore();

        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(32));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 160, 160);
        ctx.restore();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot5 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(0.9, 0.9);

        ctx.save();
        ctx.translate(250, 250);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(220, 80);
        ctx.bezierCurveTo(208, 106.6, 202.2, 118.6, 186.8, 142);
        ctx.bezierCurveTo(165.2, 174.8, 134.8, 215.8, 97, 216.2);
        ctx.bezierCurveTo(63.4, 216.6, 54.8, 194.4, 9.4, 194.6);
        ctx.bezierCurveTo(-36, 194.8, -45.6, 216.6, -79.2, 216.2);
        ctx.bezierCurveTo(-117, 215.8, -145.8, 178.8, -167.4, 146);
        ctx.bezierCurveTo(-227.8, 54, -234.2, -53.8, -196.8, -111.2);
        ctx.bezierCurveTo(-170.4, -152, -128.6, -175.8, -89.2, -175.8);
        ctx.bezierCurveTo(-49.2, -175.8, -24.2, -153.8, 9, -153.8);
        ctx.bezierCurveTo(41, -153.8, 60.6, -175.8, 106.8, -175.8);
        ctx.bezierCurveTo(141.8, -175.8, 178.8, -156.8, 205.2, -123.8);
        ctx.bezierCurveTo(118.6, -76.4, 132.6, 47, 220, 80);
        ctx.lineTo(220, 80);
        ctx.moveTo(71.6, -212.4);
        ctx.bezierCurveTo(88.4, -234, 101.2, -264.4, 96.6, -295.6);
        ctx.bezierCurveTo(69.2, -293.8, 37, -276.2, 18.4, -253.4);
        ctx.bezierCurveTo(1.4, -232.8, -12.6, -202.2, -7.2, -172.4);
        ctx.bezierCurveTo(22.6, -171.4, 53.6, -189.4, 71.6, -212.4);
        ctx.lineTo(71.6, -212.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(-32));
        ctx.drawImage(await loadImage('sima.png'), -120, -120, 240, 240);
        ctx.restore();

        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(32));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 240, 160);
        ctx.restore();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot6 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(0.9, 0.9);

        ctx.save();
        ctx.translate(250, 250);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(220, 80);
        ctx.bezierCurveTo(208, 106.6, 202.2, 118.6, 186.8, 142);
        ctx.bezierCurveTo(165.2, 174.8, 134.8, 215.8, 97, 216.2);
        ctx.bezierCurveTo(63.4, 216.6, 54.8, 194.4, 9.4, 194.6);
        ctx.bezierCurveTo(-36, 194.8, -45.6, 216.6, -79.2, 216.2);
        ctx.bezierCurveTo(-117, 215.8, -145.8, 178.8, -167.4, 146);
        ctx.bezierCurveTo(-227.8, 54, -234.2, -53.8, -196.8, -111.2);
        ctx.bezierCurveTo(-170.4, -152, -128.6, -175.8, -89.2, -175.8);
        ctx.bezierCurveTo(-49.2, -175.8, -24.2, -153.8, 9, -153.8);
        ctx.bezierCurveTo(41, -153.8, 60.6, -175.8, 106.8, -175.8);
        ctx.bezierCurveTo(141.8, -175.8, 178.8, -156.8, 205.2, -123.8);
        ctx.bezierCurveTo(118.6, -76.4, 132.6, 47, 220, 80);
        ctx.lineTo(220, 80);
        ctx.moveTo(71.6, -212.4);
        ctx.bezierCurveTo(88.4, -234, 101.2, -264.4, 96.6, -295.6);
        ctx.bezierCurveTo(69.2, -293.8, 37, -276.2, 18.4, -253.4);
        ctx.bezierCurveTo(1.4, -232.8, -12.6, -202.2, -7.2, -172.4);
        ctx.bezierCurveTo(22.6, -171.4, 53.6, -189.4, 71.6, -212.4);
        ctx.lineTo(71.6, -212.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(-32));
        ctx.drawImage(await loadImage('sima.png'), -120, -40, 120, 40);
        ctx.restore();

        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(32));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 240, 160);
        ctx.restore();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }
});