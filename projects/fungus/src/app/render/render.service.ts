import {Injectable} from '@angular/core';

import {ConfigService} from '../config/config.service';
import {Cell} from '../model/cell';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
  private _size: number;
  constructor(private _config: ConfigService) {}

  set size(size: number) {
    this._size = size;
  }

  get size(): number {
    return this._size;
  }

  xFor(cell: Cell): number {
    return Math.floor(cell.col * this.cellWidth);
  }

  yFor(cell: Cell): number {
    return Math.floor(cell.row * this.cellHeight);
  }

  wFor(cell: Cell): number {
    return Math.floor(this.cellWidth);
  }

  hFor(cell: Cell): number {
    return Math.floor(this.cellHeight);
  }

  private get cellWidth(): number {
    return this._size / this._config.cols;
  }

  private get cellHeight(): number {
    return this._size / this._config.rows;
  }
}
