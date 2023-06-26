import { IInputHandlerStateContext } from '../State';

export interface IShapeDrawingInputHandlerStateContext extends IInputHandlerStateContext {

    get simplificationTolerance(): number;

    get interpolationFactor(): number;
}