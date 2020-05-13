import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Cell} from '../model/cell';
import {AnimateService} from './animate.service';

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
  private _cells: Cell[] = [];

  constructor(private config: ConfigService, private animate: AnimateService) {}

  get cells(): Cell[] {
    return this._cells;
  }

  add(cell: Cell): Cell {
    const cellReplaced = this.cellAt(cell.col, cell.row);
    if (cellReplaced) {
      this._cells.splice(this._cells.indexOf(cellReplaced), 1);
      if (this.animate.isAnimatable(cellReplaced)) {
        this.animate.remove(cellReplaced);
      }
    }
    this._cells.push(cell);
    if (this.animate.isAnimatable(cell)) {
      this.animate.add(cell);
    }
    return cellReplaced;
  }

  neighboursOf(cell: Cell): INeighbourCells {
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

  randCol(): number {
    return Math.floor(Math.random() * this.config.cols);
  }

  randRow(): number {
    return Math.floor(Math.random() * this.config.rows);
  }

  get count(): number {
    return this.cells.length;
  }

  private cellAt(col: number, row: number): Cell {
    return this._cells.find(cell => cell.col === col && cell.row === row);
  }
}
