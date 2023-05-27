import { suite, test } from 'mocha';

import { 
    Viewer, 
    IInputReceiver, 
    Design,
    Layer,
    createCircle,
    Viewport,
    ViewportConstraints,
    Vector2,
    InputReceiver,
    ViewportInputHandler,
    Rectangle,
    Margin,
    createImage
} from 'fine-forma-core';

import { assertViewer, rendererFactoryWithDummyImageStroage } from '../Utils';

suite('Input handling', () => {
    const inputReceiverFactory = { 
        create: (viewer: Viewer) => new InputReceiver(
            new ViewportInputHandler({ wheelZoomSensitivity: 1, wheelScrollSensitivity: 1 }), 
            viewer
        ) 
    };

    const testCases = [
        {
            title: 'zoom in by wheel',
            initialViewer: () => new Viewer(
                new Design([new Layer([
                    createCircle(100, 200, 100).build(),
                    createImage(400, 500, 200, 150, 'popopoka').build()
                ], 
                1)]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                        new Margin(200, 200, 200, 200),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(0, 0),
                    1,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory
            ),
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -200),
                    button: 'unknown',
                    position: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, 50),
                    button: 'unknown',
                    position: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
            },
            expected: () => new Viewer(
                new Design([new Layer([
                    createCircle(100, 200, 100).build(),
                    createImage(400, 500, 200, 150, 'popopoka').build()
                ], 
                1)]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                        new Margin(200, 200, 200, 200),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(140, 130),
                    1.3,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory
            )
        },
        {
            title: 'zoom in by wheel over limit',
            initialViewer: () => new Viewer(
                new Design([new Layer([
                    createCircle(100, 200, 100).build(),
                    createImage(400, 500, 200, 150, 'popopoka').build()
                ], 
                1)]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                        new Margin(200, 200, 200, 200),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(0, 0),
                    1,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory
            ),
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    position: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    position: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    position: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    position: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    position: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    position: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    position: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    position: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
            },
            expected: () => new Viewer(
                new Design([new Layer([
                    createCircle(100, 200, 100).build(),
                    createImage(400, 500, 200, 150, 'popopoka').build()
                ], 
                1)]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                        new Margin(200, 200, 200, 200),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(2800, 2800),
                    8,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory
            )
        },
        {
            title: 'zoom out by wheel #1',
            initialViewer: () => new Viewer(
                new Design([new Layer([
                    createCircle(100, 200, 100).build(),
                    createImage(400, 500, 200, 150, 'popopoka').build()
                ], 
                1)]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                        new Margin(200, 200, 200, 200),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(0, 0),
                    1,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory
            ),
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, 100),
                    button: 'unknown',
                    position: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, 100),
                    button: 'unknown',
                    position: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
            },
            expected: () => new Viewer(
                new Design([new Layer([
                    createCircle(100, 200, 100).build(),
                    createImage(400, 500, 200, 150, 'popopoka').build()
                ], 
                1)]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                        new Margin(200, 200, 200, 200),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(-80, -120),
                    0.6,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory
            )
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