import { Maybe } from 'tsmonad';
import { IDesignContext, Item } from '../Design';
import { Rectangle, Vector2 } from '../Math';
import { IHitTestResult } from './IHitTestResult';
import { IHitTestService } from './IHitTestService';
import { Transform } from '../Transform';

export class HitTestService implements IHitTestService {
    
    private readonly _designContext: IDesignContext;

    constructor(designContext: IDesignContext) {
        this._designContext = designContext;
    }

    hitTest(point: Vector2): IHitTestResult {
        const items = this._designContext.design.layers.elements
            .flatMap(layer => layer.items.elements)
            .sort(() => -1); // inverse

        return {
            item: Maybe.maybe(
                items.find(item => this._hitTestItem(item, point))
            )
        };
    }

    hitTestRectangle(point: Vector2, rectangle: Rectangle, transform: Transform): boolean {
        return rectangle.contains(transform.inverse.applyTo(point));
    }

    private _hitTestItem(item: Item, point: Vector2): boolean {
        return this.hitTestRectangle(
            point.subtract(item.position), 
            item.controls.path.bounds.rectangle, 
            item.transform
        );
    }
}