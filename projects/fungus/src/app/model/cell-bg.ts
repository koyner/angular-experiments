import {Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Cell} from './cell';

export class CellBg extends Cell {
  constructor(private _injector: Injector, col: number, row: number) {
    super(_injector.get(ConfigService).bgColour, col, row);
  }
}
