import { Rectangle, Vector2 } from '../../../Math';
import { EllipseControls, LineControls, RectangleControls } from '../Controls';
import { ClosedShapeBuilder } from './ClosedShapeBuilder';
import { ImageBuilder } from './ImageBuilder';
import { OpenShapeBuilder } from './OpenShapeBuilder';

export function createRectangle(x: number, y: number, width: number, height: number): ClosedShapeBuilder {
    return new ClosedShapeBuilder(
        new RectangleControls(new Vector2(-width / 2, -height / 2), new Vector2(width / 2, height / 2)), 
        new Vector2(x, y)
    );
}

export function createEllipse(x: number, y: number, width: number, height: number): ClosedShapeBuilder {
    return new ClosedShapeBuilder(
        new EllipseControls(new Rectangle(new Vector2(-width / 2, -height / 2), new Vector2(width / 2, height / 2))), 
        new Vector2(x, y)
    );
}

export function createCircle(x: number, y: number, radius: number): ClosedShapeBuilder {
    return new ClosedShapeBuilder(
        new EllipseControls(new Rectangle(new Vector2(-radius, -radius), new Vector2(radius, radius))), 
        new Vector2(x, y)
    );
}

export function createLine(x1: number, y1: number, x2: number, y2: number): OpenShapeBuilder {
    return new OpenShapeBuilder(
        new LineControls(Vector2.zero, new Vector2(x2, y2)), 
        new Vector2(x1, y1)
    );
}

export function createImage(x: number, y: number, width: number, height: number, storageId: string): ImageBuilder {
    return new ImageBuilder(
        storageId,
        new RectangleControls(new Vector2(-width / 2, -height / 2), new Vector2(width / 2, height / 2)),
        new Vector2(x, y)
    );
}