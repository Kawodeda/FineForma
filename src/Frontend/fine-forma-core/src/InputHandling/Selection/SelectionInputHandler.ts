import { IChainableInputHandler, IKeyboardEventArgs } from '..';
import { ICommand, RemoveItemCommand } from '../../Commands';
import { IDesignContext } from '../../Design';
import { IHitTestService } from '../../HitTest';
import { ISelectionContext } from '../../ISelectionContext';
import { BaseInputHandler } from '../BaseInputHandler';
import { IInputHandlerState } from '../State';
import { ISelectionInputHandlerStateContext } from './ISelectionInputHandlerStateContext';
import { IdleState } from './IdleState';
import { Command } from '../../Commands/Command';

const DELETE_KEY_CODE = 'Delete';

export class SelectionInputHandler extends BaseInputHandler implements ISelectionInputHandlerStateContext {
    
    protected override _state: IInputHandlerState;

    private readonly _hitTestService: IHitTestService;
    private readonly _context: IDesignContext & ISelectionContext;

    constructor(hitTestService: IHitTestService, context: IDesignContext & ISelectionContext, next: IChainableInputHandler | null = null) {
        super(next);

        this._hitTestService = hitTestService;
        this._context = context;
        this._state = new IdleState(this);
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

    override keyDown(event: IKeyboardEventArgs): ICommand {
        if (event.code === DELETE_KEY_CODE) {
            this._state = new IdleState(this);

            return new Command(
                this.selectionContext.selection.items.map(item => new RemoveItemCommand(item))
            );
        }

        return super.keyDown(event);
    }
}