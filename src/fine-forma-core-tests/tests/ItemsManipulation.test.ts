import { suite, test } from 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import {
    AddItemToLayerAtCommand,
    AddItemToLayerCommand,
    Command,
    Design,
    Layer,
    RemoveItemCommand,
    Vector2,
    Viewer, 
    Viewport,
    ViewportConstraints,
    createCircle,
    createImage,
    createLine,
    createRectangle
} from 'fine-forma-core';

import { assertViewer, rendererFactoryWithDummyImageStroage } from './Utils';

chai.use(chaiAsPromised);
const expect = chai.expect;

suite('Manipulate items', () => {
    const testCases = [
        {
            title: 'add items to design, particular layer',
            viewer: new Viewer(
                new Design([new Layer([createCircle(9, 9, 70).build()], 0)]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(0, 0), new Vector2(500, 500), 0.2, 5),
                    new Vector2(0, 100),
                    2,
                    90),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new AddItemToLayerCommand(createRectangle(80, 0, 100, 100).build(), viewer.design.layers.get(0))
                ]));
                await viewer.execute(new Command([
                    new AddItemToLayerCommand(createLine(-100, 0, 100, 100).build(), viewer.design.layers.get(0))
                ]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([
                        createCircle(9, 9, 70).build(),
                        createRectangle(80, 0, 100, 100).build(),
                        createLine(-100, 0, 100, 100).build()
                    ], 0)
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(0, 0), new Vector2(500, 500), 0.2, 5),
                    new Vector2(0, 100),
                    2,
                    90),
                rendererFactoryWithDummyImageStroage())
        },
        {
            title: 'add items to design, layer at index, single command',
            viewer: new Viewer(
                new Design([new Layer([createCircle(9, 9, 70).build()], 0)]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(0, 0), new Vector2(500, 500), 0.2, 5),
                    new Vector2(0, 100),
                    2,
                    90),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new AddItemToLayerAtCommand(createLine(-100, 0, 100, 100).build(), 0),
                    new AddItemToLayerAtCommand(createRectangle(80, 0, 100, 100).build(), 0)
                ]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([
                        createCircle(9, 9, 70).build(),
                        createLine(-100, 0, 100, 100).build(),
                        createRectangle(80, 0, 100, 100).build()
                    ], 0)
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(0, 0), new Vector2(500, 500), 0.2, 5),
                    new Vector2(0, 100),
                    2,
                    90),
                rendererFactoryWithDummyImageStroage())
        },
        {
            title: 'add items to design, layer at index, separate commands',
            viewer: new Viewer(
                new Design([new Layer([createCircle(9, 9, 70).build()], 0)]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(0, 0), new Vector2(500, 500), 0.2, 5),
                    new Vector2(0, 100),
                    2,
                    90),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new AddItemToLayerAtCommand(createLine(-100, 0, 100, 100).build(), 0)
                ]));
                await viewer.execute(new Command([
                    new AddItemToLayerAtCommand(createRectangle(80, 0, 100, 100).build(), 0)
                ]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([
                        createCircle(9, 9, 70).build(),
                        createLine(-100, 0, 100, 100).build(),
                        createRectangle(80, 0, 100, 100).build()
                    ], 0)
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(0, 0), new Vector2(500, 500), 0.2, 5),
                    new Vector2(0, 100),
                    2,
                    90),
                rendererFactoryWithDummyImageStroage())
        },
        {
            title: 'remove items from design',
            viewer: new Viewer(
                new Design([
                    new Layer([
                        createCircle(9, 9, 70).build(),
                        createLine(-100, 0, 100, 100).build(),
                        createRectangle(80, 0, 100, 100).build()
                    ], 0),
                    new Layer([
                        createRectangle(800, 0, 10, 10).build(),
                        createImage(600, 400, 500, 500, 'poka').build(),
                    ], -100)
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(0, 0), new Vector2(500, 500), 0.2, 5),
                    new Vector2(0, 100),
                    2,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new RemoveItemCommand(viewer.design.layers.get(1).items.get(1)),
                    new RemoveItemCommand(viewer.design.layers.get(0).items.get(0)),
                    new RemoveItemCommand(viewer.design.layers.get(1).items.get(2))
                ]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([
                        createCircle(9, 9, 70).build()
                    ], 0),
                    new Layer([
                        createImage(600, 400, 500, 500, 'poka').build(),
                    ], -100)
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(0, 0), new Vector2(500, 500), 0.2, 5),
                    new Vector2(0, 100),
                    2,
                    0),
                rendererFactoryWithDummyImageStroage())
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
            title: 'add item to missing layer',
            viewer: new Viewer(
                new Design([new Layer([createCircle(9, 9, 70).build()], 0)]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(0, 0), new Vector2(500, 500), 0.2, 5),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new AddItemToLayerCommand(createRectangle(0, 0, 200, 300).build(), new Layer([], 0))
                ]));
            }
        },
        {
            title: 'add item to missing layer by index',
            viewer: new Viewer(
                new Design([new Layer([createCircle(9, 9, 70).build()], 0)]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(0, 0), new Vector2(500, 500), 0.2, 5),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new AddItemToLayerAtCommand(createRectangle(0, 0, 200, 300).build(), 1)
                ]));
            }
        },
        {
            title: 'remove missing item from design',
            viewer: new Viewer(
                new Design([new Layer([createCircle(9, 9, 70).build()], 0)]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(0, 0), new Vector2(500, 500), 0.2, 5),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([
                    new RemoveItemCommand(createRectangle(0, 0, 200, 300).build())
                ]));
            }
        }
    ];

    invalidTestCases.forEach(({ title, viewer, actions }) => {
        test(title, async () => {
            await expect(actions(viewer)).to.be.eventually.rejected;
        });
    });
});