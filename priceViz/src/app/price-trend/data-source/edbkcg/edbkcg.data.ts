import { Http } from '@angular/http/src/http';
import { Chart } from './../../chart/chart';
export class EDBKCGData {
    food
    market
    constructor(food: string, market: string) {
        this.food = food
        this.market = market
    }
}