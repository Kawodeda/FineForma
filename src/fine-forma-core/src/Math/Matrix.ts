import { isRealNumber, nearlyEquals } from './Utils';

export class Matrix {

    private readonly _m11: number;
    private readonly _m12: number;
    private readonly _m21: number;
    private readonly _m22: number;
    private readonly _d1: number;
    private readonly _d2: number;

    constructor(m11: number, m12: number, m21: number, m22: number, d1: number, d2: number) {
        this._validateElements(m11, m12, m21, m22, d1, d2);
        
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

    get m11(): number {
        return this._m11;
    }

    get m12(): number {
        return this._m12;
    }

    get m21(): number {
        return this._m21;
    }

    get m22(): number {
        return this._m22;
    }

    get d1(): number {
        return this._d1;
    }

    get d2(): number {
        return this._d2;
    }

    append(other: Matrix): Matrix {
        return new Matrix(
            this.m11 * other.m11 + this.m12 * other.m21,
            this.m11 * other.m12 + this.m12 * other.m22,
            this.m21 * other.m11 + this.m22 * other.m21,
            this.m21 * other.m12 + this.m22 * other.m22,
            this.m11 * other.d1 + this.m12 * other.d2 + this.d1,
            this.m21 * other.d1 + this.m22 * other.d2 + this.d2
        );
    }

    prepend(other: Matrix): Matrix {
        return other.append(this);
    }

    inverse(): Matrix {
        const determinant = this._determinant();

        return new Matrix(
            this.m22 / determinant,
            -this.m12 / determinant,
            -this.m21 / determinant,
            this.m11 / determinant,
            (this.m12 * this.d2 - this.d1 * this.m22) / determinant,
            -(this.m11 * this.d2 - this.d1 * this.m21) / determinant
        );
    }

    equals(other: Matrix): boolean {
        return nearlyEquals(this.m11, other.m11)
            && nearlyEquals(this.m12, other.m12)
            && nearlyEquals(this.m21, other.m21)
            && nearlyEquals(this.m22, other.m22)
            && nearlyEquals(this.d1, other.d1)
            && nearlyEquals(this.d2, other.d2);
    }

    private _determinant(): number {
        return this.m11 * this.m22 - this.m12 * this.m21;
    }
    
    private _validateElements(m11: number, m12: number, m21: number, m22: number, d1: number, d2: number): void {
        for (const element of [ m11, m12, m21, m22, d1, d2 ]) {
            if (!isRealNumber(element)) {
                throw new Error('Could not create Matrix from non-real element values');
            }
        }
    }
}