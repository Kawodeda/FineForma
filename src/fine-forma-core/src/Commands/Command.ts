import { ICommand, IDesignCommand, IExecutionContext, IViewportCommand } from './Interfaces';

export class Command implements ICommand {
    
    private readonly _designCommands: readonly IDesignCommand[];
    private readonly _viewportCommand: readonly IViewportCommand[];

    constructor(designCommands: readonly IDesignCommand[] = [], viewportCommands: readonly IViewportCommand[] = []) {
        this._designCommands = [...designCommands];
        this._viewportCommand = [...viewportCommands];
    }

    static get empty(): Command {
        return new Command();
    }

    async execute(context: IExecutionContext): Promise<void> {
        for (const command of this._designCommands) {
            await this._executeDesignCommand(context, command);
        }
        for (const command of this._viewportCommand) {
            await this._executeViewportCommand(context, command);
        }
    }

    private async  _executeDesignCommand(context: IExecutionContext, command: IDesignCommand): Promise<void> {
        context.design = await command.execute(context.design);
    }

    private async  _executeViewportCommand(context: IExecutionContext, command: IViewportCommand): Promise<void> {
        context.viewport = await command.execute(context.viewport);
    }
}