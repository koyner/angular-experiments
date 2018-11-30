import {Injectable} from '@angular/core';

import {Bubble} from '../model/bubble';
import {DistService} from './dist.service';
import {Dist} from '../model/dist';
import {ConstantsService} from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class BubbleService {

  private _tLastCreated: number;

  bubbles: Array<Bubble> = [];

  constructor(private distService: DistService,
              private constants: ConstantsService) {
  }

  create(): void {
    const side = this.distFurthest ?
      this.distFurthest.offset * 2 : 0.3;
    const xMid = this.distFurthest ?
      this.distFurthest.xMid : 0.5;
    const yMid = this.distFurthest ?
      this.distFurthest.yMid : 0.5;
    const bubble = new Bubble(xMid, yMid, this.constants.speed, side);
    this.bubbles.push(bubble);
    this._tLastCreated = Date.now();
  }

  remove(b: Bubble): void {
    this.bubbles.splice(this.bubbles.indexOf(b), 1);
  }

  update(): void {
    this.bubbles.forEach(b => {
      b.update();
      if (b.side < 0) {
        this.remove(b);
      }
    });
  }

  get tLastCreated(): number {
    return this._tLastCreated;
  }

  private get distFurthest(): Dist {
    return this.distService.distFurthest;
  }
}
