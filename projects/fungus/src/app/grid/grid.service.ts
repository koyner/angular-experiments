import {Injectable} from '@angular/core';
import {Cell} from '../cell/model/cell';
import {ConfigService} from '../config/config.service';

export enum Cardinal {
  w = 'w',
  e = 'e',
  n = 'n',
  s = 's'
}

interface INeighbourCells {
  w?: Cell;
  e?: Cell;
  n?: Cell;
  s?: Cell;
}

@Injectable({
  providedIn: 'root'
})
export class GridService {
  private _cells: Cell[][] = [];

  constructor(private _config: ConfigService) {}

  add(cell: Cell): Cell {
    const cellReplaced = this.cellAt(cell.col, cell.row);
    this._cells[cell.col][cell.row] = cell;
    return cellReplaced;
  }

  neighboursDirsOf(cell: Cell): INeighbourCells {
    const n = this.neighbourArrayOf(cell);
    const dirs: INeighbourCells = {};
    if (cell.col !== 0) {
      dirs[Cardinal.w] = n[0];
    }
    if (cell.col !== this._config.cols - 1) {
      dirs[Cardinal.e] = n[1];
    }
    if (cell.row !== 0) {
      dirs[Cardinal.n] = n[2];
    }
    if (cell.row !== this._config.rows - 1) {
      dirs[Cardinal.s] = n[3];
    }
    return dirs;
  }

  neighbourArrayOf(cell: Cell): Cell[] {
    return [
      this.cellAt(cell.col - 1, cell.row),
      this.cellAt(cell.col + 1, cell.row),
      this.cellAt(cell.col, cell.row - 1),
      this.cellAt(cell.col, cell.row + 1)
    ];
  }

  get cells(): Cell[] {
    return this._cells.reduce(
      (acc: Cell[], curr: Cell[]) => acc.concat(curr),
      []
    );
  }

  get cellCount(): number {
    return this.cells.length;
  }

  cellAt(col: number, row: number): Cell {
    if (this._cells[col]) {
      return this._cells[col][row];
    } else {
      this._cells[col] = [];
    }
  }

  randCol(): number {
    return Math.floor(Math.random() * this._config.cols);
  }

  randRow(): number {
    return Math.floor(Math.random() * this._config.rows);
  }
}
