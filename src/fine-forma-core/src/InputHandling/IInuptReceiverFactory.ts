import { ICommandExecutor, IInputReceiver } from '.';
import { IDesignContext } from '../Design';
import { ISelectionContext } from '../ISelectionContext';
import { IViewportContext } from '../Rendering';

export interface IInputReceiverFactory {

    create(commandExecutor: ICommandExecutor & IDesignContext & ISelectionContext & IViewportContext): IInputReceiver;
}