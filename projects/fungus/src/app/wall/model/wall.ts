import {Injector} from '@angular/core';
import {GridService} from '../../grid/grid.service';
import {CellWall} from './cell-wall';

export class Wall {
  private _grid: GridService;
  constructor(private _injector: Injector, row: number) {
    this._grid = _injector.get(GridService);
    for (let i = 15; i < 35; i++) {
      this._grid.add(new CellWall(i, row));
    }
  }
}
