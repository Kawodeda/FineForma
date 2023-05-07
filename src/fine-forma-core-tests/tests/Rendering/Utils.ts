import { ColorComponent, IColorPreview } from 'fine-forma-core/src/Style';

export function colorPreviewToHtml(preview: IColorPreview): string {
    if(preview.alpha.value === ColorComponent.maxValue) {
        return `rgb(${preview.r.value},${preview.g.value},${preview.b.value})`;
    }
    else {
        return `rgba(${preview.r.value},${preview.g.value},${preview.b.value},${preview.alpha.value / ColorComponent.maxValue})`;
    }
}