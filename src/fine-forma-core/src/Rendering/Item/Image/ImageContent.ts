import { ReadonlyUint8ClampedArray } from '../../../ReadonlyUint8ClampedArray';

export class ImageContent {

    private readonly _image: ReadonlyUint8ClampedArray;
    private readonly _width: number;
    private readonly _height: number;

    constructor(image: ReadonlyUint8ClampedArray, width: number, height: number) {
        this._image = image;
        this._width = width;
        this._height = height;
    }

    get image(): ReadonlyUint8ClampedArray {
        return this._image;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}