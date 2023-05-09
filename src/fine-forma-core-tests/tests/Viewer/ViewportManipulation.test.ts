import { suite, test } from 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import {
    AddZoomCommand,
    Command,
    Design,
    Layer,
    ScrollCommand,
    Vector2,
    Viewer,
    Viewport,
    ViewportConstraints,
    ZoomCommand,
    createCircle,
    createRectangle
} from 'fine-forma-core';

import { assertViewer, rendererFactoryWithDummyImageStroage } from '../Utils';

chai.use(chaiAsPromised);
const expect = chai.expect;

suite('Manipulate viewport', () => {
    const testCases = [
        {
            title: 'scroll #1',
            viewer: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(0, 0), new Vector2(500, 500), 0.2, 5),
                    new Vector2(0, 0),
                    1,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [new ScrollCommand(new Vector2(0, 156.8))]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(0, 0), new Vector2(500, 500), 0.2, 5),
                    new Vector2(0, 156.8),
                    1,
                    0),
                rendererFactoryWithDummyImageStroage())
        },
        {
            title: 'scroll #2',
            viewer: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-500, -500), new Vector2(500, 500), 0.2, 5),
                    new Vector2(-100, -60),
                    2,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [new ScrollCommand(new Vector2(138, 156.8))]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-500, -500), new Vector2(500, 500), 0.2, 5),
                    new Vector2(38, 96.8),
                    2,
                    0),
                rendererFactoryWithDummyImageStroage())
        },
        {
            title: 'scroll #3',
            viewer: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-500, -500), new Vector2(500, 500), 0.2, 5),
                    new Vector2(-100, -60),
                    2,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [new ScrollCommand(new Vector2(-100, -200))]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-500, -500), new Vector2(500, 500), 0.2, 5),
                    new Vector2(-200, -260),
                    2,
                    0),
                rendererFactoryWithDummyImageStroage())
        },
        {
            title: 'zoom #1',
            viewer: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-500, -500), new Vector2(500, 500), 0.2, 5),
                    new Vector2(-100, -60),
                    1.1,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [new ZoomCommand(2)]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-500, -500), new Vector2(500, 500), 0.2, 5),
                    new Vector2(-100, -60),
                    2.2,
                    0),
                rendererFactoryWithDummyImageStroage())
        },
        {
            title: 'zoom #2',
            viewer: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-500, -500), new Vector2(500, 500), 0.2, 5),
                    new Vector2(-100, -60),
                    1.5,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [new ZoomCommand(0.5)]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-500, -500), new Vector2(500, 500), 0.2, 5),
                    new Vector2(-100, -60),
                    0.75,
                    0),
                rendererFactoryWithDummyImageStroage())
        },
        {
            title: 'add zoom #1',
            viewer: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-500, -500), new Vector2(500, 500), 0.2, 5),
                    new Vector2(-100, -60),
                    1.1,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [new AddZoomCommand(2)]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-500, -500), new Vector2(500, 500), 0.2, 5),
                    new Vector2(-100, -60),
                    3.1,
                    0),
                rendererFactoryWithDummyImageStroage())
        },
        {
            title: 'add zoom #2',
            viewer: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-500, -500), new Vector2(500, 500), 0.2, 5),
                    new Vector2(-100, -60),
                    1.5,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [new AddZoomCommand(-1)]));
            },
            expected: new Viewer(
                new Design([
                    new Layer([createCircle(9, 9, 70).build()], 0),
                    new Layer([createRectangle(80, 0, 100, 100).build()], 2),
                ]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-500, -500), new Vector2(500, 500), 0.2, 5),
                    new Vector2(-100, -60),
                    0.5,
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
            title: 'scroll out of constrained area #1',
            viewer: new Viewer(
                new Design([]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-100, -1000), new Vector2(500, 500), 0.2, 5),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [new ScrollCommand(new Vector2(-300, 0))]));
            }
        },
        {
            title: 'scroll out of constrained area #2',
            viewer: new Viewer(
                new Design([]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-100, -1000), new Vector2(500, 500), 0.2, 5),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [new ScrollCommand(new Vector2(401, 401))]));
            }
        },
        {
            title: 'zoom out of constraints #1',
            viewer: new Viewer(
                new Design([]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-100, -1000), new Vector2(500, 500), 0.2, 5),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [new ZoomCommand(0.1)]));
            }
        },
        {
            title: 'zoom out of constraints #2',
            viewer: new Viewer(
                new Design([]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-100, -1000), new Vector2(500, 500), 0.2, 5),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [new ZoomCommand(8)]));
            }
        },
        {
            title: 'zoom out of constraints #3',
            viewer: new Viewer(
                new Design([]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-100, -1000), new Vector2(500, 500), 0.2, 5),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [new AddZoomCommand(5)]));
            }
        },
        {
            title: 'zoom out of constraints #4',
            viewer: new Viewer(
                new Design([]), 
                new Viewport(
                    new ViewportConstraints(new Vector2(-100, -1000), new Vector2(500, 500), 0.2, 5),
                    new Vector2(100, 100),
                    0.9,
                    0),
                rendererFactoryWithDummyImageStroage()),
            actions: async (viewer: Viewer) => {
                await viewer.execute(new Command([], [new AddZoomCommand(-1)]));
            }
        }
    ];

    invalidTestCases.forEach(({ title, viewer, actions }) => {
        test(title, async () => {
            await expect(actions(viewer)).to.be.eventually.rejected;
        });
    });
});