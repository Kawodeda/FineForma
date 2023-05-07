import { Vector2, isRealNumber, nearlyEquals } from '../Math';

export class ViewportConstraints {

    private readonly _minScroll: Vector2;
    private readonly _maxScroll: Vector2;
    private readonly _minZoom: number;
    private readonly _maxZoom: number;
    
    constructor(minScroll: Vector2, maxScroll: Vector2, minZoom: number, maxZoom: number) {
        this._minScroll = minScroll;
        this._maxScroll = maxScroll;
        this._minZoom = minZoom;
        this._maxZoom = maxZoom;
    }

    get minScroll(): Vector2 {
        return this._minScroll;
    }

    get maxScroll(): Vector2 {
        return this._maxScroll;
    }

    get minZoom(): number {
        return this._minZoom;
    }

    get maxZoom(): number {
        return this._maxZoom;
    }

    isValidScroll(scroll: Vector2): boolean {
        return (scroll.x > this.minScroll.x || nearlyEquals(scroll.x, this.minScroll.x)) 
            && (scroll.y > this.minScroll.y || nearlyEquals(scroll.y, this.minScroll.y))
            && (scroll.x < this.maxScroll.x || nearlyEquals(scroll.x, this.maxScroll.x))
            && (scroll.y < this.maxScroll.y || nearlyEquals(scroll.y, this.maxScroll.y));
    }

    isValidZoom(zoom: number): boolean {
        return isRealNumber(zoom) 
            && (zoom > this.minZoom || nearlyEquals(zoom, this.minZoom)) 
            && (zoom <= this.maxZoom || nearlyEquals(zoom, this.maxZoom));
    }

    isValidAngle(angle: number): boolean {
        return isRealNumber(angle);
    }
}