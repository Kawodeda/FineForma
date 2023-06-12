import { Design } from '../../Design';
import { Viewport } from '../../Viewport';
import { Selection } from '../../Selection';

export interface ICommand {

    execute(context: IExecutionContext): Promise<void>;
}

export interface IExecutionContext {

    get design(): Design;

    get viewport(): Viewport;

    get selection(): Selection;

    set design(design: Design);

    set viewport(viewport: Viewport);

    set selection(selection: Selection);
}