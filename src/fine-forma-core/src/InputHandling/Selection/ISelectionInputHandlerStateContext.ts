import { IDesignContext } from '../../Design';
import { IHitTestService } from '../../HitTest';
import { ISelectionContext } from '../../ISelectionContext';
import { IInputHandlerStateContext } from '../State';


export interface ISelectionInputHandlerStateContext extends IInputHandlerStateContext {

    get hitTestService(): IHitTestService;

    get designContext(): IDesignContext;

    get selectionContext(): ISelectionContext;
}
