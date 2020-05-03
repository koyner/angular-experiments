import {Cell, CellType} from './cell';

export class CellBg extends Cell {
  constructor(colour: string) {
    super(colour);
  }

  get type(): CellType {
    return CellType.bg;
  }
}
