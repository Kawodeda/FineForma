import { ICommand, IExecutionContext } from '.';

export class CompositeCommand implements ICommand {
    
    private readonly _commands: readonly ICommand[];

    constructor(commands: readonly ICommand[]) {
        this._commands = [...commands];
    }

    static combine(a: ICommand, b: ICommand): CompositeCommand {
        return new CompositeCommand([a, b]);
    }

    async execute(context: IExecutionContext): Promise<void> {
        for (const command of this._commands) {
            await command.execute(context);
        }
    }
}