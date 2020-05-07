import {Cell, CellType} from './cell';

export class CellBg extends Cell {
  constructor(colour: string, col: number, row: number) {
    super(colour, col, row);
  }

  get type(): CellType {
    return CellType.bg;
  }
}
