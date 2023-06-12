import { Maybe } from 'tsmonad';
import { Item } from '../Design';

export interface IHitTestResult {

    get item(): Maybe<Item>;
}