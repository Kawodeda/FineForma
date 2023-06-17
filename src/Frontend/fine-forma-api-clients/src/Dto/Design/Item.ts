import { ClosedShapeItem } from './ClosedShapeItem'
import { ImageItem } from './ImageItem';
import { OpenShapeItem } from './OpenShapeItem';

export type Item = {

    closedShape?: ClosedShapeItem;

    openShape?: OpenShapeItem;

    image: ImageItem;
}