import { Vector2 } from '../../../Math';
import { IRenderingContext } from '../../IRenderingContext';
import { IRenderingPathBuilderState } from './IRenderingPathBuilderState';

export class NotStartedPathState implements IRenderingPathBuilderState {

    private readonly _renderingContext: IRenderingContext;

    constructor(renderingContext: IRenderingContext) {
        this._renderingContext = renderingContext;
    }

    moveTo(position: Vector2): void {
        this._renderingContext.moveTo(position);
    }
}