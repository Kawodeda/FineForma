import { Margin, Rectangle, Vector2, isRealNumber, nearlyEquals } from '../Math';

export class ViewportConstraints {

    private readonly _workarea: Rectangle;
    private readonly _workareaMargin: Margin;
    private readonly _minZoom: number;
    private readonly _maxZoom: number;
    
    constructor(workarea: Rectangle, workareaMargin: Margin, minZoom: number, maxZoom: number) {
        this._workarea = workarea;
        this._workareaMargin = workareaMargin;
        this._minZoom = minZoom;
        this._maxZoom = maxZoom;
    }

    get workarea(): Rectangle {
        return this._workarea;
    }

    get workareaMargin(): Margin {
        return this._workareaMargin;
    }

    get minZoom(): number {
        return this._minZoom;
    }

    get maxZoom(): number {
        return this._maxZoom;
    }

    isValidScroll(scroll: Vector2, zoom: number, viewportSize: Vector2): boolean {
        return this._scrollableArea(viewportSize, zoom).contains(scroll);
    }

    isValidZoom(zoom: number): boolean {
        return isRealNumber(zoom) 
            && (zoom > this.minZoom || nearlyEquals(zoom, this.minZoom)) 
            && (zoom <= this.maxZoom || nearlyEquals(zoom, this.maxZoom));
    }

    isValidAngle(angle: number): boolean {
        return isRealNumber(angle);
    }

    equals(other: ViewportConstraints): boolean {
        return this._workarea.equals(other.workarea)
            && this._workareaMargin.equals(other.workareaMargin)
            && nearlyEquals(this.minZoom, other.minZoom)
            && nearlyEquals(this.maxZoom, other.maxZoom);
    }

    private _scrollableArea(viewportSize: Vector2, zoom: number): Rectangle {
        const actualWorkarea = this._scaleRectangle(this.workarea, zoom);
        const actualMargin = this._scaleRectangle(this.workareaMargin.rectangle, 1 / zoom);

        return new Rectangle(
            actualWorkarea.corner1.add(actualMargin.corner1),
            actualWorkarea.corner1
                .add(actualMargin.corner2)
                .add(actualWorkarea.size)
                .subtract(viewportSize)
        );
    }

    private _scaleRectangle(rectangle: Rectangle, factor: number): Rectangle {
        return new Rectangle(
            rectangle.corner1.scale(factor),
            rectangle.corner2.scale(factor)
        );
    }
}