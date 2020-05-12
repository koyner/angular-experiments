import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Cell, CellType} from '../model/cell';
import {CellFungus} from '../model/cell-fungus';
import {UtilService} from './util.service';

export enum Cardinal {
  w = 'w',
  e = 'e',
  n = 'n',
  s = 's',
}

interface INeighbourCells {
  w?: Cell;
  e?: Cell;
  n?: Cell;
  s?: Cell;
}

@Injectable({
  providedIn: 'root',
})
export class GridService {
  private _grid: Cell[] = [];

  constructor(private config: ConfigService, private util: UtilService) {}

  get grid(): Cell[] {
    return this._grid;
  }

  add(cell: Cell): Cell {
    const cellCurrent = this.cellAt(cell.col, cell.row);
    if (cellCurrent) {
      this._grid[this._grid.indexOf(cellCurrent)] = cell;
    } else {
      this._grid.push(cell);
    }
    return cellCurrent;
  }

  dirOfRandomNeighbourWithDifferentType(cell: Cell, type: CellType): Cardinal {
    const neighbours = this.neighboursOf(cell);
    const emptyNeighbourKeys = Object.keys(neighbours).filter(
      key => (neighbours[key] as Cell).type !== type,
    );
    return this.util.getRandomElementOf(emptyNeighbourKeys) as Cardinal;
  }

  hasNeighbourOfDifferentType(cell: Cell, type: CellType): boolean {
    const neighbours = this.neighboursOf(cell);
    return Object.keys(neighbours).some(
      key => (neighbours[key] as Cell).type !== type,
    );
  }

  canGrow(cell: CellFungus): boolean {
    const neighbours = this.neighboursOf(cell);
    return Object.keys(neighbours).some(key => {
      const c = neighbours[key] as Cell;
      return (
        c.type !== CellType.fungus ||
        (!(c as CellFungus).isNode && (c as CellFungus).fungus !== cell.fungus)
      );
    });
  }

  dirGrow(cell: CellFungus): Cardinal {
    const neighbours = this.neighboursOf(cell);
    const emptyNeighbourKeys = Object.keys(neighbours).filter(key => {
      const c = neighbours[key] as Cell;
      return (
        c.type !== CellType.fungus ||
        (!(c as CellFungus).isNode && (c as CellFungus).fungus !== cell.fungus)
      );
    });
    return this.util.getRandomElementOf(emptyNeighbourKeys) as Cardinal;
  }

  private cellAt(col: number, row: number): Cell {
    return this._grid.find(cell => cell.col === col && cell.row === row);
  }

  private neighboursOf(cell: Cell): INeighbourCells {
    const dirs: INeighbourCells = {};
    if (cell.col !== 0) {
      dirs[Cardinal.w] = this.cellAt(cell.col - 1, cell.row);
    }
    if (cell.col !== this.config.cols - 1) {
      dirs[Cardinal.e] = this.cellAt(cell.col + 1, cell.row);
    }
    if (cell.row !== 0) {
      dirs[Cardinal.n] = this.cellAt(cell.col, cell.row - 1);
    }
    if (cell.row !== this.config.rows - 1) {
      dirs[Cardinal.s] = this.cellAt(cell.col, cell.row + 1);
    }
    return dirs;
  }
}
