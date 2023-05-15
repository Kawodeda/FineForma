import { ICommand, IDesignCommand, IExecutionContext, IViewportCommand } from './Interfaces';
import { ISelectionCommand } from './Interfaces/ISelectionCommand';

export class Command implements ICommand {
    
    private readonly _designCommands: readonly IDesignCommand[];
    private readonly _viewportCommands: readonly IViewportCommand[];
    private readonly _selectionCommands: readonly ISelectionCommand[];

    constructor(
        designCommands: readonly IDesignCommand[] = [], 
        viewportCommands: readonly IViewportCommand[] = [],
        selectionCommands: readonly ISelectionCommand[] = []) {
        this._designCommands = [...designCommands];
        this._viewportCommands = [...viewportCommands];
        this._selectionCommands = selectionCommands;
    }

    static get empty(): Command {
        return new Command();
    }

    async execute(context: IExecutionContext): Promise<void> {
        for (const command of this._designCommands) {
            await this._executeDesignCommand(context, command);
        }
        for (const command of this._viewportCommands) {
            await this._executeViewportCommand(context, command);
        }
        for (const command of this._selectionCommands) {
            await this._executeSelectionCommand(context, command);
        }
    }

    private async  _executeDesignCommand(context: IExecutionContext, command: IDesignCommand): Promise<void> {
        context.design = await command.execute(context.design);
    }

    private async  _executeViewportCommand(context: IExecutionContext, command: IViewportCommand): Promise<void> {
        context.viewport = await command.execute(context.viewport);
    }

    private async _executeSelectionCommand(context: IExecutionContext, command: ISelectionCommand): Promise<void> {
        context.selection = await command.execute(context.selection, context.design);
    }
}