import { ICommandExecutor, IInputReceiver } from '.';
import { IDesignContext } from '../Design';
import { ISelectionContext } from '../ISelectionContext';

export interface IInputReceiverFactory {

    create(commandExecutor: ICommandExecutor & IDesignContext & ISelectionContext): IInputReceiver;
}