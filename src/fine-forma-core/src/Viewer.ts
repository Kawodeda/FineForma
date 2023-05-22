import { ICommand, IExecutionContext } from './Commands/Interfaces';
import { Design } from './Design';
import { ICommandExecutor, IInputReceiver, IInputReceiverFactory } from './InputHandling';
import { IRenderer, IDesignContext, IViewportContext, IRendererFactory, ISelectionContext } from './Rendering';
import { Selection } from './Selection';
import { Viewport } from './Viewport';

export class Viewer implements IDesignContext, IViewportContext, ISelectionContext, IExecutionContext, ICommandExecutor {
    
    private readonly _renderer: IRenderer;
    private readonly _inputReceiver: IInputReceiver;

    private _design: Design;
    private _viewport: Viewport;
    private _selection: Selection;

    constructor(design: Design, viewport: Viewport, rendererFactory: IRendererFactory, inputReceiverFactory: IInputReceiverFactory) {
        this._design = design;
        this._viewport = viewport;
        this._selection = Selection.empty;
        this._renderer = rendererFactory.create(this, this, this);
        this._inputReceiver = inputReceiverFactory.create(this);
    }

    get renderer(): IRenderer {
        return this._renderer;
    }

    get inputReceiver(): IInputReceiver {
        return this._inputReceiver;
    }

    get design(): Design {
        return this._design;
    }

    get viewport(): Viewport {
        return this._viewport;
    }

    get selection(): Selection {
        return this._selection;
    }

    set design(design: Design) {
        this._design = design;
        this._selection = this._selection.remove(
            this._selection.items.filter(item => !design.contains(item))
        );
    }

    set viewport(viewport: Viewport) {
        this._viewport = viewport;
    }

    set selection(selection: Selection) {
        this._validateSelection(selection, this.design);

        this._selection = selection;
    }

    async execute(command: ICommand): Promise<void> {
        await command.execute(this);
    }

    private _validateSelection(selection: Selection, design: Design): void {
        if (selection.items.some(item => !design.contains(item))) {
            throw new Error('The selection contains items that are missing in the design');
        }
    }
}