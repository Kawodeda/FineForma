import { suite, test } from 'mocha';
import { expect } from 'chai';

import * as RgbColor from '../src/Style/Color/RgbColor';
import { ColorPreview } from '../src/Style/Color/ColorPreview';
import { ColorComponent } from '../src/Style/Color/ColorComponent';

suite('Color', () => {
    suite('preview is the corresponding rgba color', () => {
        const testCases = [
            { 
                color: new RgbColor.RgbColor(0, 0, 0, 0), 
                preview: new ColorPreview(
                    new ColorComponent(0),
                    new ColorComponent(0),
                    new ColorComponent(0),
                    new ColorComponent(0)
                ) 
            },
            { 
                color: new RgbColor.RgbColor(0, 0, 0, 255), 
                preview: new ColorPreview(
                    new ColorComponent(0),
                    new ColorComponent(0),
                    new ColorComponent(0),
                    new ColorComponent(255)
                ) 
            },
            { 
                color: new RgbColor.RgbColor(255, 0, 255, 230), 
                preview: new ColorPreview(
                    new ColorComponent(255),
                    new ColorComponent(0),
                    new ColorComponent(255),
                    new ColorComponent(230)
                ) 
            },
            { 
                color: new RgbColor.RgbColor(129, 38, 12, 255), 
                preview: new ColorPreview(
                    new ColorComponent(129),
                    new ColorComponent(38),
                    new ColorComponent(12),
                    new ColorComponent(255)
                ) 
            }
        ];

        testCases.forEach(({ color, preview }, index) => {
            test(`preview #${index + 1}`, () => {
                void expect(color.preview.equals(preview)).to.be.true;
            });
        });
    });
});