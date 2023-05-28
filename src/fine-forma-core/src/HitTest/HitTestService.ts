import { Maybe } from 'tsmonad';
import { IDesignContext, Item } from '../Design';
import { Vector2 } from '../Math';
import { IHitTestResult } from './IHitTestResult';
import { IHitTestService } from './IHitTestService';

export class HitTestService implements IHitTestService {
    
    private readonly _designContext: IDesignContext;

    constructor(designContext: IDesignContext) {
        this._designContext = designContext;
    }

    hitTest(point: Vector2): IHitTestResult {
        const items = this._designContext.design.layers
            .sort((a, b) => b.zIndex - a.zIndex).elements
            .flatMap(layer => layer.items.elements);

        return {
            item: Maybe.maybe(
                items.find(item => this._hitTestItem(item, point))
            )
        };
    }

    private _hitTestItem(item: Item, point: Vector2): boolean {
        return item.controls.path.bounds.rectangle.contains(point);
    }
}