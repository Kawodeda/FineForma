import { suite, test } from 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { 
    ClearSelectionCommand,
    Command,
    Design, 
    Layer, 
    Margin, 
    MoveItemCommand,
    Rectangle,
    SelectItemAtCommand, 
    SelectItemCommand, 
    Selection, 
    Vector2, 
    Viewer,
    Viewport,
    ViewportConstraints,
    createCircle,
    createRectangle
} from 'fine-forma-core';

import { inputReceiverFactory, rendererFactoryWithDummyImageStroage } from '../Utils';

chai.use(chaiAsPromised);
const expect = chai.expect;

suite('Manipulate selection', () => {

    test('select item', async () => {
        const viewer = new Viewer(
            new Design([
                new Layer([createCircle(9, 9, 70).build()], 0),
                new Layer([createRectangle(80, 0, 100, 100).build()], 2),
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
            inputReceiverFactory());
        
        await viewer.execute(new Command([], [], [
            new SelectItemCommand(viewer.design.layers.get(1).items.get(0))
        ]));

        expect(viewer.selection.single).to.be.equal(viewer.design.layers.get(1).items.get(0));
    });

    test('select item at index', async () => {
        const viewer = new Viewer(
            new Design([
                new Layer([createCircle(9, 9, 70).build()], 0),
                new Layer([createRectangle(80, 0, 100, 100).build()], 2),
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
            inputReceiverFactory());
        
        await viewer.execute(new Command([], [], [
            new SelectItemAtCommand(1, 0)
        ]));

        expect(viewer.selection.single).to.be.equal(viewer.design.layers.get(1).items.get(0));
    });

    test('select changed item at index', async () => {
        const viewer = new Viewer(
            new Design([
                new Layer([createCircle(9, 9, 70).build()], 0),
                new Layer([createRectangle(80, 0, 100, 100).build()], 2),
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
            inputReceiverFactory());

        await viewer.execute(new Command([
            new MoveItemCommand(
                viewer.design.layers.get(1).items.get(0),
                new Vector2(10, 20))
        ], [], []));

        await viewer.execute(new Command([], [], [
            new SelectItemAtCommand(1, 0)
        ]));

        expect(viewer.selection.single).to.be.equal(viewer.design.layers.get(1).items.get(0));
        expect(viewer.selection.single.equals(createRectangle(90, 20, 100, 100).build())).to.be.true;
    });

    test('clear selection', async () => {
        const viewer = new Viewer(
            new Design([
                new Layer([createCircle(9, 9, 70).build()], 0),
                new Layer([createRectangle(80, 0, 100, 100).build()], 2),
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
            inputReceiverFactory());
        
        viewer.selection = new Selection([
            viewer.design.layers.get(0).items.get(0),
            viewer.design.layers.get(1).items.get(0)
        ]);

        await viewer.execute(new Command([], [], [
            new ClearSelectionCommand()
        ]));

        expect(viewer.selection.isEmpty).to.be.true;
        expect(viewer.selection.items).to.be.deep.equal([]);
    });

    const invalidTestCases = [
        {
            title: 'select missing item',
            viewer: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-100, -1000), new Vector2(500, 500)), 
                        new Margin(0, 0, 150, 150), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [], [
                    new SelectItemCommand(createCircle(9, 9, 70).build())
                ]));
            }
        },
        {
            title: 'select changed item',
            viewer: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-100, -1000), new Vector2(500, 500)), 
                        new Margin(0, 0, 150, 150), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()),
            actions: async (viewer: Viewer) => {
                const changedItem = viewer.design.layers.get(0).items.get(0);

                await viewer.execute(new Command([
                    new MoveItemCommand(changedItem, new Vector2(19, -100))
                ], [], []));

                await viewer.execute(new Command([], [], [
                    new SelectItemCommand(changedItem)
                ]));
            }
        },
        {
            title: 'select missing item at index #1',
            viewer: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-100, -1000), new Vector2(500, 500)), 
                        new Margin(0, 0, 150, 150), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [], [
                    new SelectItemAtCommand(0, 1)
                ]));
            }
        },
        {
            title: 'select missing item at index #2',
            viewer: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(
                        new Rectangle(new Vector2(-100, -1000), new Vector2(500, 500)), 
                        new Margin(0, 0, 150, 150), 
                        0.2, 
                        5),
                    new Vector2(500, 500),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage(),
                inputReceiverFactory()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [], [
                    new SelectItemAtCommand(2, 0)
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