import { suite, test } from 'mocha';
import { expect } from 'chai';
import { Canvas, Image, createCanvas } from 'canvas';

import {
    ClosedShapeItem, 
    ClosedShapeStyle, 
    CubicBezierSegment, 
    DashSettings, 
    Design, 
    DesignRenderer, 
    EllipseControls,
    ImageItem, 
    ImageStyle, 
    Layer, 
    LineControls, 
    LineSegment, 
    OpenPath, 
    OpenShapeItem, 
    OpenShapeStyle, 
    Path, 
    PathControls, 
    Pen, 
    RectangleControls, 
    RgbColor, 
    SolidBrush, 
    Transform, 
    Vector2,
    ImageContentProvider,
    LayerRenderer,
    ItemRendererFactory,
    IImageContentProvider,
    IImageContentStorage
} from 'fine-forma-core';
    
import { RenderingContextFake } from './RenderingContextFake';
import { TEST_RESOURCES_PATH } from '../Settings';
import { ImageContentStorageStub } from './ImageContentStorageStub';

suite('Render design', async () => {
    const images = new Map<string, string>([
        ['masyunya', `${TEST_RESOURCES_PATH}\\masyunya.png`],
        ['ruka', `${TEST_RESOURCES_PATH}\\ruka.png`],
        ['blob', `${TEST_RESOURCES_PATH}\\blob.jpg`]
    ]);
    let imageStorage: IImageContentStorage;
    let imageContentProvider: IImageContentProvider;

    before(async () => {
        imageStorage = await ImageContentStorageStub.setup(images);
        imageContentProvider = await new Promise<IImageContentProvider>(resolve => {
            const imageContentProvider = new ImageContentProvider(imageStorage);
            for(const storageId of images.keys()) {
                imageContentProvider.getContent(storageId)
            }
    
            setTimeout(() => {
                resolve(imageContentProvider);
            }, 10);
        });
    });

    const createBlankCanvas = (): Canvas => createCanvas(800, 800);
    const radians = (degree: number): number => degree * Math.PI / 180;

    suite('Shapes', () => {
        const pathHeart = (): Path => new OpenPath([
            new LineSegment(new Vector2(0, 0), new Vector2(-4, -2)),
            new CubicBezierSegment(new Vector2(-4, -2), new Vector2(-4, -3), new Vector2(-46, -27), new Vector2(-97, -69)),
            new CubicBezierSegment(new Vector2(-97, -69), new Vector2(-145, -108), new Vector2(-210, -170), new Vector2(-254, -244)),
            new CubicBezierSegment(new Vector2(-254, -244), new Vector2(-285, -298), new Vector2(-300, -352), new Vector2(-300, -404)),
            new CubicBezierSegment(new Vector2(-300, -404), new Vector2(-300, -427), new Vector2(-296, -448), new Vector2(-288, -467)),
            new CubicBezierSegment(new Vector2(-288, -467), new Vector2(-281, -486), new Vector2(-269, -502), new Vector2(-255, -516)),
            new CubicBezierSegment(new Vector2(-255, -516), new Vector2(-227, -543), new Vector2(-188, -558), new Vector2(-146, -558)),
            new CubicBezierSegment(new Vector2(-146, -558), new Vector2(-121, -558), new Vector2(-98, -554), new Vector2(-78, -546)),
            new CubicBezierSegment(new Vector2(-78, -546), new Vector2(-59, -538), new Vector2(-43, -527), new Vector2(-30, -512)),
            new CubicBezierSegment(new Vector2(-30, -512), new Vector2(-16, -498), new Vector2(-6, -479), new Vector2(0, -459)),
            new CubicBezierSegment(new Vector2(0, -459), new Vector2(6, -479), new Vector2(16, -498), new Vector2(30, -512)),
            new CubicBezierSegment(new Vector2(30, -512), new Vector2(43, -527), new Vector2(59, -538), new Vector2(78, -546)),
            new CubicBezierSegment(new Vector2(78, -546), new Vector2(98, -554), new Vector2(121, -558), new Vector2(146, -558)),
            new CubicBezierSegment(new Vector2(146, -558), new Vector2(188, -558), new Vector2(227, -543), new Vector2(255, -516)),
            new CubicBezierSegment(new Vector2(255, -516), new Vector2(269, -502), new Vector2(281, -486), new Vector2(288, -467)),
            new CubicBezierSegment(new Vector2(288, -467), new Vector2(296, -448), new Vector2(300, -427), new Vector2(300, -404)),
            new CubicBezierSegment(new Vector2(300, -404), new Vector2(300, -352), new Vector2(285, -298), new Vector2(254, -244)),
            new CubicBezierSegment(new Vector2(254, -244), new Vector2(235, -211), new Vector2(210, -178), new Vector2(179, -146)),
            new CubicBezierSegment(new Vector2(179, -146), new Vector2(155, -120), new Vector2(128, -94), new Vector2(97, -69)),
            new CubicBezierSegment(new Vector2(97, -69), new Vector2(46, -27), new Vector2(4, -3), new Vector2(4, -2)),
            new LineSegment(new Vector2(4, -2), new Vector2(0, 0))
        ]);
        const testCases = [
            {
                title: 'blank design',
                design: () => new Design([]),
                expected: () => createBlankCanvas()
            },
            {
                title: 'blank layer',
                design: () => new Design([new Layer([], 0)]),
                expected: () => createBlankCanvas()
            },
            {
                title: 'square #1',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(0, 0),
                            Transform.createIdentity(),
                            new RectangleControls(new Vector2(0, 0), new Vector2(100, 100)),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 0, 0, 0)), 0),
                                new SolidBrush(new RgbColor(255, 0, 255, 255))
                            )
                        )
                    ],
                        0)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(255,0,255)';
                    ctx.fillRect(0, 0, 100, 100);

                    return canvas;
                }
            },
            {
                title: 'square #2',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(100, 100),
                            Transform.createIdentity(),
                            new RectangleControls(new Vector2(0, 0), new Vector2(100, 100)),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 0, 0, 0)), 0),
                                new SolidBrush(new RgbColor(255, 0, 255, 255))
                            )
                        )
                    ],
                    0)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(255,0,255)';
                    ctx.fillRect(100, 100, 100, 100);

                    return canvas;
                }
            },
            {
                title: 'square with stroke #1',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(100, 100),
                            Transform.createIdentity(),
                            new RectangleControls(new Vector2(0, 0), new Vector2(120, 120)),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 0, 0, 255)), 2),
                                new SolidBrush(new RgbColor(255, 0, 0, 255))
                            )
                        )
                    ],
                    0)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(255,0,0)';
                    ctx.strokeStyle = 'rgb(0,0,0)';
                    ctx.lineWidth = 2;
                    ctx.rect(100, 100, 120, 120);
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'square with stroke #2',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(160, 160),
                            Transform.createIdentity(),
                            new RectangleControls(new Vector2(-60, -60), new Vector2(60, 60)),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 0, 0, 255)), 2),
                                new SolidBrush(new RgbColor(255, 0, 0, 255))
                            )
                        )
                    ],
                    0)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(255,0,0)';
                    ctx.strokeStyle = 'rgb(0,0,0)';
                    ctx.lineWidth = 2;
                    ctx.rect(100, 100, 120, 120);
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'rotated square with stroke',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(100, 100),
                            Transform.createIdentity().rotate(30),
                            new RectangleControls(new Vector2(-75, -75), new Vector2(75, 75)),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(255, 0, 255, 255)), 5),
                                new SolidBrush(new RgbColor(0, 0, 255, 255))
                            )
                        )
                    ],
                    0.1)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(0,0,255)';
                    ctx.strokeStyle = 'rgb(255,0,255)';
                    ctx.lineWidth = 5;
                    ctx.translate(100, 100);
                    ctx.rotate(radians(30));
                    ctx.beginPath();
                    ctx.moveTo(-75, -75);
                    ctx.lineTo(75, -75);
                    ctx.lineTo(75, 75);
                    ctx.lineTo(-75, 75);
                    ctx.lineTo(-75, -75);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'scaled rotated square with stroke',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(400, 400),
                            Transform.createIdentity().scale(new Vector2(1.5, 1.5)).rotate(45),
                            new RectangleControls(new Vector2(-75, -75), new Vector2(75, 75)),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(255, 0, 255, 255)), 5),
                                new SolidBrush(new RgbColor(100, 30, 255, 255))
                            )
                        )
                    ],
                    -1)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(100,30,255)';
                    ctx.strokeStyle = 'rgb(255,0,255)';
                    ctx.lineWidth = 5;
                    ctx.translate(400, 400);
                    ctx.scale(1.5, 1.5);
                    ctx.rotate(radians(45));
                    ctx.rect(-75, -75, 150, 150);
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'scaled rotated rectangle with stroke',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(400, 400),
                            Transform.createIdentity().scale(new Vector2(1.6, 1.3)).rotate(56),
                            new RectangleControls(new Vector2(-40, -75), new Vector2(40, 75)),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 255, 255, 255)), 4),
                                new SolidBrush(new RgbColor(80, 255, 90, 255))
                            )
                        )
                    ],
                    2)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(80,255,90)';
                    ctx.strokeStyle = 'rgb(0,255,255)';
                    ctx.lineWidth = 4;
                    ctx.translate(400, 400);
                    ctx.rotate(radians(56));
                    ctx.scale(1.6, 1.3);
                    
                    ctx.beginPath();
                    ctx.moveTo(-40, -75);
                    ctx.lineTo(40, -75);
                    ctx.lineTo(40, 75);
                    ctx.lineTo(-40, 75);
                    ctx.closePath();

                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'translated line',
                design: () => new Design([
                    new Layer([
                        new OpenShapeItem(
                            new Vector2(200, 150),
                            Transform.createIdentity().translate(new Vector2(0, 300)),
                            new LineControls(new Vector2(0, 0), new Vector2(80, 150)),
                            new OpenShapeStyle(new Pen(new SolidBrush(new RgbColor(240, 0, 0, 255)), 2))
                        )
                    ],
                    1)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.strokeStyle = 'rgb(240,0,0)';
                    ctx.lineWidth = 2;
                    ctx.translate(200, 450);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(80, 150);
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'translated scaled line',
                design: () => new Design([
                    new Layer([
                        new OpenShapeItem(
                            new Vector2(200, 150),
                            Transform.createIdentity().translate(new Vector2(0, 300)).scale(new Vector2(2, 1)),
                            new LineControls(new Vector2(0, 0), new Vector2(80, 150)),
                            new OpenShapeStyle(new Pen(new SolidBrush(new RgbColor(240, 0, 0, 255)), 2))
                        )
                    ],
                    1)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.strokeStyle = 'rgb(240,0,0)';
                    ctx.lineWidth = 2;
                    ctx.translate(200, 450);
                    ctx.scale(2, 1)
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(80, 150);
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'scaled rotated line',
                design: () => new Design([
                    new Layer([
                        new OpenShapeItem(
                            new Vector2(200, 150),
                            Transform.createIdentity().scale(new Vector2(2, 1.1)).rotate(30),
                            new LineControls(new Vector2(0, 0), new Vector2(80, 150)),
                            new OpenShapeStyle(new Pen(new SolidBrush(new RgbColor(240, 0, 0, 255)), 2))
                        )
                    ],
                    1)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.strokeStyle = 'rgb(240,0,0)';
                    ctx.lineWidth = 2;
                    ctx.translate(200, 150);
                    ctx.rotate(radians(30));
                    ctx.scale(2, 1.1);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(80, 150);
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'scaled rotated ellipse with stroke',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(400, 400),
                            Transform.createIdentity().scale(new Vector2(1.6, 1.3)).rotate(56),
                            new EllipseControls(
                                new RectangleControls(new Vector2(-40, -75), new Vector2(40, 75))
                            ),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 255, 255, 255)), 4),
                                new SolidBrush(new RgbColor(80, 255, 90, 255))
                            )
                        )
                    ],
                    0)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(80,255,90)';
                    ctx.strokeStyle = 'rgb(0,255,255)';
                    ctx.lineWidth = 4;
                    ctx.translate(400, 400);
                    ctx.rotate(radians(56));
                    ctx.scale(1.6, 1.3);
                    
                    ctx.ellipse(0, 0, 40, 75, 0, 0, radians(360));
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'path heart outline',
                design: () => new Design([
                    new Layer([
                        new OpenShapeItem(
                            new Vector2(400, 600),
                            Transform.createIdentity(),
                            new PathControls(pathHeart()),
                            new OpenShapeStyle(new Pen(new SolidBrush(new RgbColor(190, 0, 0, 255)), 5))
                        )
                    ],
                    1)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.strokeStyle = 'rgb(190,0,0)';
                    ctx.lineWidth = 5;
                    ctx.translate(400, 600);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'rotated path heart outline',
                design: () => new Design([
                    new Layer([
                        new OpenShapeItem(
                            new Vector2(500, 700),
                            Transform.createIdentity().rotate(-35),
                            new PathControls(pathHeart()),
                            new OpenShapeStyle(new Pen(new SolidBrush(new RgbColor(190, 0, 0, 255)), 5))
                        )
                    ],
                    1)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.strokeStyle = 'rgb(190,0,0)';
                    ctx.lineWidth = 5;
                    ctx.translate(500, 700);
                    ctx.rotate(radians(-35));
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'rotated path heart dashed outline',
                design: () => new Design([
                    new Layer([
                        new OpenShapeItem(
                            new Vector2(500, 700),
                            Transform.createIdentity().rotate(-35),
                            new PathControls(pathHeart()),
                            new OpenShapeStyle(new Pen(
                                new SolidBrush(new RgbColor(190, 0, 0, 255)), 
                                5,
                                new DashSettings([10, 10, 5])))
                        )
                    ],
                    1)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.strokeStyle = 'rgb(190,0,0)';
                    ctx.lineWidth = 5;
                    ctx.setLineDash([10, 10, 5]);
                    ctx.translate(500, 700);
                    ctx.rotate(radians(-35));
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'scaled rotated path heart outline',
                design: () => new Design([
                    new Layer([
                        new OpenShapeItem(
                            new Vector2(500, 700),
                            Transform.createIdentity().scale(new Vector2(1.5, 0.6)).rotate(-40),
                            new PathControls(pathHeart()),
                            new OpenShapeStyle(new Pen(new SolidBrush(new RgbColor(190, 0, 0, 255)), 5))
                        )
                    ],
                    1)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.strokeStyle = 'rgb(190,0,0)';
                    ctx.lineWidth = 5;
                    ctx.translate(500, 700);
                    ctx.rotate(radians(-40));
                    ctx.scale(1.5, 0.6);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'filled path heart with outline',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(400, 600),
                            Transform.createIdentity(),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(140, 0, 0, 255)), 5),
                                new SolidBrush(new RgbColor(225, 0, 0, 255))
                            )
                        )
                    ],
                    1)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(225,0,0)';
                    ctx.strokeStyle = 'rgb(140,0,0)';
                    ctx.lineWidth = 5;
                    ctx.translate(400, 600);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'filled rotated path heart with outline',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(500, 700),
                            Transform.createIdentity().rotate(-35),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(140, 0, 0, 255)), 5),
                                new SolidBrush(new RgbColor(225, 0, 0, 255))
                            )
                        )
                    ],
                    1)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(225,0,0)';
                    ctx.strokeStyle = 'rgb(140,0,0)';
                    ctx.lineWidth = 5;
                    ctx.translate(500, 700);
                    ctx.rotate(radians(-35));
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'filled scaled rotated path heart with outline',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(500, 700),
                            Transform.createIdentity().rotate(-40).scale(new Vector2(1.5, 0.6)),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(140, 0, 0, 255)), 5),
                                new SolidBrush(new RgbColor(225, 0, 0, 255))
                            )
                        )
                    ],
                    1)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(225,0,0)';
                    ctx.strokeStyle = 'rgb(140,0,0)';
                    ctx.lineWidth = 5;
                    ctx.translate(500, 700);
                    ctx.rotate(radians(-40));
                    ctx.scale(1.5, 0.6);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'filled translated scaled rotated path heart with outline',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(500, 700),
                            Transform.createIdentity().rotate(-40).scale(new Vector2(1.5, 0.6)).translate(new Vector2(0, -100)),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(140, 0, 0, 255)), 5),
                                new SolidBrush(new RgbColor(225, 0, 0, 255))
                            )
                        )
                    ],
                    1)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(225,0,0)';
                    ctx.strokeStyle = 'rgb(140,0,0)';
                    ctx.lineWidth = 5;
                    ctx.translate(500, 600);
                    ctx.rotate(radians(-40));
                    ctx.scale(1.5, 0.6);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'overlapping path hearts #1',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(200, 600),
                            Transform.createIdentity().scale(new Vector2(0.8, 0.8)).rotate(68),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 100, 0, 255)), 2),
                                new SolidBrush(new RgbColor(0, 255, 0, 255))
                            )
                        )
                    ],
                    1),
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(400, 700),
                            Transform.createIdentity(),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(140, 0, 0, 255)), 5),
                                new SolidBrush(new RgbColor(225, 0, 0, 255))
                            )
                        )
                    ],
                    0)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');

                    ctx.fillStyle = 'rgb(225,0,0)';
                    ctx.strokeStyle = 'rgb(140,0,0)';
                    ctx.lineWidth = 5;
                    ctx.translate(400, 700);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    ctx.fillStyle = 'rgb(0,255,0)';
                    ctx.strokeStyle = 'rgb(0,100,0)';
                    ctx.lineWidth = 2;
                    ctx.resetTransform();
                    ctx.translate(200, 600);
                    ctx.rotate(radians(68));
                    ctx.scale(0.8, 0.8);

                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'overlapping path hearts #2',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(200, 600),
                            Transform.createIdentity().scale(new Vector2(0.8, 0.8)).rotate(68),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 100, 0, 255)), 2),
                                new SolidBrush(new RgbColor(0, 255, 0, 255))
                            )
                        )
                    ],
                    1),
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(400, 700),
                            Transform.createIdentity(),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(140, 0, 0, 255)), 5),
                                new SolidBrush(new RgbColor(225, 0, 0, 255))
                            )
                        )
                    ],
                    2)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(0,255,0)';
                    ctx.strokeStyle = 'rgb(0,100,0)';
                    ctx.lineWidth = 2;
                    ctx.translate(200, 600);
                    ctx.rotate(radians(68));
                    ctx.scale(0.8, 0.8);

                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    ctx.fillStyle = 'rgb(225,0,0)';
                    ctx.strokeStyle = 'rgb(140,0,0)';
                    ctx.lineWidth = 5;
                    ctx.resetTransform();
                    ctx.translate(400, 700);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'overlapping path hearts #3',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(400, 700),
                            Transform.createIdentity(),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(140, 0, 0, 255)), 5),
                                new SolidBrush(new RgbColor(225, 0, 0, 255))
                            )
                        ),
                        new ClosedShapeItem(
                            new Vector2(200, 600),
                            Transform.createIdentity().scale(new Vector2(0.8, 0.8)).rotate(68),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 100, 0, 255)), 2),
                                new SolidBrush(new RgbColor(0, 255, 0, 255))
                            )
                        )
                    ],
                    0)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');

                    ctx.fillStyle = 'rgb(225,0,0)';
                    ctx.strokeStyle = 'rgb(140,0,0)';
                    ctx.lineWidth = 5;
                    ctx.translate(400, 700);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    ctx.fillStyle = 'rgb(0,255,0)';
                    ctx.strokeStyle = 'rgb(0,100,0)';
                    ctx.lineWidth = 2;
                    ctx.resetTransform();
                    ctx.translate(200, 600);
                    ctx.rotate(radians(68));
                    ctx.scale(0.8, 0.8);

                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'overlapping path hearts #4',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(200, 600),
                            Transform.createIdentity().scale(new Vector2(0.8, 0.8)).rotate(68),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 100, 0, 255)), 2),
                                new SolidBrush(new RgbColor(0, 255, 0, 255))
                            )
                        ),
                        new ClosedShapeItem(
                            new Vector2(400, 700),
                            Transform.createIdentity(),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(140, 0, 0, 255)), 5),
                                new SolidBrush(new RgbColor(225, 0, 0, 255))
                            )
                        )
                    ],
                    0)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(0,255,0)';
                    ctx.strokeStyle = 'rgb(0,100,0)';
                    ctx.lineWidth = 2;
                    ctx.translate(200, 600);
                    ctx.rotate(radians(68));
                    ctx.scale(0.8, 0.8);

                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    ctx.fillStyle = 'rgb(225,0,0)';
                    ctx.strokeStyle = 'rgb(140,0,0)';
                    ctx.lineWidth = 5;
                    ctx.resetTransform();
                    ctx.translate(400, 700);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'overlapping path hearts with transparency #1',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(400, 700),
                            Transform.createIdentity(),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(140, 0, 0, 150)), 5),
                                new SolidBrush(new RgbColor(225, 0, 0, 150))
                            )
                        ),
                        new ClosedShapeItem(
                            new Vector2(200, 600),
                            Transform.createIdentity().scale(new Vector2(0.8, 0.8)).rotate(68),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 100, 0, 150)), 2),
                                new SolidBrush(new RgbColor(0, 255, 0, 150))
                            )
                        )
                    ],
                    0)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgba(225,0,0,0.5882353)';
                    ctx.strokeStyle = 'rgba(140,0,0,0.5882353)';
                    ctx.lineWidth = 5;
                    ctx.translate(400, 700);

                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    ctx.fillStyle = 'rgba(0,255,0,0.5882353)';
                    ctx.strokeStyle = 'rgba(0,100,0,0.5882353)';
                    ctx.lineWidth = 2;
                    ctx.resetTransform();
                    ctx.translate(200, 600);
                    ctx.rotate(radians(68));
                    ctx.scale(0.8, 0.8);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'overlapping path hearts with transparency #2',
                design: () => new Design([
                    new Layer([
                        new ClosedShapeItem(
                            new Vector2(200, 600),
                            Transform.createIdentity().scale(new Vector2(0.8, 0.8)).rotate(68),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 100, 0, 150)), 2),
                                new SolidBrush(new RgbColor(0, 255, 0, 150))
                            )
                        ),
                        new ClosedShapeItem(
                            new Vector2(400, 700),
                            Transform.createIdentity(),
                            new PathControls(pathHeart()),
                            new ClosedShapeStyle(
                                new Pen(new SolidBrush(new RgbColor(140, 0, 0, 150)), 5),
                                new SolidBrush(new RgbColor(225, 0, 0, 150))
                            )
                        )
                    ],
                    0)
                ]),
                expected: () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgba(0,255,0,0.5882353)';
                    ctx.strokeStyle = 'rgba(0,100,0,0.5882353)';
                    ctx.lineWidth = 2;
                    ctx.translate(200, 600);
                    ctx.rotate(radians(68));
                    ctx.scale(0.8, 0.8);

                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    ctx.fillStyle = 'rgba(225,0,0,0.5882353)';
                    ctx.strokeStyle = 'rgba(140,0,0,0.5882353)';
                    ctx.lineWidth = 5;
                    ctx.resetTransform();
                    ctx.translate(400, 700);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-4, -2);
                    ctx.bezierCurveTo(-4, -3, -46, -27, -97, -69);
                    ctx.bezierCurveTo(-145, -108, -210, -170, -254, -244);
                    ctx.bezierCurveTo(-285, -298, -300, -352, -300, -404);
                    ctx.bezierCurveTo(-300, -427, -296, -448, -288, -467);
                    ctx.bezierCurveTo(-281, -486, -269, -502, -255, -516);
                    ctx.bezierCurveTo(-227, -543, -188, -558, -146, -558);
                    ctx.bezierCurveTo(-121, -558, -98, -554, -78, -546);
                    ctx.bezierCurveTo(-59, -538, -43, -527, -30, -512);
                    ctx.bezierCurveTo(-16, -498, -6, -479, 0, -459);
                    ctx.bezierCurveTo(6, -479, 16, -498, 30, -512);
                    ctx.bezierCurveTo(43, -527, 59, -538, 78, -546);
                    ctx.bezierCurveTo(98, -554, 121, -558, 146, -558);
                    ctx.bezierCurveTo(188, -558, 227, -543, 255, -516);
                    ctx.bezierCurveTo(269, -502, 281, -486, 288, -467);
                    ctx.bezierCurveTo(296, -448, 300, -427, 300, -404);
                    ctx.bezierCurveTo(300, -352, 285, -298, 254, -244);
                    ctx.bezierCurveTo(235, -211, 210, -178, 179, -146);
                    ctx.bezierCurveTo(155, -120, 128, -94, 97, -69);
                    ctx.bezierCurveTo(46, -27, 4, -3, 4, -2);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    return canvas;
                }
            },
        ];

        testCases.forEach(({ title, design, expected }) => {
            test(`render: ${title}`, () => {
                const canvas = createBlankCanvas();
                const context = new RenderingContextFake(canvas.getContext('2d'));
                const renderer = new DesignRenderer(
                    new LayerRenderer(
                        new ItemRendererFactory(imageContentProvider)));

                renderer.render(context, design());

                expect(canvas.toDataURL()).to.be.equal(expected().toDataURL());
            });
        });
    });

    suite('Images', () => {
        const image = (name: string) => new Promise<Image>((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(image);
            };
            image.onerror = () => reject();
            image.src = `${TEST_RESOURCES_PATH}\\${name}`;
        }); 
        const testCases = [
            {
                title: 'image #1',
                design: () => new Design([
                    new Layer([
                        new ImageItem(
                            new Vector2(0, 0), 
                            Transform.createIdentity(),
                            new RectangleControls(new Vector2(0, 0), new Vector2(100, 100)),
                            new ImageStyle(),
                            'masyunya')
                    ], 
                    1)
                ]),
                expected: async () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');

                    ctx.drawImage(await image('masyunya.png'), 0, 0, 100, 100);

                    return canvas;
                }
            },
            {
                title: 'image #2',
                design: () => new Design([
                    new Layer([
                        new ImageItem(
                            new Vector2(300, 100), 
                            Transform.createIdentity(),
                            new RectangleControls(new Vector2(0, 0), new Vector2(200, 200)),
                            new ImageStyle(),
                            'masyunya')
                    ], 
                    1)
                ]),
                expected: async () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');

                    ctx.drawImage(await image('masyunya.png'), 300, 100, 200, 200);

                    return canvas;
                }
            },
            {
                title: 'image #3',
                design: () => new Design([
                    new Layer([
                        new ImageItem(
                            new Vector2(300, 100), 
                            Transform.createIdentity(),
                            new RectangleControls(new Vector2(0, 0), new Vector2(200, 200)),
                            new ImageStyle(),
                            'ruka')
                    ], 
                    1)
                ]),
                expected: async () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');

                    ctx.drawImage(await image('ruka.png'), 300, 100, 200, 200);

                    return canvas;
                }
            },
            {
                title: 'stretched image',
                design: () => new Design([
                    new Layer([
                        new ImageItem(
                            new Vector2(100, 100), 
                            Transform.createIdentity(),
                            new RectangleControls(new Vector2(0, 0), new Vector2(500, 200)),
                            new ImageStyle(),
                            'masyunya')
                    ], 
                    1)
                ]),
                expected: async () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');

                    ctx.drawImage(await image('masyunya.png'), 100, 100, 500, 200);

                    return canvas;
                }
            },
            {
                title: 'scaled image',
                design: () => new Design([
                    new Layer([
                        new ImageItem(
                            new Vector2(200, 200), 
                            Transform.createIdentity().scale(new Vector2(1.4, 2.15)),
                            new RectangleControls(new Vector2(0, 0), new Vector2(200, 200)),
                            new ImageStyle(),
                            'masyunya')
                    ], 
                    1)
                ]),
                expected: async () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.translate(200, 200);
                    ctx.scale(1.4, 2.15);

                    ctx.drawImage(await image('masyunya.png'), 0, 0, 200, 200);

                    return canvas;
                }
            },
            {
                title: 'rotated image',
                design: () => new Design([
                    new Layer([
                        new ImageItem(
                            new Vector2(400, 200), 
                            Transform.createIdentity().rotate(57),
                            new RectangleControls(new Vector2(-100, -100), new Vector2(100, 100)),
                            new ImageStyle(),
                            'masyunya')
                    ], 
                    1)
                ]),
                expected: async () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.translate(400, 200);
                    ctx.rotate(radians(57));

                    ctx.drawImage(await image('masyunya.png'), -100, -100, 200, 200);

                    return canvas;
                }
            },
            {
                title: 'filled rotated image',
                design: () => new Design([
                    new Layer([
                        new ImageItem(
                            new Vector2(400, 200), 
                            Transform.createIdentity().rotate(57),
                            new RectangleControls(new Vector2(-100, -100), new Vector2(100, 100)),
                            new ImageStyle(Pen.empty, new SolidBrush(new RgbColor(250, 250, 200, 255))),
                            'masyunya')
                    ], 
                    1)
                ]),
                expected: async () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'rgb(250, 250, 200)';
                    ctx.translate(400, 200);
                    ctx.rotate(radians(57));

                    ctx.beginPath();
                    ctx.moveTo(-100, -100);
                    ctx.lineTo(100, -100);
                    ctx.lineTo(100, 100);
                    ctx.lineTo(-100, 100);
                    ctx.closePath();
                    ctx.fill();
                    ctx.drawImage(await image('masyunya.png'), -100, -100, 200, 200);

                    return canvas;
                }
            },
            {
                title: 'scaled rotated image',
                design: () => new Design([
                    new Layer([
                        new ImageItem(
                            new Vector2(400, 200), 
                            Transform.createIdentity().scale(new Vector2(1.4, 2.15)).rotate(57),
                            new RectangleControls(new Vector2(-100, -100), new Vector2(100, 100)),
                            new ImageStyle(),
                            'masyunya')
                    ], 
                    1)
                ]),
                expected: async () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.translate(400, 200);
                    ctx.rotate(radians(57));
                    ctx.scale(1.4, 2.15);

                    ctx.drawImage(await image('masyunya.png'), -100, -100, 200, 200);

                    return canvas;
                }
            },
            {
                title: 'image with border',
                design: () => new Design([
                    new Layer([
                        new ImageItem(
                            new Vector2(400, 400), 
                            Transform.createIdentity(),
                            new RectangleControls(new Vector2(-150, -150), new Vector2(150, 150)),
                            new ImageStyle(new Pen(new SolidBrush(new RgbColor(0, 0, 0, 255)), 10)),
                            'masyunya')
                    ], 
                    1)
                ]),
                expected: async () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.strokeStyle = 'rgb(0,0,0)';
                    ctx.lineWidth = 10;
                    ctx.translate(400, 400);

                    ctx.beginPath();
                    ctx.moveTo(-150, -150);
                    ctx.lineTo(150, -150);
                    ctx.lineTo(150, 150);
                    ctx.lineTo(-150, 150);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.drawImage(await image('masyunya.png'), -150, -150, 300, 300);

                    return canvas;
                }
            },
            {
                title: 'scaled rotated image with border',
                design: () => new Design([
                    new Layer([
                        new ImageItem(
                            new Vector2(400, 400), 
                            Transform.createIdentity().scale(new Vector2(2.3, 1.1)).rotate(-40),
                            new RectangleControls(new Vector2(-150, -150), new Vector2(150, 150)),
                            new ImageStyle(new Pen(new SolidBrush(new RgbColor(0, 0, 0, 255)), 10)),
                            'masyunya')
                    ], 
                    1)
                ]),
                expected: async () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.strokeStyle = 'rgb(0,0,0)';
                    ctx.lineWidth = 10;
                    ctx.translate(400, 400);
                    ctx.rotate(radians(-40));
                    ctx.scale(2.3, 1.1);

                    ctx.beginPath();
                    ctx.moveTo(-150, -150);
                    ctx.lineTo(150, -150);
                    ctx.lineTo(150, 150);
                    ctx.lineTo(-150, 150);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.drawImage(await image('masyunya.png'), -150, -150, 300, 300);

                    return canvas;
                }
            },
            {
                title: 'scaled rotated image with dashed border',
                design: () => new Design([
                    new Layer([
                        new ImageItem(
                            new Vector2(400, 400), 
                            Transform.createIdentity().scale(new Vector2(2.3, 1.1)).rotate(-40),
                            new RectangleControls(new Vector2(-150, -150), new Vector2(150, 150)),
                            new ImageStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 0, 0, 255)), 
                                10, 
                                new DashSettings([20, 10]))),
                            'masyunya')
                    ], 
                    1)
                ]),
                expected: async () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.strokeStyle = 'rgb(0,0,0)';
                    ctx.lineWidth = 10;
                    ctx.setLineDash([20, 10]);
                    ctx.translate(400, 400);
                    ctx.rotate(radians(-40));
                    ctx.scale(2.3, 1.1);

                    ctx.beginPath();
                    ctx.moveTo(-150, -150);
                    ctx.lineTo(150, -150);
                    ctx.lineTo(150, 150);
                    ctx.lineTo(-150, 150);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.drawImage(await image('masyunya.png'), -150, -150, 300, 300);

                    return canvas;
                }
            },
            {
                title: 'stretched rotated image with dashed border',
                design: () => new Design([
                    new Layer([
                        new ImageItem(
                            new Vector2(400, 400), 
                            Transform.createIdentity().rotate(-40),
                            new RectangleControls(new Vector2(-330, -160), new Vector2(330, 160)),
                            new ImageStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 0, 0, 255)), 
                                10, 
                                new DashSettings([20, 10]))),
                            'masyunya')
                    ], 
                    1)
                ]),
                expected: async () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.strokeStyle = 'rgb(0,0,0)';
                    ctx.lineWidth = 10;
                    ctx.setLineDash([20, 10]);
                    ctx.translate(400, 400);
                    ctx.rotate(radians(-40));

                    ctx.beginPath();
                    ctx.moveTo(-330, -160);
                    ctx.lineTo(330, -160);
                    ctx.lineTo(330, 160);
                    ctx.lineTo(-330, 160);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.drawImage(await image('masyunya.png'), -330, -160, 660, 320);

                    return canvas;
                }
            },
            {
                title: 'filled stretched rotated image with dashed border',
                design: () => new Design([
                    new Layer([
                        new ImageItem(
                            new Vector2(400, 400), 
                            Transform.createIdentity().rotate(-40),
                            new RectangleControls(new Vector2(-330, -160), new Vector2(330, 160)),
                            new ImageStyle(
                                new Pen(
                                    new SolidBrush(new RgbColor(255, 0, 255, 255)), 
                                    10, 
                                    new DashSettings([15, 15])),
                                new SolidBrush(new RgbColor(255, 255, 255, 255))),
                            'masyunya')
                    ], 
                    1)
                ]),
                expected: async () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.strokeStyle = 'rgb(255,0,255)';
                    ctx.fillStyle = 'rgb(255,255,255)';
                    ctx.lineWidth = 10;
                    ctx.setLineDash([15, 15]);
                    ctx.translate(400, 400);
                    ctx.rotate(radians(-40));

                    ctx.beginPath();
                    ctx.moveTo(-330, -160);
                    ctx.lineTo(330, -160);
                    ctx.lineTo(330, 160);
                    ctx.lineTo(-330, 160);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    ctx.drawImage(await image('masyunya.png'), -330, -160, 660, 320);

                    return canvas;
                }
            },
            {
                title: 'overlapping transformed images with border',
                design: () => new Design([
                    new Layer([
                        new ImageItem(
                            new Vector2(200, 200),
                            Transform.createIdentity().rotate(-46).scale(new Vector2(1.2, 1.3)),
                            new RectangleControls(new Vector2(-100, -100), new Vector2(100, 100)),
                            new ImageStyle(
                                new Pen(new SolidBrush(new RgbColor(255, 90, 255, 153)),
                                    5,
                                    new DashSettings([10, 10])),
                                new SolidBrush(new RgbColor(80, 80, 255, 160))),
                            'masyunya'),
                        new ImageItem(
                            new Vector2(600, 600),
                            Transform.createIdentity().rotate(16.5),
                            new RectangleControls(new Vector2(-180, -160), new Vector2(180, 160)),
                            new ImageStyle(
                                new Pen(new SolidBrush(new RgbColor(0, 0, 0, 255)),
                                    4,
                                    new DashSettings([10, 10, 5])),
                                new SolidBrush(new RgbColor(255, 255, 255, 255))),
                            'ruka')
                    ],
                    1),
                    new Layer([
                        new ImageItem(
                            new Vector2(400, 400),
                            Transform.createIdentity(),
                            new RectangleControls(new Vector2(-350, -200), new Vector2(350, 200)),
                            new ImageStyle(new Pen(new SolidBrush(new RgbColor(0, 0, 0, 0)), 0)),
                            'blob')
                    ],
                    0)
                ]),
                expected: async () => {
                    const canvas = createBlankCanvas();
                    const ctx = canvas.getContext('2d');
                    ctx.translate(400, 400);

                    ctx.drawImage(await image('blob.jpg'), -350, -200, 700, 400);

                    ctx.strokeStyle = 'rgba(255,90,255,0.6)';
                    ctx.fillStyle = 'rgba(80,80,255,0.62745098)'
                    ctx.lineWidth = 5;
                    ctx.setLineDash([10, 10]);
                    ctx.resetTransform();
                    ctx.translate(200, 200);
                    ctx.rotate(radians(-46));
                    ctx.scale(1.2, 1.3);

                    ctx.beginPath();
                    ctx.moveTo(-100, -100);
                    ctx.lineTo(100, -100);
                    ctx.lineTo(100, 100);
                    ctx.lineTo(-100, 100);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    ctx.drawImage(await image('masyunya.png'), -100, -100, 200, 200);

                    ctx.strokeStyle = 'rgb(0,0,0)';
                    ctx.fillStyle = 'rgb(255,255,255)'
                    ctx.lineWidth = 4;
                    ctx.setLineDash([10, 10, 5]);
                    ctx.resetTransform();
                    ctx.translate(600, 600);
                    ctx.rotate(radians(16.5));

                    ctx.beginPath();
                    ctx.moveTo(-180, -160);
                    ctx.lineTo(180, -160);
                    ctx.lineTo(180, 160);
                    ctx.lineTo(-180, 160);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    ctx.drawImage(await image('ruka.png'), -180, -160, 360, 320);

                    return canvas;
                }
            },
        ];

        testCases.forEach(({ title, design, expected }) => {
            test(`render: ${title}`, async () => {
                const canvas = createBlankCanvas();
                const context = new RenderingContextFake(canvas.getContext('2d'));
                const renderer = new DesignRenderer(
                    new LayerRenderer(
                        new ItemRendererFactory(imageContentProvider)));

                renderer.render(context, design());

                const expectedCanvas = await expected();

                expect(canvas.toDataURL()).to.be.equal(expectedCanvas.toDataURL());
            });
        });
    });
});