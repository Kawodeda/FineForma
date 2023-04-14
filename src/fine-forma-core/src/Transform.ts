import { Matrix } from "Math/Matrix";
import { Vector2 } from "Math/Vector2";

export class Transform {

    private readonly _matrix: Matrix;

    constructor(matrix: Matrix) {
        this._matrix = matrix;
    }

    get matrix(): Matrix {
        return this._matrix;
    } 

    get translation(): Vector2 {
        throw new Error();
    }

    get scaleFactor(): Vector2 {
        throw new Error();
    }

    get rotation(): number {
        throw new Error();
    }

    static createIdentity(): Transform {
        throw new Error();
    }

    applyTo(vector: Vector2): Vector2 {
        throw new Error();
    }

    translate(shift: Vector2): Transform {
        throw new Error();
    }

    scale(factor: Vector2): Transform {
        throw new Error();
    }

    rotate(angle: number): Transform {
        throw new Error();
    }

    equals(other: Transform): boolean {
        return this.matrix.equals(other.matrix);
    }
}