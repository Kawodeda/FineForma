import { OpenShapeControls } from './OpenShapeControls';
import { ShapeStyle } from './ShapeStyle';
import { Transform } from './Transform';
import { Vector2 } from './Vector2'

export type OpenShapeItem = {

    position: Vector2;

    transform: Transform;

    controls: OpenShapeControls;

    style: ShapeStyle;
}