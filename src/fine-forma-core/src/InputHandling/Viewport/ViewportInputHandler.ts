import { IChainableInputHandler, IInputHandlingConfiguration } from '..';
import { IInputHandlerState } from '../State';
import { IdleState } from './IdleState';
import { BaseInputHandler } from '../BaseInputHandler';

export class ViewportInputHandler extends BaseInputHandler {
    
    protected override _state: IInputHandlerState;

    private readonly _configuration: IInputHandlingConfiguration;

    constructor(configuration: IInputHandlingConfiguration, next: IChainableInputHandler | null = null) {
        super(next);

        this._configuration = configuration;
        this._state = new IdleState(this._configuration, this);
    }
}