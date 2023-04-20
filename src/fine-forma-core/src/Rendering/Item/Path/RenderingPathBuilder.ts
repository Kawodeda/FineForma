import { Vector2 } from '../../../Math';
import { IPathBuilder } from '../../../Path';
import { IRenderingContext } from '../../IRenderingContext';
import { NotStartedPathState } from './NotStartedPathState';
import { IRenderingPathBuilderState } from './IRenderingPathBuilderState';
import { StartedPathState } from './StartedPathState';

const IS_STARTED_STATE = (state: IRenderingPathBuilderState): state is StartedPathState => 
    state instanceof StartedPathState;

export class RenderingPathBuilder implements IPathBuilder {

    private readonly _renderingContext: IRenderingContext;

    private _state: IRenderingPathBuilderState;

    constructor(renderingContext: IRenderingContext) {
        this._renderingContext = renderingContext;
        this._state = new NotStartedPathState(this._renderingContext);
    }

    beginPath(): void {
        this._renderingContext.beginPath();
        this._setNotStartedState();
    }

    closePath(): void {
        this._renderingContext.closePath();

        if (IS_STARTED_STATE(this._state)) {
            this._setStartedState(this._state.startPoint);
        }
    }

    moveTo(position: Vector2): void {
        this._state.moveTo(position);
        this._setStartedState(position);
    }

    lineTo(end: Vector2): void {
        
        this._renderingContext.lineTo(end);
        this._setStartedState(end);
    }

    quadraticCurveTo(control: Vector2, end: Vector2): void {
        
        this._renderingContext.quadraticCurveTo(control, end);
        this._setStartedState(end);
    }

    cubicCurveTo(control1: Vector2, control2: Vector2, end: Vector2): void {
        
        this._renderingContext.cubicCurveTo(control1, control2, end);
        this._setStartedState(end);
    }

    arcTo(xRadius: number, yRadius: number, xAxisRotation: number, end: Vector2): void {
        
        this._renderingContext.arcTo(xRadius, yRadius, xAxisRotation, end);
        this._setStartedState(end);
    }

    private _setNotStartedState(): void {
        this._state = new NotStartedPathState(this._renderingContext);
    }

    private _setStartedState(currentPoint: Vector2): void {
        if (IS_STARTED_STATE(this._state)) {
            this._state = new StartedPathState(this._renderingContext, this._state.startPoint, currentPoint);
        }
        else {
            this._state = new StartedPathState(this._renderingContext, currentPoint, currentPoint);
        }
    }
}