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
  }

  createFungusAt(col: number, row: number): void {
    const f = new Fungus(this._injector);
    f.addCell(col, row, true);
    this._fungi.push(f);
  }

  animate(tsDiff: number): void {
    if (this.areAllCellsFungus() && this.isOneFungusLeft) {
      this._config.finish();
    } else {
      this.fungi.forEach(f => f.cells.forEach(c => c.animate(tsDiff)));
    }
  }

  get fungi(): Fungus[] {
    return this._fungi.filter(f => !f.isDead);
  }

  get countFungi(): number {
    return this.fungi.length;
  }

  private areAllCellsFungus(): boolean {
    return this.countFungusCells === this._config.spaceCount;
  }

  private get countFungusCells(): number {
    return this._grid.cells.filter(c => c instanceof CellFungus).length;
  }

  private get isOneFungusLeft(): boolean {
    return this.countFungi === 1;
  }
}
