import { Design } from '../../Design';
import { IHitTestService } from '../../HitTest';
import { Selection } from '../../Selection';
import { Viewport } from '../../Viewport';
import { IInputHandlerStateContext } from '../State';

export interface IResizeInputHandlerStateContext extends IInputHandlerStateContext {

    get design(): Design;

    get viewport(): Viewport;

    get selection(): Selection;

    get hitTestService(): IHitTestService;

    get resizeGripSize(): number;
}