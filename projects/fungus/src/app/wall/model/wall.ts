import {Injector} from '@angular/core';
import {CellManager} from '../../cell-manager/cell-manager.service';
import {ConfigService} from '../../config/config.service';
import {CellWall} from './cell-wall';

export enum WallAxis {
  x = 'x',
  y = 'y'
}

export class Wall {
  private _cellManager: CellManager;
  private _config: ConfigService;
  constructor(
    private _injector: Injector,
    col: number,
    row: number,
    length: number,
    axis: WallAxis
  ) {
    this._cellManager = _injector.get(CellManager);
    this._config = _injector.get(ConfigService);
    if (axis === WallAxis.x) {
      for (let i = col; i < col + length && i < this._config.cols; i++) {
        try {
          this._cellManager.add(new CellWall(i, row));
        } catch (e) {
          console.log(e.message);
        }
      }
    } else {
      for (let i = row; i < row + length && i < this._config.rows; i++) {
        try {
          this._cellManager.add(new CellWall(col, i));
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  }
}
