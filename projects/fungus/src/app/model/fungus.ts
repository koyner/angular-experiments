import {ConfigService} from '../config/config.service';
import {UtilService} from '../util/util.service';
import {CellFungus} from './cell-fungus';

export enum Cardinal {
  n = 'n',
  s = 's',
  w = 'w',
  e = 'e',
}

export class Fungus {
  private _cells: CellFungus[] = [];

  constructor(public config: ConfigService, public util: UtilService) {
    this.cells.push(
      new CellFungus(
        (this.config.rows - 1) / 2,
        (this.config.cols - 1) / 2,
        '#446644',
        true,
        this,
      ),
    );
    window.setInterval(() => {
      const cell = this.util.getRandomElementOf(this.cellsWithEmptyNeighbour);
      if (cell) {
        let coords;
        switch (cell.getRandomEmptyNeighbourKey()) {
          case Cardinal.n:
            coords = [cell.row - 1, cell.col];
            break;
          case Cardinal.s:
            coords = [cell.row + 1, cell.col];
            break;
          case Cardinal.w:
            coords = [cell.row, cell.col - 1];
            break;
          case Cardinal.e:
            coords = [cell.row, cell.col + 1];
            break;
          default:
            break;
        }
        this.cells.push(
          new CellFungus(
            coords[0],
            coords[1],
            `rgb(${this.util.randomCol}, ${this.util.randomCol}, ${this.util.randomCol})`,
            false,
            this,
          ),
        );
      }
    }, 1000);
  }

  getCell(row, col): CellFungus {
    return this.cells.find(c => {
      return c.row === row && c.col === col;
    });
  }

  get cells() {
    return this._cells;
  }

  get cellsWithEmptyNeighbour() {
    return this.cells.filter(c => c.hasEmptyNeighbour());
  }
}
