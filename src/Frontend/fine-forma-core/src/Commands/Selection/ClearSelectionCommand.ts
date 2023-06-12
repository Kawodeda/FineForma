import { Design } from '../../Design';
import { Selection } from '../../Selection';
import { ISelectionCommand } from '../Interfaces';

export class ClearSelectionCommand implements ISelectionCommand {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    execute(selection: Selection, design: Design): Promise<Selection> {
        return Promise.resolve(
            Selection.empty
        );
    }
}