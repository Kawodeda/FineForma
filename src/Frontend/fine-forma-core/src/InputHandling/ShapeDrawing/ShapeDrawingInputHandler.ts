import { IChainableInputHandler } from '..';
import { BaseInputHandler } from '../BaseInputHandler';
import { IInputHandlerState } from '../State';
import { IdleState } from './IdleState';
import { PreparedState } from './PreparedState';

export class ShapeDrawingInputHandler extends BaseInputHandler {
    
    protected override _state: IInputHandlerState;

    constructor(next: IChainableInputHandler | null = null) {
        super(next);

        this._state = new IdleState(this);
    }

    get isDrawing(): boolean {
        return !(this._state instanceof IdleState);
    }

    startDrawing(): void {
        this._state = new PreparedState(this);
    }
}