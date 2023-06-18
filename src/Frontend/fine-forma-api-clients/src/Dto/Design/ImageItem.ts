import { Rectangle } from './Rectangle';
import { ShapeStyle } from './ShapeStyle';
import { Transform } from './Transform';
import { Vector2 } from './Vector2';

export type ImageItem = {

    position?: Vector2;

    transform?: Transform;

    controls?: Rectangle;

    style?: ShapeStyle;

    storageId?: string;
}