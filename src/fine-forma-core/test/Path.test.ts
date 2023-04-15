import { suite, test } from "mocha";

import { RgbColor } from '../src/Style/Color/RgbColor';
import { Pen } from '../src/Style/Pen';

suite('Pen', () => {
    test('pen', () => {
        new Pen(
            new RgbColor(255, 0, 255, 255), 1);
    });
});