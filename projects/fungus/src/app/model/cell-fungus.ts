import {Cell} from './cell';
import {Cardinal, Fungus} from './fungus';

export class CellFungus implements Cell {
  constructor(
    public row: number,
    public col: number,
    public colour: string,
    private isNode: boolean,
    private fungus: Fungus,
  ) {}

  get neighbours(): object {
    const dirs: {[key: string]: CellFungus} = {};
    if (this.row !== 0) {
      dirs[Cardinal.n] = this.fungus.getCell(this.row - 1, this.col);
    }
    if (this.row !== this.fungus.config.rows - 1) {
      dirs[Cardinal.s] = this.fungus.getCell(this.row + 1, this.col);
    }
    if (this.col !== 0) {
      dirs[Cardinal.w] = this.fungus.getCell(this.row, this.col - 1);
    }
    if (this.col !== this.fungus.config.cols - 1) {
      dirs[Cardinal.e] = this.fungus.getCell(this.row, this.col + 1);
    }
    return dirs;
  }

  hasEmptyNeighbour(): boolean {
    const neighbours = this.neighbours;
    return Object.keys(neighbours).some(key => !neighbours[key]);
  }

  getRandomEmptyNeighbourKey(): Cardinal {
    const neighbours = this.neighbours;
    const emptyNeighbourKeys = Object.keys(neighbours).filter(
      key => !neighbours[key],
    );
    return this.fungus.util.getRandomElementOf(emptyNeighbourKeys) as Cardinal;
  }
}
