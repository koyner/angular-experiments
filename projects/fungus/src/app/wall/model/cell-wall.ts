import {Cell} from '../../cell/model/cell';

export class CellWall extends Cell {
  constructor(col: number, row: number) {
    super('white', col, row);
  }
}
