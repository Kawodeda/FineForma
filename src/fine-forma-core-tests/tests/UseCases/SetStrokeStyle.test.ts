import { suite, test } from 'mocha';
import * as chai from 'chai';
import { Canvas, createCanvas } from 'canvas';

import { 
    Brushes,
    ClosedShapeItem,
    ClosedShapeStyle,
    Command,
    CubicBezierSegment,
    Design,
    Layer,
    OpenPath,
    OpenShapeItem,
    OpenShapeStyle,
    PathControls,
    Pen,
    QuadraticBezierSegment,
    Transform,
    Vector2,
    Viewer, 
    Viewport, 
    ViewportConstraints,
    createImage,
    degreeToRadians,
    IItemWithStroke,
    SetStrokeStyleCommand,
    DashSettings
} from 'fine-forma-core';

import { rendererFactory } from './Utils';
import { ImageContentStorageStub } from '../ImageContentStorageStub';
import { TEST_RESOURCES_PATH } from '../Settings';
import { RenderingContextFake } from '../RenderingContextFake';
import { clearCanvas, delay, inputReceiverFactory, loadImage } from '../Utils';
import { pathApple } from '../TestPaths';

const expect = chai.expect;

suite('UseCase: set item stroke style', () => {
    const imageStorage = ImageContentStorageStub.setup(new Map([
        ['sima', `${TEST_RESOURCES_PATH}\\sima.png`],
        ['masyunya2', `${TEST_RESOURCES_PATH}\\masyunya2.png`]
    ]));

    test('set existing items stroke style', async () => {
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
                        .setTransform(Transform.createIdentity().rotate(-62))
                        .build()
                ], 0),
                new Layer([
                    createImage(100, 300, 180, 160, 'masyunya2')
                        .setTransform(Transform.createIdentity().rotate(11))
                        .setBorder(new Pen(Brushes.cyan(), 1))
                        .build(),
                    new OpenShapeItem(
                        new Vector2(400, 500),
                        Transform.createIdentity().rotate(18),
                        new PathControls(new OpenPath([
                            new CubicBezierSegment(new Vector2(0, 0), new Vector2(13, -36), new Vector2(62, 43), new Vector2(53, -11)),
                            new QuadraticBezierSegment(new Vector2(53, -11), new Vector2(46, -54), new Vector2(87, -2)),
                            new QuadraticBezierSegment(new Vector2(87, -2), new Vector2(108, 24), new Vector2(97, -45)),
                            new CubicBezierSegment(new Vector2(97, -45), new Vector2(88, -98), new Vector2(143, -51), new Vector2(148, -73))
                        ])),
                        new OpenShapeStyle(new Pen(Brushes.magenta(), 5))
                )
                ], 1)
            ]), 
            new Viewport(
                new ViewportConstraints(new Vector2(-500, -500), new Vector2(500, 500), 0.2, 5),
                new Vector2(-100, -100),
                1.2,
                0),
            rendererFactory(await imageStorage),
            inputReceiverFactory()
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

        await viewer.execute(new Command([
            new SetStrokeStyleCommand(viewer.design.layers.get(0).items.get(0) as IItemWithStroke, Pen.empty)
        ]));

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot3(canvas);

        await viewer.execute(new Command([
            new SetStrokeStyleCommand(
                viewer.design.layers.get(0).items.get(1) as IItemWithStroke, 
                new Pen(Brushes.green(), 10)
            )
        ]));

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot4(canvas);

        await viewer.execute(new Command([
            new SetStrokeStyleCommand(
                viewer.design.layers.get(1).items.get(1) as IItemWithStroke, 
                new Pen(Brushes.magenta(), 6, new DashSettings([10, 4]))
            )
        ]));

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot5(canvas);

        await viewer.execute(new Command([
            new SetStrokeStyleCommand(
                viewer.design.layers.get(0).items.get(0) as IItemWithStroke, 
                new Pen(Brushes.blue(), 3, new DashSettings([4, 8]))
            )
        ]));

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot6(canvas);

        await viewer.execute(new Command([
            new SetStrokeStyleCommand(
                viewer.design.layers.get(0).items.get(1) as IItemWithStroke, 
                new Pen(Brushes.transparent(), 10)
            )
        ]));

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot7(canvas);
    }).timeout(1000);

    const createBlankCanvas = (): Canvas => createCanvas(800, 800);

    const assertSnapshot1 = (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(1.2, 1.2);

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
        ctx.strokeStyle = 'rgb(0,255,255)';
        ctx.lineWidth = 1;
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(11));
        ctx.beginPath();
        ctx.moveTo(-90, -80);
        ctx.lineTo(90, -80);
        ctx.lineTo(90, 80);
        ctx.lineTo(-90, 80);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(255,0,255)';
        ctx.setLineDash([]);
        ctx.lineWidth = 5;
        ctx.translate(400, 500);
        ctx.rotate(degreeToRadians(18));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
        ctx.quadraticCurveTo(46, -54, 87, -2);
        ctx.quadraticCurveTo(108, 24, 97, -45);
        ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
        ctx.stroke();
        ctx.restore();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot2 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(1.2, 1.2);

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
        ctx.rotate(degreeToRadians(-62));
        ctx.drawImage(await loadImage('sima.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(0,255,255)';
        ctx.lineWidth = 1;
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(11));
        ctx.beginPath();
        ctx.moveTo(-90, -80);
        ctx.lineTo(90, -80);
        ctx.lineTo(90, 80);
        ctx.lineTo(-90, 80);
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(await loadImage('masyunya2.png'), -90, -80, 180, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(255,0,255)';
        ctx.setLineDash([]);
        ctx.lineWidth = 5;
        ctx.translate(400, 500);
        ctx.rotate(degreeToRadians(18));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
        ctx.quadraticCurveTo(46, -54, 87, -2);
        ctx.quadraticCurveTo(108, 24, 97, -45);
        ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
        ctx.stroke();
        ctx.restore();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot3 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(1.2, 1.2);

        ctx.save();
        ctx.translate(250, 250);
        ctx.strokeStyle = 'rgba(0,0,0,0)';
        ctx.lineWidth = 1;
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
        ctx.rotate(degreeToRadians(-62));
        ctx.drawImage(await loadImage('sima.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(0,255,255)';
        ctx.lineWidth = 1;
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(11));
        ctx.beginPath();
        ctx.moveTo(-90, -80);
        ctx.lineTo(90, -80);
        ctx.lineTo(90, 80);
        ctx.lineTo(-90, 80);
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(await loadImage('masyunya2.png'), -90, -80, 180, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(255,0,255)';
        ctx.setLineDash([]);
        ctx.lineWidth = 5;
        ctx.translate(400, 500);
        ctx.rotate(degreeToRadians(18));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
        ctx.quadraticCurveTo(46, -54, 87, -2);
        ctx.quadraticCurveTo(108, 24, 97, -45);
        ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
        ctx.stroke();
        ctx.restore();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot4 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(1.2, 1.2);

        ctx.save();
        ctx.translate(250, 250);
        ctx.strokeStyle = 'rgba(0,0,0,0)';
        ctx.lineWidth = 1;
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
        ctx.rotate(degreeToRadians(-62));
        ctx.strokeStyle = 'rgb(0,255,0)';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(-80, -80);
        ctx.lineTo(80, -80);
        ctx.lineTo(80, 80);
        ctx.lineTo(-80, 80);
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(await loadImage('sima.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(0,255,255)';
        ctx.lineWidth = 1;
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(11));
        ctx.beginPath();
        ctx.moveTo(-90, -80);
        ctx.lineTo(90, -80);
        ctx.lineTo(90, 80);
        ctx.lineTo(-90, 80);
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(await loadImage('masyunya2.png'), -90, -80, 180, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(255,0,255)';
        ctx.setLineDash([]);
        ctx.lineWidth = 5;
        ctx.translate(400, 500);
        ctx.rotate(degreeToRadians(18));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
        ctx.quadraticCurveTo(46, -54, 87, -2);
        ctx.quadraticCurveTo(108, 24, 97, -45);
        ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
        ctx.stroke();
        ctx.restore();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot5 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(1.2, 1.2);

        ctx.save();
        ctx.translate(250, 250);
        ctx.strokeStyle = 'rgba(0,0,0,0)';
        ctx.lineWidth = 1;
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
        ctx.rotate(degreeToRadians(-62));
        ctx.strokeStyle = 'rgb(0,255,0)';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(-80, -80);
        ctx.lineTo(80, -80);
        ctx.lineTo(80, 80);
        ctx.lineTo(-80, 80);
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(await loadImage('sima.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(0,255,255)';
        ctx.lineWidth = 1;
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(11));
        ctx.beginPath();
        ctx.moveTo(-90, -80);
        ctx.lineTo(90, -80);
        ctx.lineTo(90, 80);
        ctx.lineTo(-90, 80);
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(await loadImage('masyunya2.png'), -90, -80, 180, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(255,0,255)';
        ctx.setLineDash([10, 4]);
        ctx.lineWidth = 6;
        ctx.translate(400, 500);
        ctx.rotate(degreeToRadians(18));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
        ctx.quadraticCurveTo(46, -54, 87, -2);
        ctx.quadraticCurveTo(108, 24, 97, -45);
        ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
        ctx.stroke();
        ctx.restore();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot6 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(1.2, 1.2);

        ctx.save();
        ctx.translate(250, 250);
        ctx.strokeStyle = 'rgb(0,0,255)';
        ctx.lineWidth = 3;
        ctx.setLineDash([4, 8]);
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
        ctx.rotate(degreeToRadians(-62));
        ctx.strokeStyle = 'rgb(0,255,0)';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(-80, -80);
        ctx.lineTo(80, -80);
        ctx.lineTo(80, 80);
        ctx.lineTo(-80, 80);
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(await loadImage('sima.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(0,255,255)';
        ctx.lineWidth = 1;
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(11));
        ctx.beginPath();
        ctx.moveTo(-90, -80);
        ctx.lineTo(90, -80);
        ctx.lineTo(90, 80);
        ctx.lineTo(-90, 80);
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(await loadImage('masyunya2.png'), -90, -80, 180, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(255,0,255)';
        ctx.setLineDash([10, 4]);
        ctx.lineWidth = 6;
        ctx.translate(400, 500);
        ctx.rotate(degreeToRadians(18));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
        ctx.quadraticCurveTo(46, -54, 87, -2);
        ctx.quadraticCurveTo(108, 24, 97, -45);
        ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
        ctx.stroke();
        ctx.restore();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot7 = async (actual: Canvas) => {
        const expected = createBlankCanvas();
        const ctx = expected.getContext('2d');

        ctx.translate(100, 100);
        ctx.scale(1.2, 1.2);

        ctx.save();
        ctx.translate(250, 250);
        ctx.strokeStyle = 'rgb(0,0,255)';
        ctx.lineWidth = 3;
        ctx.setLineDash([4, 8]);
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
        ctx.rotate(degreeToRadians(-62));
        ctx.strokeStyle = 'rgba(0,0,0,0)';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(-80, -80);
        ctx.lineTo(80, -80);
        ctx.lineTo(80, 80);
        ctx.lineTo(-80, 80);
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(await loadImage('sima.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(0,255,255)';
        ctx.lineWidth = 1;
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(11));
        ctx.beginPath();
        ctx.moveTo(-90, -80);
        ctx.lineTo(90, -80);
        ctx.lineTo(90, 80);
        ctx.lineTo(-90, 80);
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(await loadImage('masyunya2.png'), -90, -80, 180, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(255,0,255)';
        ctx.setLineDash([10, 4]);
        ctx.lineWidth = 6;
        ctx.translate(400, 500);
        ctx.rotate(degreeToRadians(18));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
        ctx.quadraticCurveTo(46, -54, 87, -2);
        ctx.quadraticCurveTo(108, 24, 97, -45);
        ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
        ctx.stroke();
        ctx.restore();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }
});