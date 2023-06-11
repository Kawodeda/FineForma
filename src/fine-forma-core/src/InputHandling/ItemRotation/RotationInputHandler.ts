import { IChainableInputHandler, IKeyboardEventArgs, IMouseEventArgs, IWheelEventArgs } from '..';
import { ICommand } from '../../Commands';
import { Design, IDesignContext } from '../../Design';
import { IHitTestService } from '../../HitTest';
import { ISelectionContext } from '../../ISelectionContext';
import { IViewportContext } from '../../Rendering';
import { Selection } from '../../Selection';
import { IRotationGrip } from '../../Ui';
import { Viewport } from '../../Viewport';
import { IInputHandlerState } from '../State';
import { IRotationInputHandlerStateContext } from './IRotationInputHandlerStateContext';
import { IdleState } from './IdleState';

export class RotationInputHandler implements IChainableInputHandler, IRotationInputHandlerStateContext {
    
    private readonly _next: IChainableInputHandler | null;
    private readonly _context: IDesignContext & ISelectionContext & IViewportContext;
    private readonly _hitTestService: IHitTestService;
    private readonly _rotationGrip: IRotationGrip;

    private _state: IInputHandlerState;

    constructor(
        rotationGrip: IRotationGrip, 
        context: IDesignContext & ISelectionContext & IViewportContext,
        hitTestService: IHitTestService,
        next: IChainableInputHandler | null = null
    ) {
        this._context = context;
        this._next = next;
        this._rotationGrip = rotationGrip;
        this._hitTestService = hitTestService;
        this._state = new IdleState(this);
    }
    
    get next(): IChainableInputHandler | null {
        return this._next;
    }

    get hitTestService(): IHitTestService {
        return this._hitTestService;
    }

    get design(): Design {
        return this._context.design;
    }

    get selection(): Selection {
        return this._context.selection;
    }

    get viewport(): Viewport {
        return this._context.viewport;
    }

    get rotationGrip(): IRotationGrip {
        return this._rotationGrip;
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