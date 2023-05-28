import { Vector2 } from '../Math';
import { IHitTestResult } from './IHitTestResult';

export interface IHitTestService {

    hitTest(point: Vector2): IHitTestResult;
}