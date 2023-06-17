import { ClosedShapeControls } from './ClosedShapeControls';
import { ShapeStyle } from './ShapeStyle';
import { Transform } from './Transform';
import { Vector2 } from './Vector2'

export type ClosedShapeItem = {

    position: Vector2;

    transform: Transform;

    controls: ClosedShapeControls;

    style: ShapeStyle;
}