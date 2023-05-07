import { Matrix, Vector2, degreeToRadians } from './Math';

export class Transform {

    private readonly _translate: Vector2;
    private readonly _scale: Vector2;
    private readonly _rotate: number;
    private readonly _matrix: Matrix;

    constructor(translate: Vector2, scale: Vector2, rotate: number) {
        this._translate = translate;
        this._scale = scale;
        this._rotate = rotate;
        this._matrix = this._createMatrix(this._translate, this._scale, this._rotate);
    }

    get matrix(): Matrix {
        return this._matrix;
    }

    get shift(): Vector2 {
        return this._translate;
    }

    get scaleFactor(): Vector2 {
        return this._scale;
    }

    get angle(): number {
        return this._rotate;
    }

    static createIdentity(): Transform {
        return new Transform(Vector2.zero, new Vector2(1, 1), 0);
    }

    applyTo(vector: Vector2): Vector2 {
        return new Vector2(
            this.matrix.m11 * vector.x + this.matrix.m12 * vector.y + this.matrix.d1,
            this.matrix.m21 * vector.x + this.matrix.m22 * vector.y + this.matrix.d2
        );
    }

    translate(shift: Vector2): Transform {
        return new Transform(this._translate.add(shift), this._scale, this._rotate);
    }

    scale(factor: Vector2): Transform {
        return new Transform(
            this._translate, 
            new Vector2(this._scale.x * factor.x, this._scale.y * factor.y),
            this._rotate);
    }

    rotate(angle: number): Transform {
        return new Transform(this._translate, this._scale, this._rotate + angle);
    }

    equals(other: Transform): boolean {
        return this.matrix.equals(other.matrix);
    }

    private _createMatrix(translate: Vector2, scale: Vector2, rotate: number): Matrix {
        const radians = degreeToRadians(rotate);

        return new Matrix(1, 0, 0, 1, translate.x, translate.y)
            .append(new Matrix(
                Math.cos(radians), 
                -Math.sin(radians), 
                Math.sin(radians), 
                Math.cos(radians), 
                0, 
                0))
            .append(new Matrix(scale.x, 0, 0, scale.y, 0, 0));
    }
}