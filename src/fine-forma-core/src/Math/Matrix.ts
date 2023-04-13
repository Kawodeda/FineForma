import { nearlyEquals } from "./Utils";

/**
 * m11 m12 d1
 * m21 m22 d2
 * 0   0   1
 */
export class Matrix {

    private readonly _m11: number;
    private readonly _m12: number;
    private readonly _m21: number;
    private readonly _m22: number;
    private readonly _d1: number;
    private readonly _d2: number;

    constructor(m11: number, m12: number, m21: number, m22: number, d1: number, d2: number) {
        this._m11 = m11;
        this._m12 = m12;
        this._m21 = m21;
        this._m22 = m22;
        this._d1 = d1;
        this._d2 = d2;
    }

    static get identity(): Matrix {
        return new Matrix(1, 0, 0, 1, 0, 0);
    }

    append(other: Matrix): Matrix {
        return other;
    }

    prepend(other: Matrix): Matrix {
        return other;
    }

    inverse(): Matrix {
        throw Error();
    }

    equals(other: Matrix): boolean {
        return nearlyEquals(this._m11, other._m11)
            && nearlyEquals(this._m12, other._m12)
            && nearlyEquals(this._m21, other._m21)
            && nearlyEquals(this._m22, other._m22)
            && nearlyEquals(this._d1, other._d1)
            && nearlyEquals(this._d2, other._d2);
    }
}