import { IChainableInputHandler } from '..';
import { Design, IDesignContext } from '../../Design';
import { IHitTestService } from '../../HitTest';
import { ISelectionContext } from '../../ISelectionContext';
import { IViewportContext } from '../../Rendering';
import { Selection } from '../../Selection';
import { IRotationGrip } from '../../Ui';
import { Viewport } from '../../Viewport';
import { BaseInputHandler } from '../BaseInputHandler';
import { IInputHandlerState } from '../State';
import { IRotationInputHandlerStateContext } from './IRotationInputHandlerStateContext';
import { IdleState } from './IdleState';

export class RotationInputHandler extends BaseInputHandler implements IRotationInputHandlerStateContext {
    
    protected override _state: IInputHandlerState;

    private readonly _context: IDesignContext & ISelectionContext & IViewportContext;
    private readonly _hitTestService: IHitTestService;
    private readonly _rotationGrip: IRotationGrip;

    constructor(
        rotationGrip: IRotationGrip, 
        context: IDesignContext & ISelectionContext & IViewportContext,
        hitTestService: IHitTestService,
        next: IChainableInputHandler | null = null
    ) {
        super(next);

        this._context = context;
        this._rotationGrip = rotationGrip;
        this._hitTestService = hitTestService;
        this._state = new IdleState(this);
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
}