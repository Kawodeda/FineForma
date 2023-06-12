import { Rectangle } from '../Math';

export interface IRotationGrip {

    get size(): number;

    get offset(): number;

    getRectangle(itemBounds: Rectangle, zoom: number): Rectangle;
}