import { suite, test } from 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { 
    Design,
    Layer,
    Vector2,
    Viewer, 
    Viewport,
    ViewportConstraints,
    createEllipse,
    createImage,
    createRectangle,
    Command,
    AddLayerCommand,
    RemoveLayerCommand,
    Rectangle,
    Margin
} from 'fine-forma-core';

import { assertViewer, inputReceiverFactory, rendererFactoryWithDummyImageStroage } from '../Utils';

chai.use(chaiAsPromised);
const expect = chai.expect;

suite('Manipulate layers', () => {
    const testCases = [
        {
            title: 'add layers to blank design, separate commands',
            viewer: new Viewer(
                new Design([]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(0, 0, 0, 0), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(0, 0),
                    1,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new AddLayerCommand(new Layer([], 11))
                ]));
                await viewer.execute(new Command([
                    new AddLayerCommand(new Layer([createRectangle(0, 0, 100, 100).build()], -2))
                ]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([], 11),
                    new Layer([createRectangle(0, 0, 100, 100).build()], -2)
                ]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(0, 0, 0, 0), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(0, 0),
                    1,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory())
        },
        {
            title: 'add layers to blank design, single command',
            viewer: new Viewer(
                new Design([]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(0, 0, 0, 0), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(0, 0),
                    1,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new AddLayerCommand(new Layer([], 11)),
                    new AddLayerCommand(new Layer([createRectangle(0, 0, 100, 100).build()], -2))
                ]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([], 11),
                    new Layer([createRectangle(0, 0, 100, 100).build()], -2)
                ]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(0, 0, 0, 0), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(0, 0),
                    1,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory())
        },
        {
            title: 'add layers to design, single command',
            viewer: new Viewer(
                new Design([new Layer([createRectangle(90, 1, 40, 500).build()], 1)]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(0, 0, 0, 0), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(1, 2),
                    1.3,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new AddLayerCommand(new Layer([], 11)),
                    new AddLayerCommand(new Layer([createRectangle(0, 0, 100, 100).build()], -2))
                ]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([], 11),
                    new Layer([createRectangle(90, 1, 40, 500).build()], 1),
                    new Layer([createRectangle(0, 0, 100, 100).build()], -2)
                ]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(0, 0, 0, 0), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(1, 2),
                    1.3,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory())
        },
        {
            title: 'add a layer to design',
            viewer: new Viewer(
                new Design([new Layer([createRectangle(90, 1, 40, 500).build()], 1)]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(150, 150, 150, 150), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new AddLayerCommand(new Layer([
                        createImage(64, 128, 200, 200, 'poka').build(),
                        createEllipse(400, -11, 300, 190).build()
                    ], 0))
                ]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([
                        createImage(64, 128, 200, 200, 'poka').build(),
                        createEllipse(400, -11, 300, 190).build()
                    ], 0),
                    new Layer([createRectangle(90, 1, 40, 500).build()], 1),
                ]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(150, 150, 150, 150), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory())
        },
        {
            title: 'remove a layer from design',
            viewer: new Viewer(
                new Design([new Layer([createRectangle(90, 1, 40, 500).build()], 1)]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(150, 150, 150, 150), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new RemoveLayerCommand(viewer.design.layers.elements[0]!)
                ]));
            },
            expected: new Viewer(
                new Design([]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(150, 150, 150, 150), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory())
        },
        {
            title: 'remove layers from design, single command',
            viewer: new Viewer(
                new Design([
                    new Layer([], 11),
                    new Layer([createRectangle(90, 1, 40, 500).build()], 1),
                    new Layer([createRectangle(0, 0, 100, 100).build()], -2)
                ]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(150, 150, 150, 150), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new RemoveLayerCommand(viewer.design.layers.elements[0]!),
                    new RemoveLayerCommand(viewer.design.layers.elements[2]!),
                ]));
            },
            expected: new Viewer(
                new Design([new Layer([createRectangle(90, 1, 40, 500).build()], 1)]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(150, 150, 150, 150), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory())
        }
    ];

    testCases.forEach(({ title, viewer, actions, expected }) => {
        test(title, async () => {
            await actions(viewer);

            assertViewer(viewer, expected);
        });
    });

    const invalidTestCases = [
        {
            title: 'remove layer from blank design',
            viewer: new Viewer(
                new Design([]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(150, 150, 150, 150), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new RemoveLayerCommand(new Layer([], 0)),
                ]));
            }
        },
        {
            title: 'remove non-existing layer from design #1',
            viewer: new Viewer(
                new Design([new Layer([createRectangle(90, 1, 40, 500).build()], 1)]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(150, 150, 150, 150), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new RemoveLayerCommand(new Layer([createEllipse(90, 1, 40, 500).build()], 1)),
                ]));
            }
        },
        {
            title: 'remove non-existing layer from design #2',
            viewer: new Viewer(
                new Design([new Layer([createRectangle(90, 1, 40, 500).build()], 1)]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(0, 0), new Vector2(500, 500)), 
                        new Margin(150, 150, 150, 150), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new RemoveLayerCommand(new Layer([createRectangle(90, 1, 40, 500).build()], 1)),
                ]));
            }
        },
    ];

    invalidTestCases.forEach(({ title, viewer, actions }) => {
        test(title, async () => {
            await expect(actions(viewer)).to.be.eventually.rejected;
        });
    });
});