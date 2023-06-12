import { Design } from '../../Design';
import { Selection } from '../../Selection';

export interface ISelectionCommand {

    execute(selection: Selection, design: Design): Promise<Selection>;
}