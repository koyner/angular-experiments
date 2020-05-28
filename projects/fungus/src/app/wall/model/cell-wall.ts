import {Cell, CellType} from '../../cell/model/cell';

export class CellWall extends Cell {
  constructor(col: number, row: number) {
    super('white', col, row);
  }

  get type(): CellType {
    return CellType.wall;
  }
}
