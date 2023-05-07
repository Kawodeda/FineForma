import { Vector2 } from '../../../Math';
import { IRenderingContext } from '../../IRenderingContext';
import { IRenderingPathBuilderState } from './IRenderingPathBuilderState';

export class StartedPathState implements IRenderingPathBuilderState {
    
    private readonly _renderingContext: IRenderingContext;
    private readonly _startPoint: Vector2;
    private readonly _currentPoint: Vector2;

    constructor(renderingContext: IRenderingContext, startPoint: Vector2, currentPoint: Vector2) {
        this._renderingContext = renderingContext;
        this._startPoint = startPoint;
        this._currentPoint = currentPoint;
    }

    get startPoint(): Vector2 {
        return this._startPoint;
    }

    get currentPoint(): Vector2 {
        return this._currentPoint;
    }

    moveTo(position: Vector2): void {
        if (this._currentPoint.equals(position)) {
            return;
        }

        this._renderingContext.moveTo(position);
    }
}