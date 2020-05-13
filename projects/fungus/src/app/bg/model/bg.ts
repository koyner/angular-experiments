import {Injector} from '@angular/core';
import {ConfigService} from '../../config/config.service';
import {GridService} from '../../grid/grid.service';
import {CellBg} from './cell-bg';

export class Bg {
  private _grid: GridService;

  constructor(private _injector: Injector) {
    this._grid = _injector.get(GridService);
    const config = _injector.get(ConfigService);
    for (let i = 0; i < config.cols; i++) {
      for (let j = 0; j < config.rows; j++) {
        this.addCell(i, j);
      }
    }
  }

  addCell(col: number, row: number): void {
    this._grid.add(new CellBg(this._injector, col, row));
  }
}
