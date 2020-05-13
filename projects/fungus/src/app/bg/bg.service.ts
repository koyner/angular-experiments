import {Injectable, Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {GridService} from '../grid/grid.service';
import {CellBg} from './model/cell-bg';

@Injectable({
  providedIn: 'root'
})
export class BgService {
  constructor(
    private _injector: Injector,
    private _config: ConfigService,
    private _grid: GridService
  ) {}

  init(): void {
    for (let i = 0; i < this._config.cols; i++) {
      for (let j = 0; j < this._config.rows; j++) {
        this._grid.add(new CellBg(this._injector, i, j));
      }
    }
  }
}
