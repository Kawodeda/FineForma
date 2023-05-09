import { Viewport } from '../../Viewport';

export interface IViewportCommand {

    execute(viewport: Viewport): Promise<Viewport>;
}