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
    degreeToRadians,
    ResizeItemCommand,
    SelectItemAtCommand,
    Margin
} from 'fine-forma-core';

import { rendererFactory } from './Utils';
import { ImageContentStorageStub } from '../ImageContentStorageStub';
import { TEST_RESOURCES_PATH } from '../Settings';
import { RenderingContextFake } from '../RenderingContextFake';
import { clearCanvas, delay, inputReceiverFactory, loadImage } from '../Utils';
import { pathApple } from '../TestPaths';

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
                new ViewportConstraints(
                    new Rectangle(new Vector2(-500, -500), new Vector2(500, 500)), 
                    new Margin(0, 0, 0, 0), 
                    0.2, 
                    5),
                new Vector2(500, 500),
                new Vector2(-100, -100),
                0.9,
                0),
            rendererFactory(await imageStorage, { stroke: new Pen(Brushes.yellow(), 1) }),
            inputReceiverFactory()
        );
        const canvas = createBlankCanvas();
        const ctx = canvas.getContext('2d');
        const context = new RenderingContextFake(ctx);
        
        viewer.renderer.render(context);
        assertSnapshot1(canvas);

        await delay(50);
        await viewer.execute(
            new Command([], [], [
                new SelectItemAtCommand(0, 1)
            ])
        );

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot2(canvas);

        await viewer.execute(
            new Command([
                new ResizeItemCommand(
                    viewer.selection.single, 
                    new Rectangle(new Vector2(-120, -120), new Vector2(120, 120)))
            ], [], [
                new SelectItemAtCommand(0, 0)
            ])
        );

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot3(canvas);

        await viewer.execute(
            new Command([
                new ResizeItemCommand(
                    viewer.selection.single, 
                    new Rectangle(new Vector2(-220.01, -295.6), new Vector2(220, 216.204)))
            ], [], [
                new SelectItemAtCommand(0, 0)
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

        await viewer.execute(
            new Command([
                new ResizeItemCommand(
                    viewer.design.layers.get(1).items.get(0), 
                    new Rectangle(new Vector2(-80, -80), new Vector2(-160, 80)))
            ])
        );

        clearCanvas(canvas);
        viewer.renderer.render(context);
        await assertSnapshot7(canvas);
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

        ctx.save();
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(32));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.strokeStyle = 'rgb(255,255,0)';
        ctx.lineWidth = 1;
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

        ctx.save();
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(32));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 160, 160);
        ctx.restore();

        ctx.strokeStyle = 'rgb(255,255,0)';
        ctx.lineWidth = 1;
        ctx.translate(250, 250);
        ctx.beginPath();
        ctx.moveTo(-110.005, -147.8);
        ctx.lineTo(110, -147.8);
        ctx.lineTo(110, 108.102);
        ctx.lineTo(-110.005, 108.102);
        ctx.closePath();
        ctx.stroke();

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
        ctx.moveTo(220, 79.998944);
        ctx.bezierCurveTo(208.000041, 106.598870, 202.200061, 118.598836, 186.800113, 141.998771);
        ctx.bezierCurveTo(165.200186, 174.798678, 134.800290, 215.798563, 97.000419, 216.198562);
        ctx.bezierCurveTo(63.400533, 216.598561, 54.800562, 194.398623, 9.400717, 194.598623);
        ctx.bezierCurveTo(-35.999129, 194.798622, -45.599096, 216.598561, -79.198982, 216.198562);
        ctx.bezierCurveTo(-116.998853, 215.798563, -145.798755, 178.798667, -167.398682, 145.998759);
        ctx.bezierCurveTo(-227.798476, 53.999018, -234.198454, -53.800679, -196.798582, -111.200518);
        ctx.bezierCurveTo(-170.398672, -152.000403, -128.598814, -175.800337, -89.198948, -175.800337);
        ctx.bezierCurveTo(-49.199084, -175.800337, -24.199169, -153.800398, 9.000718, -153.800398);
        ctx.bezierCurveTo(41.000609, -153.800398, 60.600542, -175.800337, 106.800385, -175.800337);
        ctx.bezierCurveTo(141.800266, -175.800337, 178.800140, -156.800390, 205.200050, -123.800483);
        ctx.bezierCurveTo(118.600345, -76.400616, 132.600297, 46.999037, 220.000000, 79.998945);
        ctx.lineTo(220.000000, 79.998945);
        ctx.moveTo(71.600504, -212.400233);
        ctx.bezierCurveTo(88.400448, -234.000173, 101.200404, -264.400088, 96.600420, -295.600000);
        ctx.bezierCurveTo(69.200513, -293.800005, 37.000623, -276.200055, 18.400686, -253.400119);
        ctx.bezierCurveTo(1.400744, -232.800176, -12.599209, -202.200262, -7.199227, -172.400346);
        ctx.bezierCurveTo(22.600672, -171.400349, 53.600566, -189.400298, 71.600505, -212.400234);
        ctx.lineTo(71.600505, -212.400234);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(-32));
        ctx.drawImage(await loadImage('sima.png'), -120, -120, 240, 240);
        ctx.restore();

        ctx.save();
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(32));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 160, 160);
        ctx.restore();
        
        ctx.save();
        ctx.strokeStyle = 'rgb(255,255,0)';
        ctx.lineWidth = 1;
        ctx.translate(250, 250);
        ctx.beginPath();
        ctx.moveTo(-220.01, -295.6);
        ctx.lineTo(220, -295.6);
        ctx.lineTo(220, 216.204);
        ctx.lineTo(-220.01, 216.204);
        ctx.closePath();
        ctx.stroke();
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
        ctx.moveTo(220, 79.998944);
        ctx.bezierCurveTo(208.000041, 106.598870, 202.200061, 118.598836, 186.800113, 141.998771);
        ctx.bezierCurveTo(165.200186, 174.798678, 134.800290, 215.798563, 97.000419, 216.198562);
        ctx.bezierCurveTo(63.400533, 216.598561, 54.800562, 194.398623, 9.400717, 194.598623);
        ctx.bezierCurveTo(-35.999129, 194.798622, -45.599096, 216.598561, -79.198982, 216.198562);
        ctx.bezierCurveTo(-116.998853, 215.798563, -145.798755, 178.798667, -167.398682, 145.998759);
        ctx.bezierCurveTo(-227.798476, 53.999018, -234.198454, -53.800679, -196.798582, -111.200518);
        ctx.bezierCurveTo(-170.398672, -152.000403, -128.598814, -175.800337, -89.198948, -175.800337);
        ctx.bezierCurveTo(-49.199084, -175.800337, -24.199169, -153.800398, 9.000718, -153.800398);
        ctx.bezierCurveTo(41.000609, -153.800398, 60.600542, -175.800337, 106.800385, -175.800337);
        ctx.bezierCurveTo(141.800266, -175.800337, 178.800140, -156.800390, 205.200050, -123.800483);
        ctx.bezierCurveTo(118.600345, -76.400616, 132.600297, 46.999037, 220.000000, 79.998945);
        ctx.lineTo(220.000000, 79.998945);
        ctx.moveTo(71.600504, -212.400233);
        ctx.bezierCurveTo(88.400448, -234.000173, 101.200404, -264.400088, 96.600420, -295.600000);
        ctx.bezierCurveTo(69.200513, -293.800005, 37.000623, -276.200055, 18.400686, -253.400119);
        ctx.bezierCurveTo(1.400744, -232.800176, -12.599209, -202.200262, -7.199227, -172.400346);
        ctx.bezierCurveTo(22.600672, -171.400349, 53.600566, -189.400298, 71.600505, -212.400234);
        ctx.lineTo(71.600505, -212.400234);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(-32));
        ctx.drawImage(await loadImage('sima.png'), -120, -120, 240, 240);
        ctx.restore();

        ctx.save();
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(32));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 240, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(255,255,0)';
        ctx.lineWidth = 1;
        ctx.translate(250, 250);
        ctx.beginPath();
        ctx.moveTo(-220.01, -295.6);
        ctx.lineTo(220, -295.6);
        ctx.lineTo(220, 216.204);
        ctx.lineTo(-220.01, 216.204);
        ctx.closePath();
        ctx.stroke();
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
        ctx.moveTo(220, 79.998944);
        ctx.bezierCurveTo(208.000041, 106.598870, 202.200061, 118.598836, 186.800113, 141.998771);
        ctx.bezierCurveTo(165.200186, 174.798678, 134.800290, 215.798563, 97.000419, 216.198562);
        ctx.bezierCurveTo(63.400533, 216.598561, 54.800562, 194.398623, 9.400717, 194.598623);
        ctx.bezierCurveTo(-35.999129, 194.798622, -45.599096, 216.598561, -79.198982, 216.198562);
        ctx.bezierCurveTo(-116.998853, 215.798563, -145.798755, 178.798667, -167.398682, 145.998759);
        ctx.bezierCurveTo(-227.798476, 53.999018, -234.198454, -53.800679, -196.798582, -111.200518);
        ctx.bezierCurveTo(-170.398672, -152.000403, -128.598814, -175.800337, -89.198948, -175.800337);
        ctx.bezierCurveTo(-49.199084, -175.800337, -24.199169, -153.800398, 9.000718, -153.800398);
        ctx.bezierCurveTo(41.000609, -153.800398, 60.600542, -175.800337, 106.800385, -175.800337);
        ctx.bezierCurveTo(141.800266, -175.800337, 178.800140, -156.800390, 205.200050, -123.800483);
        ctx.bezierCurveTo(118.600345, -76.400616, 132.600297, 46.999037, 220.000000, 79.998945);
        ctx.lineTo(220.000000, 79.998945);
        ctx.moveTo(71.600504, -212.400233);
        ctx.bezierCurveTo(88.400448, -234.000173, 101.200404, -264.400088, 96.600420, -295.600000);
        ctx.bezierCurveTo(69.200513, -293.800005, 37.000623, -276.200055, 18.400686, -253.400119);
        ctx.bezierCurveTo(1.400744, -232.800176, -12.599209, -202.200262, -7.199227, -172.400346);
        ctx.bezierCurveTo(22.600672, -171.400349, 53.600566, -189.400298, 71.600505, -212.400234);
        ctx.lineTo(71.600505, -212.400234);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(-32));
        ctx.drawImage(await loadImage('sima.png'), -120, -40, 240, 80);
        ctx.restore();

        ctx.save();
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(32));
        ctx.drawImage(await loadImage('masyunya2.png'), -80, -80, 240, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(255,255,0)';
        ctx.lineWidth = 1;
        ctx.translate(250, 250);
        ctx.beginPath();
        ctx.moveTo(-220.01, -295.6);
        ctx.lineTo(220, -295.6);
        ctx.lineTo(220, 216.204);
        ctx.lineTo(-220.01, 216.204);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }

    const assertSnapshot7 = async (actual: Canvas) => {
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
        ctx.moveTo(220, 79.998944);
        ctx.bezierCurveTo(208.000041, 106.598870, 202.200061, 118.598836, 186.800113, 141.998771);
        ctx.bezierCurveTo(165.200186, 174.798678, 134.800290, 215.798563, 97.000419, 216.198562);
        ctx.bezierCurveTo(63.400533, 216.598561, 54.800562, 194.398623, 9.400717, 194.598623);
        ctx.bezierCurveTo(-35.999129, 194.798622, -45.599096, 216.598561, -79.198982, 216.198562);
        ctx.bezierCurveTo(-116.998853, 215.798563, -145.798755, 178.798667, -167.398682, 145.998759);
        ctx.bezierCurveTo(-227.798476, 53.999018, -234.198454, -53.800679, -196.798582, -111.200518);
        ctx.bezierCurveTo(-170.398672, -152.000403, -128.598814, -175.800337, -89.198948, -175.800337);
        ctx.bezierCurveTo(-49.199084, -175.800337, -24.199169, -153.800398, 9.000718, -153.800398);
        ctx.bezierCurveTo(41.000609, -153.800398, 60.600542, -175.800337, 106.800385, -175.800337);
        ctx.bezierCurveTo(141.800266, -175.800337, 178.800140, -156.800390, 205.200050, -123.800483);
        ctx.bezierCurveTo(118.600345, -76.400616, 132.600297, 46.999037, 220.000000, 79.998945);
        ctx.lineTo(220.000000, 79.998945);
        ctx.moveTo(71.600504, -212.400233);
        ctx.bezierCurveTo(88.400448, -234.000173, 101.200404, -264.400088, 96.600420, -295.600000);
        ctx.bezierCurveTo(69.200513, -293.800005, 37.000623, -276.200055, 18.400686, -253.400119);
        ctx.bezierCurveTo(1.400744, -232.800176, -12.599209, -202.200262, -7.199227, -172.400346);
        ctx.bezierCurveTo(22.600672, -171.400349, 53.600566, -189.400298, 71.600505, -212.400234);
        ctx.lineTo(71.600505, -212.400234);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.translate(500, 400);
        ctx.rotate(degreeToRadians(-32));
        ctx.drawImage(await loadImage('sima.png'), -120, -40, 240, 80);
        ctx.restore();

        ctx.save();
        ctx.translate(100, 300);
        ctx.rotate(degreeToRadians(32));
        ctx.drawImage(await loadImage('masyunya2.png'), -160, -80, 80, 160);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgb(255,255,0)';
        ctx.lineWidth = 1;
        ctx.translate(250, 250);
        ctx.beginPath();
        ctx.moveTo(-220.01, -295.6);
        ctx.lineTo(220, -295.6);
        ctx.lineTo(220, 216.204);
        ctx.lineTo(-220.01, 216.204);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        expect(actual.toDataURL()).to.be.equal(expected.toDataURL());
    }
});