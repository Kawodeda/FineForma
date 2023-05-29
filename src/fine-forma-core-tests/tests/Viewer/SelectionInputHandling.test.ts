import { suite, test } from 'mocha';

import { 
    Design,
    IInputReceiver,
    InputReceiver,
    Layer,
    Margin,
    Rectangle,
    Selection,
    Vector2,
    Viewer,
    Viewport,
    ViewportConstraints,
    ViewportInputHandler,
    createCircle,
    createImage,
    createRectangle
} from 'fine-forma-core';

import { assertViewer, inputReceiverFactory, rendererFactoryWithDummyImageStroage } from '../Utils';

suite('Selection input handling', () => {
    const testCases = [
        {
            title: 'mouse down on empty space',
            initialViewer: () => new Viewer(
                new Design([new Layer([
                    createCircle(100, 200, 100).build(),
                    createImage(400, 500, 200, 150, 'popopoka').build()
                ], 
                1)]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                        new Margin(-500, -600, -500, -600),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(0, 0),
                    1,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()
            ),
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'left',
                    viewportPosition: new Vector2(400, 600),
                    workspacePosition: new Vector2(400, 600),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
            },
            expected: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(0, 0),
                        1,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );

                return result;
            }
        },
        {
            title: 'select item by mouse',
            initialViewer: () => new Viewer(
                new Design([new Layer([
                    createCircle(100, 200, 100).build(),
                    createImage(400, 500, 200, 150, 'popopoka').build()
                ], 
                1)]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                        new Margin(-500, -600, -500, -600),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(0, 0),
                    1,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()
            ),
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'left',
                    viewportPosition: new Vector2(400, 550),
                    workspacePosition: new Vector2(400, 550),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
            },
            expected: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(0, 0),
                        1,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(1));

                return result;
            }
        },
        {
            title: 'select item by mouse, zoomed, scrolled',
            initialViewer: () => new Viewer(
                new Design([new Layer([
                    createCircle(100, 200, 100).build(),
                    createImage(400, 500, 200, 150, 'popopoka').build()
                ], 
                1)]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                        new Margin(-500, -600, -500, -600),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(100, 200),
                    1.5,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()
            ),
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'left',
                    viewportPosition: new Vector2(10, 40),
                    workspacePosition: new Vector2(115, 260),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
            },
            expected: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(0));

                return result;
            }
        },
        {
            title: 'select item by mouse, release mouse, zoomed, scrolled',
            initialViewer: () => new Viewer(
                new Design([new Layer([
                    createCircle(100, 200, 100).build(),
                    createImage(400, 500, 200, 150, 'popopoka').build()
                ], 
                1)]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                        new Margin(-500, -600, -500, -600),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(100, 200),
                    1.5,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()
            ),
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'left',
                    viewportPosition: new Vector2(10, 40),
                    workspacePosition: new Vector2(115, 260),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseUp({
                    button: 'left',
                    viewportPosition: new Vector2(10, 40),
                    workspacePosition: new Vector2(115, 260),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
            },
            expected: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(0));

                return result;
            }
        },
        {
            title: 'select other item by mouse',
            initialViewer: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(0));

                return result;
            },
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'left',
                    viewportPosition: new Vector2(266.666, 233.333),
                    workspacePosition: new Vector2(500, 550),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
            },
            expected: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(1));

                return result;
            }
        },
        {
            title: 'select other item by mouse, release mouse',
            initialViewer: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(0));

                return result;
            },
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'left',
                    viewportPosition: new Vector2(266.666, 233.333),
                    workspacePosition: new Vector2(500, 550),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseUp({
                    button: 'left',
                    viewportPosition: new Vector2(266.666, 233.333),
                    workspacePosition: new Vector2(500, 550),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
            },
            expected: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(1));

                return result;
            }
        },
        {
            title: 'select overlapping item by mouse #1',
            initialViewer: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build(),
                        createRectangle(400, 500, 100, 100).build()
                    ],
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );

                return result;
            },
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'left',
                    viewportPosition: new Vector2(206.666, 206.666),
                    workspacePosition: new Vector2(410, 510),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
            },
            expected: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build(),
                        createRectangle(400, 500, 100, 100).build()
                    ],
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(2));

                return result;
            }
        },
        {
            title: 'select overlapping item by mouse #2',
            initialViewer: () => {
                const result = new Viewer(
                    new Design([
                        new Layer([
                            createRectangle(400, 500, 100, 100).build()
                        ], 2),
                        new Layer([
                            createCircle(100, 200, 100).build(),
                            createImage(400, 500, 200, 150, 'popopoka').build(),
                        ], 1),
                    ]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );

                return result;
            },
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'left',
                    viewportPosition: new Vector2(206.666, 206.666),
                    workspacePosition: new Vector2(410, 510),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
            },
            expected: () => {
                const result = new Viewer(
                    new Design([
                        new Layer([
                            createRectangle(400, 500, 100, 100).build()
                        ], 2),
                        new Layer([
                            createCircle(100, 200, 100).build(),
                            createImage(400, 500, 200, 150, 'popopoka').build(),
                        ], 1),
                    ]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(1).items.get(0));

                return result;
            }
        },
        {
            title: 'unselect item by mouse, release mouse on empty',
            initialViewer: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(0));

                return result;
            },
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'left',
                    viewportPosition: new Vector2(33.333, 133.333),
                    workspacePosition: new Vector2(150, 400),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseUp({
                    button: 'left',
                    viewportPosition: new Vector2(33.333, 133.333),
                    workspacePosition: new Vector2(150, 400),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
            },
            expected: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );

                return result;
            }
        },
        {
            title: 'unselect item by mouse, release mouse on other item',
            initialViewer: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(0));

                return result;
            },
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'left',
                    viewportPosition: new Vector2(33.333, 133.333),
                    workspacePosition: new Vector2(150, 400),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseUp({
                    button: 'left',
                    viewportPosition: new Vector2(200, 200),
                    workspacePosition: new Vector2(400, 500),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
            },
            expected: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );

                return result;
            }
        },
        {
            title: 'click selected item',
            initialViewer: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(0));

                return result;
            },
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'left',
                    viewportPosition: new Vector2(6.666, 6.666),
                    workspacePosition: new Vector2(110, 210),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseUp({
                    button: 'left',
                    viewportPosition: new Vector2(6.666, 6.666),
                    workspacePosition: new Vector2(110, 210),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
            },
            expected: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(0));

                return result;
            }
        },
        {
            title: 'select and drag item by mouse',
            initialViewer: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );

                return result;
            },
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'left',
                    viewportPosition: new Vector2(6.666, 6.666),
                    workspacePosition: new Vector2(110, 210),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'left',
                    viewportPosition: new Vector2(33.333, 13.333),
                    workspacePosition: new Vector2(150, 220),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'left',
                    viewportPosition: new Vector2(53.333, 33.333),
                    workspacePosition: new Vector2(180, 250),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
            },
            expected: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(170, 240, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(0));

                return result;
            }
        },
        {
            title: 'select and drag item by mouse, release mouse',
            initialViewer: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );

                return result;
            },
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'left',
                    viewportPosition: new Vector2(6.666, 6.666),
                    workspacePosition: new Vector2(110, 210),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'left',
                    viewportPosition: new Vector2(33.333, 13.333),
                    workspacePosition: new Vector2(150, 220),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'left',
                    viewportPosition: new Vector2(53.333, 33.333),
                    workspacePosition: new Vector2(180, 250),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseUp({
                    button: 'left',
                    viewportPosition: new Vector2(53.333, 33.333),
                    workspacePosition: new Vector2(180, 250),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
            },
            expected: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(170, 240, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(0));

                return result;
            }
        },
        {
            title: 'move mouse to selected item and drag',
            initialViewer: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(400, 500, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(1));

                return result;
            },
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseMove({
                    button: 'left',
                    viewportPosition: new Vector2(33.333, 13.333),
                    workspacePosition: new Vector2(150, 220),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'left',
                    viewportPosition: new Vector2(200, 200),
                    workspacePosition: new Vector2(400, 500),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseDown({
                    button: 'left',
                    viewportPosition: new Vector2(200, 200),
                    workspacePosition: new Vector2(400, 500),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'left',
                    viewportPosition: new Vector2(240, 280),
                    workspacePosition: new Vector2(460, 620),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'left',
                    viewportPosition: new Vector2(240, 320),
                    workspacePosition: new Vector2(460, 680),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
            },
            expected: () => {
                const result = new Viewer(
                    new Design([new Layer([
                        createCircle(100, 200, 100).build(),
                        createImage(460, 680, 200, 150, 'popopoka').build()
                    ], 
                    1)]),
                    new Viewport(
                        new ViewportConstraints(
                            new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                            new Margin(-500, -600, -500, -600),
                            0.1,
                            8,
                            new Vector2(800, 800)),
                        new Vector2(100, 200),
                        1.5,
                        0
                    ),
                    rendererFactoryWithDummyImageStroage(),
                    inputReceiverFactory()
                );
                result.selection = new Selection(result.design.layers.get(0).items.get(1));

                return result;
            }
        }
    ];

    testCases.forEach(({ title, initialViewer, sendInput, expected }) => {
        test(title, async () => {
            const viewer = initialViewer();
            await sendInput(viewer.inputReceiver);

            assertViewer(viewer, expected());
        });
    });
});