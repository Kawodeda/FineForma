import { clamp } from "./../../Math";

export class ColorComponent {

    private readonly _value: number;

    constructor(value: number) {
        this._value = clamp(value, ColorComponent.minValue, ColorComponent.maxValue);
    }

    static get minValue(): number {
        return 0;
    }

    static get maxValue(): number {
        return 255;
    }

    get value(): number {
        return this._value
    }
}