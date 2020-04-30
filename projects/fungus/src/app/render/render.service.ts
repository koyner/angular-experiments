import {Injectable} from '@angular/core';

import {ConfigService} from '../config/config.service';
import {Cell} from '../model/cell';

@Injectable({
  providedIn: 'root',
})
export class RenderService {
  private _size: number;
  constructor(private config: ConfigService) {}

  set size(size: number) {
    this._size = size;
  }

  get size() {
    return this._size;
  }

  xFor(cell: Cell): number {
    return cell.col * this.cellWidth;
  }

  yFor(cell: Cell): number {
    return cell.row * this.cellHeight;
  }

  wFor(cell: Cell): number {
    return this.cellWidth;
  }

  hFor(cell: Cell): number {
    return this.cellHeight;
  }

  private get cellWidth() {
    return this._size / this.config.cols;
  }

  private get cellHeight() {
    return this._size / this.config.rows;
  }
}
