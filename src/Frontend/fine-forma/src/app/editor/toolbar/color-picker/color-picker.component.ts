import { Component, Output, Input, EventEmitter } from '@angular/core';

import { IRgbColor, fromHex, toHex } from '../rgb-color';

@Component({
    selector: 'ff-color-picker',
    templateUrl: 'color-picker.component.html'
})

export class ColorPickerComponent {

    @Output() colorChange = new EventEmitter<IRgbColor>();

    private _colorValue = '#000000';

    @Input()
    set color(value: IRgbColor) {
        this._colorValue = toHex(value);
    }

    get colorValue(): string {
        return this._colorValue;
    }

    colorValueChanged(value: string): void {
        this._colorValue = value;
        this.colorChange.emit(fromHex(value));
    }
}