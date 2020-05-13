import {Injectable, Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Cell} from '../model/cell';
import {CellBg} from '../model/cell-bg';
import {CellFungus} from '../model/cell-fungus';
import {Fungus} from '../model/fungus';
import {AnimateService} from './animate.service';
import {FungiService} from './fungi.service';
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
  private _cells: Cell[] = [];

  constructor(
    private config: ConfigService,
    private util: UtilService,
    private animate: AnimateService,
    private injector: Injector,
    private fungi: FungiService,
  ) {}

  get cells(): Cell[] {
    return this._cells;
  }

  add(cell: Cell): void {
    const cellOld = this.cellAt(cell.col, cell.row);
    if (cellOld) {
      this.remove(cellOld, (cell as CellFungus).fungus);
    }
    this._cells.push(cell);
    if (this.animate.isAnimatable(cell)) {
      this.animate.add(cell);
    }
  }

  remove(cell: Cell, removedBy: Fungus): void {
    this._cells.splice(this._cells.indexOf(cell), 1);
    if (this.animate.isAnimatable(cell)) {
      this.animate.remove(cell);
    }
    if (cell instanceof CellFungus) {
      const cellFungus = cell as CellFungus;
      if (cellFungus.isNode) {
        this._cells
          .filter(c => {
            if (c instanceof CellFungus) {
              return (c as CellFungus).fungus === cellFungus.fungus;
            }
          })
          .forEach((c: CellFungus) =>
            this.add(
              // new CellFungus(this.injector, removedBy, c.col, c.row, false),
              new CellBg(this.injector, c.col, c.row),
            ),
          );
        this.fungi.kill(cellFungus.fungus);
      }
    }
  }

  dirGrow(cellFungus: CellFungus): Cardinal {
    const neighbours = this.neighboursOf(cellFungus);
    const targetNeighbourKeys = Object.keys(neighbours).filter(
      key =>
        !(
          neighbours[key] instanceof CellFungus &&
          (neighbours[key] as CellFungus).fungus === cellFungus.fungus
        ),
    );
    return this.util.randomElOf(targetNeighbourKeys) as Cardinal;
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
