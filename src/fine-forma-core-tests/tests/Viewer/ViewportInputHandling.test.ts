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

import { assertViewer, inputReceiverFactory, rendererFactoryWithDummyImageStroage } from '../Utils';

suite('Viewport input handling', () => {
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
                inputReceiverFactory()
            ),
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -200),
                    button: 'unknown',
                    viewportPosition: new Vector2(400, 400),
                    workspacePosition: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, 50),
                    button: 'unknown',
                    viewportPosition: new Vector2(120, 260),
                    workspacePosition: new Vector2(200, 300),
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
                inputReceiverFactory()
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
                inputReceiverFactory()
            ),
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    viewportPosition: new Vector2(400, 400),
                    workspacePosition: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    viewportPosition: new Vector2(400, 400),
                    workspacePosition: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    viewportPosition: new Vector2(400, 400),
                    workspacePosition: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    viewportPosition: new Vector2(400, 400),
                    workspacePosition: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    viewportPosition: new Vector2(400, 400),
                    workspacePosition: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    viewportPosition: new Vector2(400, 400),
                    workspacePosition: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    viewportPosition: new Vector2(400, 400),
                    workspacePosition: new Vector2(400, 400),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -500),
                    button: 'unknown',
                    viewportPosition: new Vector2(400, 400),
                    workspacePosition: new Vector2(400, 400),
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
                inputReceiverFactory()
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
                inputReceiverFactory()
            ),
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, 100),
                    button: 'unknown',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: true,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, 100),
                    button: 'unknown',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
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
                inputReceiverFactory()
            )
        },
        {
            title: 'vertical scroll by wheel',
            initialViewer: () => new Viewer(
                new Design([new Layer([
                    createCircle(100, 200, 100).build(),
                    createImage(400, 500, 200, 150, 'popopoka').build()
                ], 
                1)]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                        new Margin(-600, -600, -600, -600),
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
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, 300),
                    button: 'unknown',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -100),
                    button: 'unknown',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
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
                        new Margin(-600, -600, -600, -600),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(0, 50),
                    1,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()
            )
        },
        {
            title: 'vertical scroll by wheel over limit',
            initialViewer: () => new Viewer(
                new Design([new Layer([
                    createCircle(100, 200, 100).build(),
                    createImage(400, 500, 200, 150, 'popopoka').build()
                ], 
                1)]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                        new Margin(-600, -600, -600, -600),
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
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, 300),
                    button: 'unknown',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, 300),
                    button: 'unknown',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, 300),
                    button: 'unknown',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
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
                        new Margin(-600, -600, -600, -600),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(0, 200),
                    1,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()
            )
        },
        {
            title: 'horizontal scroll by wheel',
            initialViewer: () => new Viewer(
                new Design([new Layer([
                    createCircle(100, 200, 100).build(),
                    createImage(400, 500, 200, 150, 'popopoka').build()
                ], 
                1)]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                        new Margin(-600, -600, -600, -600),
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
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, 300),
                    button: 'unknown',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: true
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, -100),
                    button: 'unknown',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: true
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
                        new Margin(-600, -600, -600, -600),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(50, 0),
                    1,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()
            )
        },
        {
            title: 'horizontal scroll by wheel over limit',
            initialViewer: () => new Viewer(
                new Design([new Layer([
                    createCircle(100, 200, 100).build(),
                    createImage(400, 500, 200, 150, 'popopoka').build()
                ], 
                1)]),
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(800, 800)),
                        new Margin(-600, -600, -600, -600),
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
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, 300),
                    button: 'unknown',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: true
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, 300),
                    button: 'unknown',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: true
                });
                await inputReceiver.sendWheel({
                    delta: new Vector2(0, 300),
                    button: 'unknown',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: true
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
                        new Margin(-600, -600, -600, -600),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(200, 0),
                    1,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()
            )
        },
        {
            title: 'drag workspace by mouse',
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
                    button: 'right',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(250, 320),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(300, 350),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(400, 460),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseUp({
                    button: 'right',
                    viewportPosition: new Vector2(400, 460),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
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
                        new Margin(-500, -600, -500, -600),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(-200, -160),
                    1,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()
            )
        },
        {
            title: 'drag workspace by mouse over limit',
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
                    button: 'right',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(250, 320),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(300, 350),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(550, 460),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(600, 270),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseUp({
                    button: 'right',
                    viewportPosition: new Vector2(600, 270),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
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
                        new Margin(-500, -600, -500, -600),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(-300, 30),
                    1,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()
            )
        },
        {
            title: 'drag workspace by mouse with zoom',
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
                    1.5,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()
            ),
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'right',
                    viewportPosition: new Vector2(200, 300),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(250, 320),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(300, 350),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(400, 460),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseUp({
                    button: 'right',
                    viewportPosition: new Vector2(400, 460),
                    workspacePosition: new Vector2(200, 300),
                    altKey: false,
                    ctrlKey: false,
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
                        new Margin(-500, -600, -500, -600),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(-200, -160),
                    1.5,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()
            )
        },
        {
            title: 'drag workspace by mouse over limit with zoom',
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
                    1.5,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()
            ),
            sendInput: async (inputReceiver: IInputReceiver) => {
                await inputReceiver.sendMouseDown({
                    button: 'right',
                    viewportPosition: new Vector2(750, 300),
                    workspacePosition: new Vector2(750, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(600, 320),
                    workspacePosition: new Vector2(750, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(400, 350),
                    workspacePosition: new Vector2(750, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(200, 460),
                    workspacePosition: new Vector2(750, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(11, 460),
                    workspacePosition: new Vector2(750, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseMove({
                    button: 'right',
                    viewportPosition: new Vector2(11, 500),
                    workspacePosition: new Vector2(750, 300),
                    altKey: false,
                    ctrlKey: false,
                    shiftKey: false
                });
                await inputReceiver.sendMouseUp({
                    button: 'right',
                    viewportPosition: new Vector2(11, 500),
                    workspacePosition: new Vector2(750, 300),
                    altKey: false,
                    ctrlKey: false,
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
                        new Margin(-500, -600, -500, -600),
                        0.1,
                        8,
                        new Vector2(800, 800)),
                    new Vector2(700, -200),
                    1.5,
                    0
                ),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()
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