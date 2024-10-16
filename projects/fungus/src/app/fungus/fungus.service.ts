import {Injectable, Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {GridService} from '../grid/grid.service';
import {Animatable, AnimateService} from '../util/animate.service';
import {Fungus} from './model/fungus';

@Injectable({
  providedIn: 'root'
})
export class FungusService implements Animatable {
  private readonly _fungi: Fungus[] = [];
  private _timeSinceLastFeed = 0;

  constructor(
    private _injector: Injector,
    private _config: ConfigService,
    private _grid: GridService,
    private _animate: AnimateService
  ) {}

  init(): void {
    let i = 0;
    while (i++ < this._config.fungus.count) {
      this.createFungusAt(this._grid.randCol(), this._grid.randRow());
    }
    this._animate.add(this);
  }

  createFungusAt(col: number, row: number): void {
    const f = new Fungus(this._injector);
    f.addCell(col, row, true);
    this.addFungus(f);
  }

  animate(tsDiff: number): void {
    this._timeSinceLastFeed += tsDiff;
    if (this._timeSinceLastFeed > 1000) {
      this._timeSinceLastFeed -= 1000;
      this.fungi.forEach(f => {
        f.feed();
      });
    }
    console.log(`fungi: ${this.fungi.length}`);
    this.fungi.forEach(f => f.grow(tsDiff));
  }

  get fungi(): Fungus[] {
    return this._fungi.filter(f => !f.isDead);
  }

  get fungusCount(): number {
    return this.fungi.length;
  }

  private addFungus(f: Fungus): void {
    this._fungi.push(f);
  }
}
