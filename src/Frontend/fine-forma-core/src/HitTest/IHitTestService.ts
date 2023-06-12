import { Rectangle, Vector2 } from '../Math';
import { Transform } from '../Transform';
import { IHitTestResult } from './IHitTestResult';

export interface IHitTestService {

    hitTest(point: Vector2): IHitTestResult;

    hitTestRectangle(point: Vector2, rectangle: Rectangle, transform: Transform): boolean;
}