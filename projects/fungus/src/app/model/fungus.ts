import {Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Cardinal, GridService} from '../util/grid.service';
import {UtilService} from '../util/util.service';
import {CellType} from './cell';
import {CellFungus} from './cell-fungus';

export class Fungus {
  colour: string;

  private readonly _breedTimeoutMaxMs = Math.random() * 900;

  private util: UtilService;
  private grid: GridService;
  private config: ConfigService;

  private _cells: CellFungus[] = [];

  constructor(private injector: Injector) {
    this.util = injector.get(UtilService);
    this.grid = injector.get(GridService);
    this.config = injector.get(ConfigService);
  }

  init(): void {
    this.colour = this.util.randomColStr;
    const cellFungus = new CellFungus(
      this,
      this.randCol(),
      this.randRow(),
      true,
    );
    this._cells.push(cellFungus);
    this.grid.set(cellFungus);
    this.breed();
  }

  private breed(): void {
    window.setTimeout(() => {
      const cell = this.util.getRandomElementOf(
        this.elsWithDifferentNeighbour(),
      );
      if (cell) {
        let coordsNew;
        switch (
          this.grid.dirOfRandomNeighbourWithDifferentType(cell, CellType.fungus)
        ) {
          case Cardinal.w:
            coordsNew = {col: cell.col - 1, row: cell.row};
            break;
          case Cardinal.e:
            coordsNew = {col: cell.col + 1, row: cell.row};
            break;
          case Cardinal.n:
            coordsNew = {col: cell.col, row: cell.row - 1};
            break;
          case Cardinal.s:
            coordsNew = {col: cell.col, row: cell.row + 1};
            break;
          default:
            break;
        }
        const cellNew = new CellFungus(
          this,
          coordsNew.col,
          coordsNew.row,
          false,
        );
        this.grid.set(cellNew);
        this._cells.push(cellNew);
      }
      this.breed();
    }, Math.floor(25 + Math.random() * this._breedTimeoutMaxMs));
  }

  private randCol(): number {
    return Math.floor(Math.random() * this.config.cols);
  }

  private randRow(): number {
    return Math.floor(Math.random() * this.config.rows);
  }

  private elsWithDifferentNeighbour(): CellFungus[] {
    return this._cells.filter(cell =>
      this.grid.hasNeighbourOfDifferentType(cell, CellType.fungus),
    );
  }
}
