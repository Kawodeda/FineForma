import { Matrix, Vector2, degreeToRadians } from "./Math";

export class Transform {

    private readonly _matrix: Matrix;

    constructor(matrix: Matrix) {
        this._matrix = matrix;
    }

    get matrix(): Matrix {
        return this._matrix;
    }

    static createIdentity(): Transform {
        return new Transform(Matrix.identity);
    }

    applyTo(vector: Vector2): Vector2 {
        return new Vector2(
            this.matrix.m11 * vector.x + this.matrix.m12 * vector.y + this.matrix.d1,
            this.matrix.m21 * vector.x + this.matrix.m22 * vector.y + this.matrix.d2
        );
    }

    translate(shift: Vector2): Transform {
        return new Transform(this.matrix.prepend(
            new Matrix(1, 0, 0, 1, shift.x, shift.y)));
    }

    scale(factor: Vector2): Transform {
        return new Transform(this.matrix.append(
            new Matrix(factor.x, 0, 0, factor.y, 0, 0)));
    }

    rotate(angle: number): Transform {
        const radians = degreeToRadians(angle);

        return new Transform(this.matrix.append(
            new Matrix(
                Math.cos(radians), 
                -Math.sin(radians), 
                Math.sin(radians), 
                Math.cos(radians), 
                0, 
                0)));
    }

    equals(other: Transform): boolean {
        return this.matrix.equals(other.matrix);
    }
}