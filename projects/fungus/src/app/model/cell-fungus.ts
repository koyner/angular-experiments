import {Cell, CellType} from './cell';
import {Fungus} from './fungus';

export class CellFungus extends Cell {
  constructor(
    public fungus: Fungus,
    col: number,
    row: number,
    private isNode: boolean,
  ) {
    super(fungus.colour, col, row);
  }

  get type(): CellType {
    return CellType.fungus;
  }
}
