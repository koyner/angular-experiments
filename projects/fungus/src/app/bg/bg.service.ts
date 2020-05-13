import {Injectable, Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {GridService} from '../grid/grid.service';
import {Bg} from './model/bg';

@Injectable({
  providedIn: 'root'
})
export class BgService {
  private _bg: Bg;

  constructor(
    private _injector: Injector,
    private _config: ConfigService,
    private _grid: GridService
  ) {}

  init(): void {
    this._bg = new Bg(this._injector);
  }

  addBgCell(col: number, row: number): void {
    this._bg.addCell(col, row);
  }
}
