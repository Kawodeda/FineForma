import { ICommand } from '../Commands';

export interface ICommandExecutor {

    execute(command: ICommand): Promise<void>;
}