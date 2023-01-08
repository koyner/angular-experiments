import {Injector} from '@angular/core';
import {Cell, CellType} from '../../cell/model/cell';

export class CellWall extends Cell {
  constructor(_injector: Injector, col: number, row: number) {
    super(_injector, '#666', col, row);
  }

  get type(): CellType {
    return CellType.wall;
  }

  get opacity(): number {
    return 1;
  }
}
