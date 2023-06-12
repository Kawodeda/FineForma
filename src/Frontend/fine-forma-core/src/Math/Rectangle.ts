import { nearlyEquals } from './Utils';
import { Vector2 } from './Vector2';

export class Rectangle {

    private readonly _corner1: Vector2;
    private readonly _corner2: Vector2;

    constructor(corner1: Vector2, corner2: Vector2) {
        this._corner1 = corner1;
        this._corner2 = corner2;
    }

    get corner1(): Vector2 {
        return this._corner1;
    }

    get corner2(): Vector2 {
        return this._corner2;
    }

    get center(): Vector2 {
        return this.corner1
            .add(this.corner2)
            .scale(1 / 2);
    }

    get size(): Vector2 {
        return this.corner2.subtract(this.corner1);
    }

    get width(): number {
        return this.size.x;
    }

    get height(): number {
        return this.size.y;
    }

    static from(center: Vector2, width: number, height: number): Rectangle {
        const cornerOffset = new Vector2(width / 2, height / 2);
        
        return new Rectangle(
            center.subtract(cornerOffset),
            center.add(cornerOffset)
        );
    }

    contains(point: Vector2): boolean {
        return (point.x > this.corner1.x || nearlyEquals(point.x, this.corner1.x))
            && (point.y > this.corner1.y || nearlyEquals(point.y, this.corner1.y))
            && (point.x < this.corner2.x || nearlyEquals(point.x, this.corner2.x))
            && (point.y < this.corner2.y || nearlyEquals(point.y, this.corner2.y));
    }

    equals(other: Rectangle): boolean {
        return this.corner1.equals(other.corner1)
            && this.corner2.equals(other.corner2);
    }
}