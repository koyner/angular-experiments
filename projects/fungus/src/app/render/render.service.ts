import {Injectable} from '@angular/core';

import {ConfigService} from '../config/config.service';
import {Cell} from '../model/cell';
import {GridService} from '../util/grid.service';

@Injectable({
  providedIn: 'root',
})
export class RenderService {
  private _size: number;
  constructor(private config: ConfigService, private grid: GridService) {}

  set size(size: number) {
    this._size = size;
  }

  get size(): number {
    return this._size;
  }

  xFor(cell: Cell): number {
    return Math.round(this.grid.elFrom(cell).col * this.cellWidth);
  }

  yFor(cell: Cell): number {
    return Math.round(this.grid.elFrom(cell).row * this.cellHeight);
  }

  wFor(cell: Cell): number {
    return Math.round(this.cellWidth);
  }

  hFor(cell: Cell): number {
    return Math.round(this.cellHeight);
  }

  private get cellWidth(): number {
    return this._size / this.config.cols;
  }

  private get cellHeight(): number {
    return this._size / this.config.rows;
  }
}
