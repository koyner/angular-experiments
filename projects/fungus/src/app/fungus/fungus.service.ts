import {Injectable, Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {GridService} from '../grid/grid.service';
import {Animatable, AnimateService} from '../util/animate.service';
import {CellFungus} from './model/cell-fungus';
import {Fungus} from './model/fungus';

@Injectable({
  providedIn: 'root'
})
export class FungusService implements Animatable {
  private readonly _fungi: Fungus[] = [];

  constructor(
    private _injector: Injector,
    private _config: ConfigService,
    private _grid: GridService,
    private _animate: AnimateService
  ) {
    this._animate.add(this);
  }

  init(): void {
    let i = 0;
    while (i++ < this._config.fungusCount) {
      this.createFungusAt(this._grid.randCol(), this._grid.randRow());
    }
    this.createFungusAt(6, 20);
    this.createFungusAt(14, 20);
    this.createFungusLine();
  }

  createFungusAt(col: number, row: number): void {
    const f = new Fungus(this._injector);
    f.addCell(col, row, true);
    this.addFungus(f);
  }

  animate(tsDiff: number): void {
    if (this.areAllCellsFungus() && this.isOneFungusLeft) {
      this._config.finish();
    } else {
      this.fungi.forEach(f => {
        f.grow(tsDiff);
      });
      this.fungi.forEach(f => {
        f.feed();
      });
    }
  }

  get fungi(): Fungus[] {
    return this._fungi.filter(f => !f.isDead);
  }

  get fungusCount(): number {
    return this.fungi.length;
  }

  private createFungusLine(): void {
    const f = new Fungus(this._injector, {low: 2000, high: 3000});
    f.addCell(10, 0, true);
    for (let i = 1; i < this._config.rows; i++) {
      f.addCell(10, i, false);
    }
    this.addFungus(f);
  }

  private addFungus(f: Fungus): void {
    this._fungi.push(f);
  }

  private areAllCellsFungus(): boolean {
    return this.fungusCellCount === this._config.spaceCount;
  }

  private get fungusCellCount(): number {
    return this._grid.cells.filter(c => c instanceof CellFungus).length;
  }

  private get isOneFungusLeft(): boolean {
    return this.fungusCount === 1;
  }
}
