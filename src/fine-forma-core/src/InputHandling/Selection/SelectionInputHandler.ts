import { IChainableInputHandler, IKeyboardEventArgs, IMouseEventArgs, IWheelEventArgs } from '..';
import { ICommand } from '../../Commands';
import { IDesignContext } from '../../Design';
import { IHitTestService } from '../../HitTest';
import { ISelectionContext } from '../../ISelectionContext';
import { IInputHandlerState } from '../State';
import { ISelectionInputHandlerStateContext } from './ISelectionInputHandlerStateContext';
import { IdleState } from './IdleState';

export class SelectionInputHandler implements IChainableInputHandler, ISelectionInputHandlerStateContext {
    
    private readonly _next: IChainableInputHandler | null;
    private readonly _hitTestService: IHitTestService;
    private readonly _context: IDesignContext & ISelectionContext;

    private _state: IInputHandlerState;

    constructor(hitTestService: IHitTestService, context: IDesignContext & ISelectionContext, next: IChainableInputHandler | null = null) {
        this._hitTestService = hitTestService;
        this._next = next;
        this._context = context;
        this._state = new IdleState(this);
    }

    get next(): IChainableInputHandler | null {
        return this._next;
    }

    get hitTestService(): IHitTestService {
        return this._hitTestService;
    }

    get designContext(): IDesignContext {
        return this._context;
    }
    
    get selectionContext(): ISelectionContext {
        return this._context;
    }

    set state(state: IInputHandlerState) {
        this._state = state;
    }
    
    mouseDown(event: IMouseEventArgs): ICommand {
        return this._state.mouseDown(event);
    }
    
    mouseUp(event: IMouseEventArgs): ICommand {
        return this._state.mouseUp(event);
    }
    
    mouseMove(event: IMouseEventArgs): ICommand {
        return this._state.mouseMove(event);
    }
    
    wheel(event: IWheelEventArgs): ICommand {
        return this._state.wheel(event);
    }
    
    keyDown(event: IKeyboardEventArgs): ICommand {
        return this._state.keyDown(event);
    }
    
    keyUp(event: IKeyboardEventArgs): ICommand {
        return this._state.keyUp(event);
    }
}