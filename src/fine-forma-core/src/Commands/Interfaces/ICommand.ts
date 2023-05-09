import { Design } from '../../Design';
import { Viewport } from '../../Viewport';

export interface ICommand {

    execute(context: IExecutionContext): Promise<void>;
}

export interface IExecutionContext {

    get design(): Design;

    get viewport(): Viewport;

    set design(design: Design);

    set viewport(viewport: Viewport);
}