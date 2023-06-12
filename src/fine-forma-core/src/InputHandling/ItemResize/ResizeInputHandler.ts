import { IChainableInputHandler } from '..';
import { Design, IDesignContext } from '../../Design';
import { IHitTestService } from '../../HitTest';
import { ISelectionContext } from '../../ISelectionContext';
import { IViewportContext } from '../../Rendering';
import { Selection } from '../../Selection';
import { Viewport } from '../../Viewport';
import { BaseInputHandler } from '../BaseInputHandler';
import { IInputHandlerState } from '../State';
import { IResizeInputHandlerStateContext } from './IResizeInputHandlerStateContext';
import { IdleState } from './IdleState';

export class ResizeInputHandler extends BaseInputHandler implements IResizeInputHandlerStateContext {

    protected override _state: IInputHandlerState;

    private readonly _context: IDesignContext & IViewportContext & ISelectionContext;
    private readonly _hitTestService: IHitTestService;
    private readonly _resizeGripsSize: number;

    constructor(
        context: IDesignContext & IViewportContext & ISelectionContext, 
        hitTestService: IHitTestService, 
        resizeGripsSize: number, 
        next: IChainableInputHandler | null = null
    ) {
        super(next);

        this._context = context;
        this._hitTestService = hitTestService;
        this._resizeGripsSize = resizeGripsSize;
        this._state = new IdleState(this);
    }

    get design(): Design {
        return this._context.design;
    }

    get viewport(): Viewport {
        return this._context.viewport;
    }

    get selection(): Selection {
        return this._context.selection;
    }

    get hitTestService(): IHitTestService {
        return this._hitTestService;
    }

    get resizeGripSize(): number {
        return this._resizeGripsSize;
    }
}