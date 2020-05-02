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

  get size() {
    return this._size;
  }

  xFor(cell: Cell): number {
    return Math.round(this.grid.coordsOf(cell).col * this.cellWidth);
  }

  yFor(cell: Cell): number {
    return Math.round(this.grid.coordsOf(cell).row * this.cellHeight);
  }

  wFor(cell: Cell): number {
    return Math.round(this.cellWidth);
  }

  hFor(cell: Cell): number {
    return Math.round(this.cellHeight);
  }

  private get cellWidth() {
    return this._size / this.config.cols;
  }

  private get cellHeight() {
    return this._size / this.config.rows;
  }
}
