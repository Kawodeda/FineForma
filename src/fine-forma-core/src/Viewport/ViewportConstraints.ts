import { Margin, Rectangle, Vector2, clamp, isRealNumber, nearlyEquals } from '../Math';
import { IViewportConstraints } from './IViewportConstraints';

export class ViewportConstraints implements IViewportConstraints {

    private readonly _workarea: Rectangle;
    private readonly _workareaMargin: Margin;
    private readonly _minZoom: number;
    private readonly _maxZoom: number;
    private readonly _viewportSize: Vector2;
    
    constructor(workarea: Rectangle, workareaMargin: Margin, minZoom: number, maxZoom: number, viewportSize: Vector2) {
        this._workarea = workarea;
        this._workareaMargin = workareaMargin;
        this._minZoom = minZoom;
        this._maxZoom = maxZoom;
        this._viewportSize = viewportSize;
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

    get viewportSize(): Vector2 {
        return this._viewportSize;
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

    constrainZoom(zoom: number): number {
        return clamp(zoom, this.minZoom, this.maxZoom);
    }

    constrainScroll(zoom: number, scroll: Vector2): Vector2 {
        if (this.isValidScroll(scroll, zoom, this.viewportSize)) {
            return scroll;
        }

        const scrollableArea = this._scrollableArea(this.viewportSize, zoom);
        console.log('constrain scroll');

        return clamp(scroll, scrollableArea.corner1, scrollableArea.corner2);
    }

    constrainAngle(angle: number): number {
        return this.isValidAngle(angle) ? angle : 0;
    }

    equals(other: ViewportConstraints): boolean {
        return this._workarea.equals(other.workarea)
            && this._workareaMargin.equals(other.workareaMargin)
            && nearlyEquals(this.minZoom, other.minZoom)
            && nearlyEquals(this.maxZoom, other.maxZoom);
    }

    private _scrollableArea(viewportSize: Vector2, zoom: number): Rectangle {
        const actualWorkarea = this._scaleRectangle(this.workarea, zoom);
        const actualMargin = new Rectangle(
            this.viewportSize.subtract(this.workareaMargin.rectangle.corner1),
            this.viewportSize.add(this.workareaMargin.rectangle.corner2)
        );

        return new Rectangle(
            actualWorkarea.corner1.subtract(actualMargin.corner1),
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