import { suite, test } from 'mocha';
import { expect } from 'chai';
import { Canvas, createCanvas } from 'canvas';

import { 
    Brush,
    ClosedShapeItem, 
    ClosedShapeStyle, 
    CubicBezierSegment, 
    Design, 
    DesignRenderer, 
    EllipseControls, 
    IDesignRenderer, 
    ILayerRenderer, 
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
    Vector2 
} from 'fine-forma-core';
    
import { RenderingContextFake } from './RenderingContextFake';
import { LayerRenderer } from '../../../fine-forma-core/src/Rendering/LayerRenderer';
import { ItemRendererFactory } from '../../../fine-forma-core/src/Rendering/Item/ItemRendererFactory';

suite('Render design', () => {
    const createBlankCanvas = (): Canvas => createCanvas(800, 800);
    const createRenderer = (): IDesignRenderer => new DesignRenderer(null as unknown as ILayerRenderer);
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
            //new LineSegment(new Vector2(-4, -2), new Vector2(0, 0))
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
                    ctx.fillStyle = 'rgb(0,255,255)';
                    ctx.strokeStyle = 'rgb(80,255,90)';
                    ctx.lineWidth = 4;
                    ctx.translate(400, 400);
                    ctx.rotate(radians(56));
                    ctx.scale(1.6, 1.3);
                    
                    ctx.rect(-40, -75, 150, 80);
                    ctx.fill();
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
                    ctx.scale(2, 1.1);
                    ctx.rotate(radians(30));
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(80, 150);
                    ctx.stroke();

                    return canvas;
                }
            },
            {
                title: 'scaled rotated ellipse with stroke', // ??????????
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
                    ctx.fillStyle = 'rgb(0,255,255)';
                    ctx.strokeStyle = 'rgb(80,255,90)';
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

        testCases.slice(0, 10).forEach(({ title, design, expected }) => {
            test(`render: ${title}`, () => {
                const canvas = createBlankCanvas();
                const context = new RenderingContextFake(canvas.getContext('2d'));
                const renderer = new DesignRenderer(new LayerRenderer(new ItemRendererFactory()));

                renderer.render(context, design());

                expect(canvas.toDataURL()).to.be.equal(expected().toDataURL());
            });
        });
    });
});