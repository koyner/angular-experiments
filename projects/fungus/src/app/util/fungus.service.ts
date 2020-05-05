import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {CellType} from '../model/cell';
import {CellFungus} from '../model/cell-fungus';
import {Cardinal, GridService} from './grid.service';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root',
})
export class FungusService {
  private readonly _nodeCount = 10;
  private readonly _breedTimeoutMaxMs = 1000;
  constructor(
    private config: ConfigService,
    private util: UtilService,
    private grid: GridService,
  ) {}

  init(): void {
    this.createNodes(this._nodeCount);
    this.breed();
  }

  private breed(): void {
    window.setTimeout(() => {
      const gridEl = this.util.getRandomElementOf(
        this.grid.elsWithDifferentNeighbour(CellType.fungus),
      );
      if (gridEl) {
        let coordsNew;
        switch (
          this.grid.dirOfRandomNeighbourWithDifferentType(
            gridEl,
            CellType.fungus,
          )
        ) {
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
          new CellFungus(gridEl.cell.colour, false),
          coordsNew.col,
          coordsNew.row,
        );
      }
      this.breed();
    }, Math.floor(Math.random() * this._breedTimeoutMaxMs));
  }

  private createNodes(count: number): void {
    let i = 0;
    while (i++ < count) {
      this.createNode();
    }
  }

  private createNode(): void {
    this.grid.set(
      new CellFungus(this.util.randomColStr, true),
      this.randCol(),
      this.randRow(),
    );
  }

  private randCol(): number {
    return Math.floor(Math.random() * this.config.cols);
  }

  private randRow(): number {
    return Math.floor(Math.random() * this.config.rows);
  }
}
