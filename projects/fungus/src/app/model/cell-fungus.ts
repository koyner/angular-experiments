import {Cell} from './cell';
import {Cardinal, Fungus} from './fungus';

export class CellFungus implements Cell {
  constructor(
    public col: number,
    public row: number,
    public colour: string,
    private isNode: boolean,
    private fungus: Fungus,
  ) {}

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

  private get neighbours(): object {
    const dirs: {[key: string]: CellFungus} = {};
    if (this.col !== 0) {
      dirs[Cardinal.w] = this.fungus.getCell(this.col - 1, this.row);
    }
    if (this.col !== this.fungus.config.cols - 1) {
      dirs[Cardinal.e] = this.fungus.getCell(this.col + 1, this.row);
    }
    if (this.row !== 0) {
      dirs[Cardinal.n] = this.fungus.getCell(this.col, this.row - 1);
    }
    if (this.row !== this.fungus.config.rows - 1) {
      dirs[Cardinal.s] = this.fungus.getCell(this.col, this.row + 1);
    }
    return dirs;
  }
}
