import { nearlyEquals } from './../../Math';
import { Color } from './Color';
import { ColorComponent } from './ColorComponent';
import { ColorPreview } from './ColorPreview';
import { IColorPreview } from './IColorPreview';

export class RgbColor extends Color {
    
    private readonly _r: ColorComponent;
    private readonly _g: ColorComponent;
    private readonly _b: ColorComponent;

    constructor(r: number, g: number, b: number, alpha: number) {
        super(new ColorComponent(alpha));
        
        this._r = new ColorComponent(r);
        this._g = new ColorComponent(g);
        this._b = new ColorComponent(b);
    }

    get r(): ColorComponent {
        return this._r;
    }

    get g(): ColorComponent {
        return this._g;
    }

    get b(): ColorComponent {
        return this._b;
    }

    override get preview(): IColorPreview {
        return new ColorPreview(this.r, this.g, this.b, this.alpha);
    }

    override equals(other: RgbColor): boolean {
        return super.equals(other)
            && nearlyEquals(this.r.value, other.r.value)
            && nearlyEquals(this.g.value, other.g.value)
            && nearlyEquals(this.b.value, other.b.value);
    }
}