import {Injector} from '@angular/core';
import {ConfigService} from '../../config/config.service';
import {GridService} from '../../grid/grid.service';
import {CellWall} from './cell-wall';

export enum WallAxis {
  x = 'x',
  y = 'y'
}

export class Wall {
  private _grid: GridService;
  private _config: ConfigService;
  constructor(
    private _injector: Injector,
    col: number,
    row: number,
    length: number,
    axis: WallAxis
  ) {
    this._grid = _injector.get(GridService);
    this._config = _injector.get(ConfigService);
    if (axis === WallAxis.x) {
      for (let i = col; i < col + length && i < this._config.cols; i++) {
        this._grid.add(new CellWall(i, row));
      }
    } else {
      for (let i = row; i < row + length && i < this._config.rows; i++) {
        this._grid.add(new CellWall(col, i));
      }
    }
  }
}
