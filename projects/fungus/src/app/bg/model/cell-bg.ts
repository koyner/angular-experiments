import {Injector} from '@angular/core';
import {Cell} from '../../cell/model/cell';
import {ConfigService} from '../../config/config.service';

export class CellBg extends Cell {
  constructor(private _injector: Injector, col: number, row: number) {
    super(_injector.get(ConfigService).bgColour, col, row);
  }
}
