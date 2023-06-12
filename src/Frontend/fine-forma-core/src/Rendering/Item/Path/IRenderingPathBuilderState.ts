import { Vector2 } from '../../../Math';

export interface IRenderingPathBuilderState {
    
    moveTo(position: Vector2): void;
}