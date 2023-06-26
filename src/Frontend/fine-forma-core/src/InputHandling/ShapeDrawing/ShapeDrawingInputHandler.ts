import { IChainableInputHandler } from '..';
import { BaseInputHandler } from '../BaseInputHandler';
import { IInputHandlerState } from '../State';
import { IShapeDrawingInputHandlerStateContext } from './IShapeDrawingInputHandlerStateContext';
import { IdleState } from './IdleState';
import { PreparedState } from './PreparedState';

export class ShapeDrawingInputHandler extends BaseInputHandler implements IShapeDrawingInputHandlerStateContext {
    
    protected override _state: IInputHandlerState;

    private readonly _simplificationTolerance: number;
    private readonly _interpolationFactor: number;

    constructor(simplificationTolerance: number, interpolationFactor: number, next: IChainableInputHandler | null = null) {
        super(next);

        this._simplificationTolerance = simplificationTolerance;
        this._interpolationFactor = interpolationFactor;
        this._state = new IdleState(this);
    }

    get simplificationTolerance(): number {
        return this._simplificationTolerance;
    }

    get interpolationFactor(): number {
        return this._interpolationFactor;
    }

    get isDrawing(): boolean {
        return !(this._state instanceof IdleState);
    }

    startDrawing(): void {
        this._state = new PreparedState(this);
    }
}