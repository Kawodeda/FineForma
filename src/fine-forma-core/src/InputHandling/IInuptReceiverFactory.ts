import { ICommandExecutor, IInputReceiver } from '.';

export interface IInputReceiverFactory {

    create(commandExecutor: ICommandExecutor): IInputReceiver;
}