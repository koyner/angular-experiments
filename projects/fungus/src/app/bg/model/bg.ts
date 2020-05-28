import {Injector} from '@angular/core';
import {CellManager} from '../../cell-manager/cell-manager.service';
import {ConfigService} from '../../config/config.service';
import {GridService} from '../../grid/grid.service';
import {CellBg} from './cell-bg';

export class Bg {
  private _cellManager: CellManager;
  private _grid: GridService;

  constructor(private _injector: Injector) {
    this._grid = _injector.get(GridService);
    this._cellManager = _injector.get(CellManager);
    const config = _injector.get(ConfigService);
    for (let i = 0; i < config.cols; i++) {
      for (let j = 0; j < config.rows; j++) {
        this.addCell(i, j);
      }
    }
  }

  addCell(col: number, row: number): void {
    try {
      this._cellManager.add(new CellBg(this._injector, col, row));
    } catch (e) {
      console.log(e.message);
    }
  }

  get count(): number {
    return this._grid.cells.filter(c => c instanceof CellBg).length;
  }
}
