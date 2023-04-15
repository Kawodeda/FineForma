import { ColorComponent } from './ColorComponent';

export interface IColorPreview {

    get r(): ColorComponent;

    get g(): ColorComponent;

    get b(): ColorComponent;

    get alpha(): ColorComponent;

    equals(other: IColorPreview): boolean;
}