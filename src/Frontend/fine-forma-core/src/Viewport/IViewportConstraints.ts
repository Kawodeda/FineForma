import { Vector2 } from '../Math';

export interface IViewportConstraints {

    isValidZoom(zoom: number): boolean;

    constrainZoom(zoom: number): number;

    constrainScroll(zoom: number, scroll: Vector2): Vector2;

    constrainAngle(angle: number): number;
}