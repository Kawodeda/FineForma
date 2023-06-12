import { Design } from '../../Design';
import { IHitTestService } from '../../HitTest';
import { Selection } from '../../Selection';
import { IRotationGrip } from '../../Ui';
import { Viewport } from '../../Viewport';
import { IInputHandlerStateContext } from '../State';

export interface IRotationInputHandlerStateContext extends IInputHandlerStateContext {

    get design(): Design;

    get selection(): Selection;

    get viewport(): Viewport;

    get hitTestService(): IHitTestService;

    get rotationGrip(): IRotationGrip;
}