import {Injector} from '@angular/core';
import {Cell, CellType} from '../../cell/model/cell';
import {ConfigService} from '../../config/config.service';

export class CellBg extends Cell {
  constructor(private _injector: Injector, col: number, row: number) {
    super(_injector, _injector.get(ConfigService).bgColour, col, row);
  }

  get type(): CellType {
    return CellType.bg;
  }

  get opacity(): number {
    return 1;
  }
}
