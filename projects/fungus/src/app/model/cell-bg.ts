import {Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Cell} from './cell';

export class CellBg extends Cell {
  constructor(private injector: Injector, col: number, row: number) {
    super(injector.get(ConfigService).bgColour, col, row);
  }
}
