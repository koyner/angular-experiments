import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {CellFungus} from '../model/cell-fungus';
import {Cardinal, GridService} from './grid.service';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root',
})
export class FungusService {
  constructor(
    private config: ConfigService,
    private util: UtilService,
    private grid: GridService,
  ) {}

  init(): void {
    this.grid.set(
      new CellFungus('#446644', true),
      Math.floor(Math.random() * this.config.cols),
      Math.floor(Math.random() * this.config.rows),
    );
    window.setInterval(() => {
      const gridEl = this.util.getRandomElementOf(
        this.grid.gridElsWithEmptyNeighbour,
      );
      if (gridEl) {
        let coordsNew;
        switch (this.grid.getRandomEmptyNeighbourKey(gridEl)) {
          case Cardinal.w:
            coordsNew = {col: gridEl.col - 1, row: gridEl.row};
            break;
          case Cardinal.e:
            coordsNew = {col: gridEl.col + 1, row: gridEl.row};
            break;
          case Cardinal.n:
            coordsNew = {col: gridEl.col, row: gridEl.row - 1};
            break;
          case Cardinal.s:
            coordsNew = {col: gridEl.col, row: gridEl.row + 1};
            break;
          default:
            break;
        }
        this.grid.set(
          new CellFungus(
            `rgb(${this.util.randomCol}, ${this.util.randomCol}, ${this.util.randomCol})`,
            false,
          ),
          coordsNew.col,
          coordsNew.row,
        );
      }
    }, 10);
  }
}
