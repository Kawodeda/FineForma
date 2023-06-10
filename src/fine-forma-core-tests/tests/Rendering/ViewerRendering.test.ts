import { suite, test } from 'mocha';
import { expect } from 'chai';
import { DOMMatrix, createCanvas } from 'canvas';

import { 
    Design,
    DesignRenderer,
    IImageContentProvider,
    IImageContentStorage,
    ItemRendererFactory,
    Layer,
    LayerRenderer,
    RendererFactory,
    Transform,
    Vector2,
    Viewer, 
    Viewport,
    ViewportConstraints,
    Brushes,
    Pen,
    OpenShapeItem,
    createCircle,
    createImage,
    DashSettings,
    PathControls,
    OpenShapeStyle,
    CubicBezierSegment,
    OpenPath,
    QuadraticBezierSegment,
    degreeToRadians,
    UiRenderer,
    Selection,
    Rectangle,
    Margin
} from 'fine-forma-core';

import { TEST_RESOURCES_PATH } from '../Settings';
import { ImageContentStorageStub } from '../ImageContentStorageStub';
import { setupImageContentProvider } from './Utils';
import { inputReceiverFactory, loadImage } from '../Utils';
import { RenderingContextFake } from '../RenderingContextFake';

suite('Viewer rendering', () => {
    const createBlankCanvas = () => createCanvas(800, 800);
    const createDesignRenderer = () => new DesignRenderer(new LayerRenderer(new ItemRendererFactory(imageContentProvider)));
    const createUiRenderer = () => new UiRenderer({ stroke: new Pen(Brushes.blue(), 2) });
    const images = new Map<string, string>([
        ['masyunya', `${TEST_RESOURCES_PATH}\\masyunya.png`],
        ['ruka', `${TEST_RESOURCES_PATH}\\ruka.png`],
        ['blob', `${TEST_RESOURCES_PATH}\\blob.jpg`],
        ['masyunya2', `${TEST_RESOURCES_PATH}\\masyunya2.png`],
        ['sima', `${TEST_RESOURCES_PATH}\\sima.png`]
    ]);
    let imageStorage: IImageContentStorage;
    let imageContentProvider: IImageContentProvider;

    before(async () => {
        imageStorage = await ImageContentStorageStub.setup(images);
        imageContentProvider = await setupImageContentProvider(imageStorage, images);
    });

    const designs = [
        () => new Design([
            new Layer([
                createCircle(650, 200, 100).setFill(Brushes.green()).build()
            ], 1),
            new Layer([
                createImage(150, 600, 200, 200, 'masyunya')
                    .setTransform(Transform.createIdentity().rotate(61.4))
                    .setBorder(new Pen(Brushes.blue(), 4))
                    .build(),
                createImage(600, 650, 100, 100, 'masyunya2')
                    .setFill(Brushes.white())
                    .setBorder(new Pen(Brushes.red(), 2, new DashSettings([5, 5, 10])))
                    .setTransform(Transform.createIdentity().rotate(-40))
                    .build()
            ], 0),
            new Layer([
                createImage(400, 400, 600, 600, 'sima')
                    .setTransform(Transform.createIdentity())
                    .build()
            ], -1),
            new Layer([
                new OpenShapeItem(
                    new Vector2(400, 600),
                    Transform.createIdentity().rotate(18),
                    new PathControls(new OpenPath([
                        new CubicBezierSegment(new Vector2(0, 0), new Vector2(13, -36), new Vector2(62, 43), new Vector2(53, -11)),
                        new QuadraticBezierSegment(new Vector2(53, -11), new Vector2(46, -54), new Vector2(87, -2)),
                        new QuadraticBezierSegment(new Vector2(87, -2), new Vector2(108, 24), new Vector2(97, -45)),
                        new CubicBezierSegment(new Vector2(97, -45), new Vector2(88, -98), new Vector2(143, -51), new Vector2(148, -73))
                    ])),
                    new OpenShapeStyle(new Pen(Brushes.magenta(), 5))
                )
            ], 2)
        ])
    ];
    const testCases = [
        {
            title: 'blank design',
            viewer: () => new Viewer(
                new Design([]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-1000, -1000), new Vector2(1000, 1000)), 
                        new Margin(0, 0, 0, 0), 
                        0.5, 
                        3,
                        new Vector2(1000, 1000)),
                    new Vector2(0, 0),
                    1,
                    0),
                new RendererFactory(createDesignRenderer(), createUiRenderer()),
                inputReceiverFactory()
            ),
            expected: async () => {
                return createBlankCanvas();
            }
        },
        {
            title: 'blank design, zoomed and scrolled',
            viewer: () => new Viewer(
                new Design([]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-1000, -1000), new Vector2(1000, 1000)), 
                        new Margin(0, 0, 0, 0), 
                        0.5, 
                        3,
                        new Vector2(1000, 1000)),
                    new Vector2(500, 780),
                    2.5,
                    0),
                new RendererFactory(createDesignRenderer(), createUiRenderer()),
                inputReceiverFactory()
            ),
            expected: async () => {
                return createBlankCanvas();
            }
        },
        {
            title: 'shapes and images',
            viewer: () => new Viewer(
                designs[0]!(),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-1000, -1000), new Vector2(1000, 1000)), 
                        new Margin(0, 0, 0, 0), 
                        0.5, 
                        3,
                        new Vector2(1000, 1000)),
                    new Vector2(0, 0),
                    1,
                    0),
                new RendererFactory(createDesignRenderer(), createUiRenderer()),
                inputReceiverFactory()
            ),
            expected: async () => {
                const canvas = createBlankCanvas();
                const ctx = canvas.getContext('2d');

                ctx.setTransform(new DOMMatrix([1, 0, 0, 1, 0, 0]));

                ctx.save();
                ctx.transform(1, 0, 0, 1, 400, 400);
                ctx.drawImage(await loadImage('sima.png'), -300, -300, 600, 600);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(0,0,255)';
                ctx.lineWidth = 4;
                ctx.translate(150, 600);
                ctx.rotate(degreeToRadians(61.4));
                ctx.beginPath();
                ctx.moveTo(-100, -100);
                ctx.lineTo(100, -100);
                ctx.lineTo(100, 100);
                ctx.lineTo(-100, 100);
                ctx.closePath();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya.png'), -100, -100, 200, 200);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.fillStyle = 'rgb(255,255,255)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5, 10]);
                ctx.translate(600, 650);
                ctx.rotate(degreeToRadians(-40));
                ctx.beginPath();
                ctx.moveTo(-50, -50);
                ctx.lineTo(50, -50);
                ctx.lineTo(50, 50);
                ctx.lineTo(-50, 50);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya2.png'), -50, -50, 100, 100);
                ctx.restore();

                ctx.save();
                ctx.fillStyle = 'rgb(0,255,0)';
                ctx.beginPath();
                ctx.ellipse(650, 200, 100, 100, 0, degreeToRadians(180), 0);
                ctx.ellipse(650, 200, 100, 100, 0, 0, -degreeToRadians(180));
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,255)';
                ctx.setLineDash([]);
                ctx.lineWidth = 5;
                ctx.translate(400, 600);
                ctx.rotate(degreeToRadians(18));
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
                ctx.quadraticCurveTo(46, -54, 87, -2);
                ctx.quadraticCurveTo(108, 24, 97, -45);
                ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
                ctx.stroke();
                ctx.restore();

                return canvas;
            }
        },
        {
            title: 'shapes and images, scrolled',
            viewer: () => new Viewer(
                designs[0]!(),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-1000, -1000), new Vector2(1000, 1000)), 
                        new Margin(0, 0, 0, 0), 
                        0.5, 
                        3,
                        new Vector2(800, 800)),
                    new Vector2(200, 150),
                    1,
                    0),
                new RendererFactory(createDesignRenderer(), createUiRenderer()),
                inputReceiverFactory()
            ),
            expected: async () => {
                const canvas = createBlankCanvas();
                const ctx = canvas.getContext('2d');

                ctx.setTransform(new DOMMatrix([1, 0, 0, 1, -200, -150]));

                ctx.save();
                ctx.transform(1, 0, 0, 1, 400, 400);
                ctx.drawImage(await loadImage('sima.png'), -300, -300, 600, 600);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(0,0,255)';
                ctx.lineWidth = 4;
                ctx.translate(150, 600);
                ctx.rotate(degreeToRadians(61.4));
                ctx.beginPath();
                ctx.moveTo(-100, -100);
                ctx.lineTo(100, -100);
                ctx.lineTo(100, 100);
                ctx.lineTo(-100, 100);
                ctx.closePath();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya.png'), -100, -100, 200, 200);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.fillStyle = 'rgb(255,255,255)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5, 10]);
                ctx.translate(600, 650);
                ctx.rotate(degreeToRadians(-40));
                ctx.beginPath();
                ctx.moveTo(-50, -50);
                ctx.lineTo(50, -50);
                ctx.lineTo(50, 50);
                ctx.lineTo(-50, 50);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya2.png'), -50, -50, 100, 100);
                ctx.restore();

                ctx.save();
                ctx.fillStyle = 'rgb(0,255,0)';
                ctx.beginPath();
                ctx.ellipse(650, 200, 100, 100, 0, degreeToRadians(180), 0);
                ctx.ellipse(650, 200, 100, 100, 0, 0, -degreeToRadians(180));
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,255)';
                ctx.setLineDash([]);
                ctx.lineWidth = 5;
                ctx.translate(400, 600);
                ctx.rotate(degreeToRadians(18));
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
                ctx.quadraticCurveTo(46, -54, 87, -2);
                ctx.quadraticCurveTo(108, 24, 97, -45);
                ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
                ctx.stroke();
                ctx.restore();

                return canvas;
            }
        },
        {
            title: 'shapes and images, zoomed in',
            viewer: () => new Viewer(
                designs[0]!(),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-1000, -1000), new Vector2(1000, 1000)), 
                        new Margin(0, 0, 0, 0), 
                        0.5, 
                        3,
                        new Vector2(1000, 1000)),
                    new Vector2(0, 0),
                    1.5,
                    0),
                new RendererFactory(createDesignRenderer(), createUiRenderer()),
                inputReceiverFactory()
            ),
            expected: async () => {
                const canvas = createBlankCanvas();
                const ctx = canvas.getContext('2d');

                ctx.setTransform(new DOMMatrix([1.5, 0, 0, 1.5, 0, 0]));

                ctx.save();
                ctx.transform(1, 0, 0, 1, 400, 400);
                ctx.drawImage(await loadImage('sima.png'), -300, -300, 600, 600);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(0,0,255)';
                ctx.lineWidth = 4;
                ctx.translate(150, 600);
                ctx.rotate(degreeToRadians(61.4));
                ctx.beginPath();
                ctx.moveTo(-100, -100);
                ctx.lineTo(100, -100);
                ctx.lineTo(100, 100);
                ctx.lineTo(-100, 100);
                ctx.closePath();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya.png'), -100, -100, 200, 200);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.fillStyle = 'rgb(255,255,255)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5, 10]);
                ctx.translate(600, 650);
                ctx.rotate(degreeToRadians(-40));
                ctx.beginPath();
                ctx.moveTo(-50, -50);
                ctx.lineTo(50, -50);
                ctx.lineTo(50, 50);
                ctx.lineTo(-50, 50);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya2.png'), -50, -50, 100, 100);
                ctx.restore();

                ctx.save();
                ctx.fillStyle = 'rgb(0,255,0)';
                ctx.beginPath();
                ctx.ellipse(650, 200, 100, 100, 0, degreeToRadians(180), 0);
                ctx.ellipse(650, 200, 100, 100, 0, 0, -degreeToRadians(180));
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,255)';
                ctx.setLineDash([]);
                ctx.lineWidth = 5;
                ctx.translate(400, 600);
                ctx.rotate(degreeToRadians(18));
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
                ctx.quadraticCurveTo(46, -54, 87, -2);
                ctx.quadraticCurveTo(108, 24, 97, -45);
                ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
                ctx.stroke();
                ctx.restore();

                return canvas;
            }
        },
        {
            title: 'shapes and images, zoomed out',
            viewer: () => new Viewer(
                designs[0]!(),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-1000, -1000), new Vector2(1000, 1000)), 
                        new Margin(200, 200, 200, 200), 
                        0.5, 
                        3,
                        new Vector2(800, 800)),
                    new Vector2(0, 0),
                    0.5,
                    0),
                new RendererFactory(createDesignRenderer(), createUiRenderer()),
                inputReceiverFactory()
            ),
            expected: async () => {
                const canvas = createBlankCanvas();
                const ctx = canvas.getContext('2d');

                ctx.setTransform(new DOMMatrix([0.5, 0, 0, 0.5, 0, 0]));

                ctx.save();
                ctx.transform(1, 0, 0, 1, 400, 400);
                ctx.drawImage(await loadImage('sima.png'), -300, -300, 600, 600);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(0,0,255)';
                ctx.lineWidth = 4;
                ctx.translate(150, 600);
                ctx.rotate(degreeToRadians(61.4));
                ctx.beginPath();
                ctx.moveTo(-100, -100);
                ctx.lineTo(100, -100);
                ctx.lineTo(100, 100);
                ctx.lineTo(-100, 100);
                ctx.closePath();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya.png'), -100, -100, 200, 200);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.fillStyle = 'rgb(255,255,255)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5, 10]);
                ctx.translate(600, 650);
                ctx.rotate(degreeToRadians(-40));
                ctx.beginPath();
                ctx.moveTo(-50, -50);
                ctx.lineTo(50, -50);
                ctx.lineTo(50, 50);
                ctx.lineTo(-50, 50);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya2.png'), -50, -50, 100, 100);
                ctx.restore();

                ctx.save();
                ctx.fillStyle = 'rgb(0,255,0)';
                ctx.beginPath();
                ctx.ellipse(650, 200, 100, 100, 0, degreeToRadians(180), 0);
                ctx.ellipse(650, 200, 100, 100, 0, 0, -degreeToRadians(180));
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,255)';
                ctx.setLineDash([]);
                ctx.lineWidth = 5;
                ctx.translate(400, 600);
                ctx.rotate(degreeToRadians(18));
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
                ctx.quadraticCurveTo(46, -54, 87, -2);
                ctx.quadraticCurveTo(108, 24, 97, -45);
                ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
                ctx.stroke();
                ctx.restore();

                return canvas;
            }
        },
        {
            title: 'shapes and images, zoomed in, scrolled',
            viewer: () => new Viewer(
                designs[0]!(),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-1000, -1000), new Vector2(1000, 1000)), 
                        new Margin(0, 0, 0, 0), 
                        0.5, 
                        3,
                        new Vector2(1000, 1000)),
                    new Vector2(100, 200),
                    1.5,
                    0),
                new RendererFactory(createDesignRenderer(), createUiRenderer()),
                inputReceiverFactory()
            ),
            expected: async () => {
                const canvas = createBlankCanvas();
                const ctx = canvas.getContext('2d');

                ctx.setTransform(new DOMMatrix([1.5, 0, 0, 1.5, -100, -200]));

                ctx.save();
                ctx.transform(1, 0, 0, 1, 400, 400);
                ctx.drawImage(await loadImage('sima.png'), -300, -300, 600, 600);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(0,0,255)';
                ctx.lineWidth = 4;
                ctx.translate(150, 600);
                ctx.rotate(degreeToRadians(61.4));
                ctx.beginPath();
                ctx.moveTo(-100, -100);
                ctx.lineTo(100, -100);
                ctx.lineTo(100, 100);
                ctx.lineTo(-100, 100);
                ctx.closePath();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya.png'), -100, -100, 200, 200);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.fillStyle = 'rgb(255,255,255)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5, 10]);
                ctx.translate(600, 650);
                ctx.rotate(degreeToRadians(-40));
                ctx.beginPath();
                ctx.moveTo(-50, -50);
                ctx.lineTo(50, -50);
                ctx.lineTo(50, 50);
                ctx.lineTo(-50, 50);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya2.png'), -50, -50, 100, 100);
                ctx.restore();

                ctx.save();
                ctx.fillStyle = 'rgb(0,255,0)';
                ctx.beginPath();
                ctx.ellipse(650, 200, 100, 100, 0, degreeToRadians(180), 0);
                ctx.ellipse(650, 200, 100, 100, 0, 0, -degreeToRadians(180));
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,255)';
                ctx.setLineDash([]);
                ctx.lineWidth = 5;
                ctx.translate(400, 600);
                ctx.rotate(degreeToRadians(18));
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
                ctx.quadraticCurveTo(46, -54, 87, -2);
                ctx.quadraticCurveTo(108, 24, 97, -45);
                ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
                ctx.stroke();
                ctx.restore();

                return canvas;
            }
        },
        {
            title: 'shapes and images, zoomed out, scrolled',
            viewer: () => new Viewer(
                designs[0]!(),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-1000, -1000), new Vector2(1000, 1000)), 
                        new Margin(200, 200, 200, 200), 
                        0.5, 
                        3,
                        new Vector2(800, 800)),
                    new Vector2(-200, 100),
                    0.5,
                    0),
                new RendererFactory(createDesignRenderer(), createUiRenderer()),
                inputReceiverFactory()
            ),
            expected: async () => {
                const canvas = createBlankCanvas();
                const ctx = canvas.getContext('2d');

                ctx.setTransform(new DOMMatrix([0.5, 0, 0, 0.5, 200, -100]));

                ctx.save();
                ctx.transform(1, 0, 0, 1, 400, 400);
                ctx.drawImage(await loadImage('sima.png'), -300, -300, 600, 600);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(0,0,255)';
                ctx.lineWidth = 4;
                ctx.translate(150, 600);
                ctx.rotate(degreeToRadians(61.4));
                ctx.beginPath();
                ctx.moveTo(-100, -100);
                ctx.lineTo(100, -100);
                ctx.lineTo(100, 100);
                ctx.lineTo(-100, 100);
                ctx.closePath();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya.png'), -100, -100, 200, 200);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.fillStyle = 'rgb(255,255,255)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5, 10]);
                ctx.translate(600, 650);
                ctx.rotate(degreeToRadians(-40));
                ctx.beginPath();
                ctx.moveTo(-50, -50);
                ctx.lineTo(50, -50);
                ctx.lineTo(50, 50);
                ctx.lineTo(-50, 50);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya2.png'), -50, -50, 100, 100);
                ctx.restore();

                ctx.save();
                ctx.fillStyle = 'rgb(0,255,0)';
                ctx.beginPath();
                ctx.ellipse(650, 200, 100, 100, 0, degreeToRadians(180), 0);
                ctx.ellipse(650, 200, 100, 100, 0, 0, -degreeToRadians(180));
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,255)';
                ctx.setLineDash([]);
                ctx.lineWidth = 5;
                ctx.translate(400, 600);
                ctx.rotate(degreeToRadians(18));
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
                ctx.quadraticCurveTo(46, -54, 87, -2);
                ctx.quadraticCurveTo(108, 24, 97, -45);
                ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
                ctx.stroke();
                ctx.restore();

                return canvas;
            }
        },
        {
            title: 'shapes and images, rotated, scrolled',
            viewer: () => new Viewer(
                designs[0]!(),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-1000, -1000), new Vector2(1000, 1000)), 
                        new Margin(0, 0, 0, 0), 
                        0.5, 
                        3,
                        new Vector2(1000, 1000)),
                    new Vector2(0, -800),
                    1,
                    90),
                new RendererFactory(createDesignRenderer(), createUiRenderer()),
                inputReceiverFactory()
            ),
            expected: async () => {
                const canvas = createBlankCanvas();
                const ctx = canvas.getContext('2d');

                ctx.setTransform(new DOMMatrix([0, -1, 1, 0, 0, 800]));

                ctx.save();
                ctx.transform(1, 0, 0, 1, 400, 400);
                ctx.drawImage(await loadImage('sima.png'), -300, -300, 600, 600);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(0,0,255)';
                ctx.lineWidth = 4;
                ctx.translate(150, 600);
                ctx.rotate(degreeToRadians(61.4));
                ctx.beginPath();
                ctx.moveTo(-100, -100);
                ctx.lineTo(100, -100);
                ctx.lineTo(100, 100);
                ctx.lineTo(-100, 100);
                ctx.closePath();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya.png'), -100, -100, 200, 200);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.fillStyle = 'rgb(255,255,255)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5, 10]);
                ctx.translate(600, 650);
                ctx.rotate(degreeToRadians(-40));
                ctx.beginPath();
                ctx.moveTo(-50, -50);
                ctx.lineTo(50, -50);
                ctx.lineTo(50, 50);
                ctx.lineTo(-50, 50);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya2.png'), -50, -50, 100, 100);
                ctx.restore();

                ctx.save();
                ctx.fillStyle = 'rgb(0,255,0)';
                ctx.beginPath();
                ctx.ellipse(650, 200, 100, 100, 0, degreeToRadians(180), 0);
                ctx.ellipse(650, 200, 100, 100, 0, 0, -degreeToRadians(180));
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,255)';
                ctx.setLineDash([]);
                ctx.lineWidth = 5;
                ctx.translate(400, 600);
                ctx.rotate(degreeToRadians(18));
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
                ctx.quadraticCurveTo(46, -54, 87, -2);
                ctx.quadraticCurveTo(108, 24, 97, -45);
                ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
                ctx.stroke();
                ctx.restore();

                return canvas;
            }
        },
        {
            title: 'shapes and images, rotated, zoomed in, scrolled',
            viewer: () => new Viewer(
                designs[0]!(),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-1000, -1000), new Vector2(1000, 1000)), 
                        new Margin(0, 0, 0, 0), 
                        0.5, 
                        3,
                        new Vector2(1000, 1000)),
                    new Vector2(0, -800),
                    1.63,
                    90),
                new RendererFactory(createDesignRenderer(), createUiRenderer()),
                inputReceiverFactory()
            ),
            expected: async () => {
                const canvas = createBlankCanvas();
                const ctx = canvas.getContext('2d');

                ctx.translate(0, 800);
                ctx.rotate(degreeToRadians(-90));
                ctx.scale(1.63, 1.63);

                ctx.save();
                ctx.transform(1, 0, 0, 1, 400, 400);
                ctx.drawImage(await loadImage('sima.png'), -300, -300, 600, 600);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(0,0,255)';
                ctx.lineWidth = 4;
                ctx.translate(150, 600);
                ctx.rotate(degreeToRadians(61.4));
                ctx.beginPath();
                ctx.moveTo(-100, -100);
                ctx.lineTo(100, -100);
                ctx.lineTo(100, 100);
                ctx.lineTo(-100, 100);
                ctx.closePath();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya.png'), -100, -100, 200, 200);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.fillStyle = 'rgb(255,255,255)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5, 10]);
                ctx.translate(600, 650);
                ctx.rotate(degreeToRadians(-40));
                ctx.beginPath();
                ctx.moveTo(-50, -50);
                ctx.lineTo(50, -50);
                ctx.lineTo(50, 50);
                ctx.lineTo(-50, 50);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya2.png'), -50, -50, 100, 100);
                ctx.restore();

                ctx.save();
                ctx.fillStyle = 'rgb(0,255,0)';
                ctx.beginPath();
                ctx.ellipse(650, 200, 100, 100, 0, degreeToRadians(180), 0);
                ctx.ellipse(650, 200, 100, 100, 0, 0, -degreeToRadians(180));
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,255)';
                ctx.setLineDash([]);
                ctx.lineWidth = 5;
                ctx.translate(400, 600);
                ctx.rotate(degreeToRadians(18));
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
                ctx.quadraticCurveTo(46, -54, 87, -2);
                ctx.quadraticCurveTo(108, 24, 97, -45);
                ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
                ctx.stroke();
                ctx.restore();

                return canvas;
            }
        },
        {
            title: 'shapes and images, rotated, zoomed out, scrolled',
            viewer: () => new Viewer(
                designs[0]!(),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-1000, -1000), new Vector2(1000, 1000)), 
                        new Margin(200, 200, 200, 200), 
                        0.5, 
                        3,
                        new Vector2(800, 800)),
                    new Vector2(0, -800),
                    0.7,
                    90),
                new RendererFactory(createDesignRenderer(), createUiRenderer()),
                inputReceiverFactory()
            ),
            expected: async () => {
                const canvas = createBlankCanvas();
                const ctx = canvas.getContext('2d');

                ctx.translate(0, 800);
                ctx.rotate(degreeToRadians(-90));
                ctx.scale(0.7, 0.7);

                ctx.save();
                ctx.transform(1, 0, 0, 1, 400, 400);
                ctx.drawImage(await loadImage('sima.png'), -300, -300, 600, 600);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(0,0,255)';
                ctx.lineWidth = 4;
                ctx.translate(150, 600);
                ctx.rotate(degreeToRadians(61.4));
                ctx.beginPath();
                ctx.moveTo(-100, -100);
                ctx.lineTo(100, -100);
                ctx.lineTo(100, 100);
                ctx.lineTo(-100, 100);
                ctx.closePath();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya.png'), -100, -100, 200, 200);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.fillStyle = 'rgb(255,255,255)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5, 10]);
                ctx.translate(600, 650);
                ctx.rotate(degreeToRadians(-40));
                ctx.beginPath();
                ctx.moveTo(-50, -50);
                ctx.lineTo(50, -50);
                ctx.lineTo(50, 50);
                ctx.lineTo(-50, 50);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya2.png'), -50, -50, 100, 100);
                ctx.restore();

                ctx.save();
                ctx.fillStyle = 'rgb(0,255,0)';
                ctx.beginPath();
                ctx.ellipse(650, 200, 100, 100, 0, degreeToRadians(180), 0);
                ctx.ellipse(650, 200, 100, 100, 0, 0, -degreeToRadians(180));
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,255)';
                ctx.setLineDash([]);
                ctx.lineWidth = 5;
                ctx.translate(400, 600);
                ctx.rotate(degreeToRadians(18));
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
                ctx.quadraticCurveTo(46, -54, 87, -2);
                ctx.quadraticCurveTo(108, 24, 97, -45);
                ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
                ctx.stroke();
                ctx.restore();

                return canvas;
            }
        },
        {
            title: 'multiselection, shapes and images, zoomed out, scrolled',
            viewer: () => {
                const result = new Viewer(
                    designs[0]!(),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(-1000, -1000), new Vector2(1000, 1000)),
                            new Margin(200, 200, 200, 200),
                            0.5,
                            3,
                            new Vector2(800, 800)),
                        new Vector2(-200, 100),
                        0.5,
                        0),
                    new RendererFactory(createDesignRenderer(), createUiRenderer()),
                    inputReceiverFactory());
                
                result.selection = new Selection([
                    ...result.design.layers.get(1).items,
                    ...result.design.layers.get(3).items
                ]);

                return result;
            },
            expected: async () => {
                const canvas = createBlankCanvas();
                const ctx = canvas.getContext('2d');

                ctx.setTransform(new DOMMatrix([0.5, 0, 0, 0.5, 200, -100]));

                ctx.save();
                ctx.transform(1, 0, 0, 1, 400, 400);
                ctx.drawImage(await loadImage('sima.png'), -300, -300, 600, 600);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(0,0,255)';
                ctx.lineWidth = 4;
                ctx.translate(150, 600);
                ctx.rotate(degreeToRadians(61.4));
                ctx.beginPath();
                ctx.moveTo(-100, -100);
                ctx.lineTo(100, -100);
                ctx.lineTo(100, 100);
                ctx.lineTo(-100, 100);
                ctx.closePath();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya.png'), -100, -100, 200, 200);
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.fillStyle = 'rgb(255,255,255)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5, 10]);
                ctx.translate(600, 650);
                ctx.rotate(degreeToRadians(-40));
                ctx.beginPath();
                ctx.moveTo(-50, -50);
                ctx.lineTo(50, -50);
                ctx.lineTo(50, 50);
                ctx.lineTo(-50, 50);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.drawImage(await loadImage('masyunya2.png'), -50, -50, 100, 100);
                ctx.restore();

                ctx.save();
                ctx.fillStyle = 'rgb(0,255,0)';
                ctx.beginPath();
                ctx.ellipse(650, 200, 100, 100, 0, degreeToRadians(180), 0);
                ctx.ellipse(650, 200, 100, 100, 0, 0, -degreeToRadians(180));
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = 'rgb(255,0,255)';
                ctx.setLineDash([]);
                ctx.lineWidth = 5;
                ctx.translate(400, 600);
                ctx.rotate(degreeToRadians(18));
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(13, -36, 62, 43, 53, -11);
                ctx.quadraticCurveTo(46, -54, 87, -2);
                ctx.quadraticCurveTo(108, 24, 97, -45);
                ctx.bezierCurveTo(88, -98, 143, -51, 148, -73);
                ctx.stroke();
                ctx.restore();

                ctx.strokeStyle = 'rgb(0,0,255)';
                ctx.lineWidth = 4;
                ctx.save();
                ctx.translate(150, 600);
                ctx.rotate(degreeToRadians(61.4));
                ctx.beginPath();
                ctx.moveTo(-100, -100);
                ctx.lineTo(100, -100);
                ctx.lineTo(100, 100);
                ctx.lineTo(-100, 100);
                ctx.closePath();
                ctx.stroke();
                ctx.restore();

                ctx.save();
                ctx.translate(600, 650);
                ctx.rotate(degreeToRadians(-40));
                ctx.beginPath();
                ctx.moveTo(-50, -50);
                ctx.lineTo(50, -50);
                ctx.lineTo(50, 50);
                ctx.lineTo(-50, 50);
                ctx.closePath();
                ctx.stroke();
                ctx.restore();

                ctx.save();
                ctx.translate(400, 600);
                ctx.rotate(degreeToRadians(18));
                ctx.beginPath();
                ctx.moveTo(0, -73);
                ctx.lineTo(148, -73);
                ctx.lineTo(148, 8.5350488841);
                ctx.lineTo(0, 8.5350488841);
                ctx.closePath();
                ctx.stroke();
                ctx.restore();

                return canvas;
            }
        }
    ];

    testCases.forEach(({ title, viewer, expected }) => {
        test(`render viewer with: ${title}`, async () => {
            const canvas = createBlankCanvas();
            const context = new RenderingContextFake(canvas.getContext('2d'));

            viewer().renderer.render(context);

            const expectedCanvas = await expected();

            expect(canvas.toDataURL()).to.be.equal(expectedCanvas.toDataURL());
        });
    });
});