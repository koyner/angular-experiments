import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Cell} from '../model/cell';
import {UtilService} from './util.service';

export enum Cardinal {
  w = 'w',
  e = 'e',
  n = 'n',
  s = 's',
}

export interface IGridEl {
  cell: Cell;
  col: number;
  row: number;
}

@Injectable({
  providedIn: 'root',
})
export class GridService {
  private _grid: IGridEl[] = [];

  constructor(private config: ConfigService, private util: UtilService) {}

  get grid(): IGridEl[] {
    return this._grid;
  }

  set(cell: Cell, col: number, row: number): void {
    const elNew = {cell, col, row};
    const el = this.elAt(col, row);
    if (el) {
      this._grid[this._grid.indexOf(el)] = elNew;
    } else {
      this._grid.push(elNew);
    }
  }

  coordsOf(cell: Cell): {col: number; row: number} {
    const el = this.elFrom(cell);
    return {
      col: el.col,
      row: el.row,
    };
  }

  get cellsWithEmptyNeighbour(): Cell[] {
    return this._grid
      .filter(el => el.cell.type === 'fungus' && this.hasEmptyNeighbour(el))
      .map(el => el.cell);
  }

  getRandomEmptyNeighbourKey(cell: Cell): Cardinal {
    const neighbours = this.getNeighboursOf(this.elFrom(cell));
    const emptyNeighbourKeys = Object.keys(neighbours).filter(
      key => neighbours[key].cell.type !== 'fungus',
    );
    return this.util.getRandomElementOf(emptyNeighbourKeys) as Cardinal;
  }

  private elAt(col: number, row: number): IGridEl {
    return this._grid.find(el => el.col === col && el.row === row);
  }

  private elFrom(cell: Cell): IGridEl {
    return this._grid.find(elGrid => elGrid.cell === cell);
  }

  private hasEmptyNeighbour(el: IGridEl): boolean {
    const neighbours = this.getNeighboursOf(el);
    return Object.keys(neighbours).some(
      key => neighbours[key].cell.type !== 'fungus',
    );
  }

  private getNeighboursOf(el: IGridEl): object {
    const dirs: {[key: string]: IGridEl} = {};
    if (el.col !== 0) {
      dirs[Cardinal.w] = this.elAt(el.col - 1, el.row);
    }
    if (el.col !== this.config.cols - 1) {
      dirs[Cardinal.e] = this.elAt(el.col + 1, el.row);
    }
    if (el.row !== 0) {
      dirs[Cardinal.n] = this.elAt(el.col, el.row - 1);
    }
    if (el.row !== this.config.rows - 1) {
      dirs[Cardinal.s] = this.elAt(el.col, el.row + 1);
    }
    return dirs;
  }
}
