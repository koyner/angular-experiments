import {Injector} from '@angular/core';
import {BgService} from '../../bg/bg.service';
import {CellManager} from '../../cell-manager/cell-manager.service';
import {ConfigService} from '../../config/config.service';
import {GridService} from '../../grid/grid.service';
import {UtilService} from '../../util/util.service';
import {CellFungus} from './cell-fungus';

export class Fungus {
  private _grid: GridService;
  private _cellManager: CellManager;
  private _bgService: BgService;

  private readonly _colour: string;
  private readonly _breedDelayLowMs: number;
  private readonly _breedDelayHighMs: number;

  constructor(private _injector: Injector, ms?: any) {
    this._grid = _injector.get(GridService);
    this._cellManager = _injector.get(CellManager);
    this._bgService = _injector.get(BgService);
    this._colour = _injector.get(UtilService).randomColourStr;
    const config = _injector.get(ConfigService);
    this._breedDelayLowMs = ms
      ? ms.low
      : config.fungusBreedDelayLowMinMs +
        Math.random() *
          (config.fungusBreedDelayLowMaxMs - config.fungusBreedDelayLowMinMs);
    this._breedDelayHighMs = ms
      ? ms.high
      : config.fungusBreedDelayHighMinMs +
        Math.random() *
          (config.fungusBreedDelayHighMaxMs - config.fungusBreedDelayHighMinMs);
  }

  addCell(col: number, row: number, isNode: boolean): void {
    const c = new CellFungus(this._injector, this, col, row, isNode);
    let cReplaced;
    try {
      cReplaced = this._cellManager.add(c);
    } catch (e) {
      console.log(e.message);
      return;
    }
    if (cReplaced instanceof CellFungus) {
      c.didKill = true;
      const cfReplaced = cReplaced as CellFungus;
      if (cfReplaced.isNode) {
        cfReplaced.fungus.kill();
      }
    }
  }

  grow(tsDiff: number): void {
    this.cells.forEach(c => c.grow(tsDiff));
  }

  feed(): void {
    let cellsFound: CellFungus[] = [this.cells.find(c => c.isNode)];
    let thisRound = cellsFound;
    while (thisRound.length > 0) {
      let nextRound: CellFungus[] = [];
      thisRound.forEach(c => {
        const neighbours: CellFungus[] = this._grid
          .neighbourArrayOf(c)
          .filter(
            n =>
              n instanceof CellFungus &&
              (n as CellFungus).fungus === this &&
              cellsFound.indexOf(n) === -1 &&
              nextRound.indexOf(n) === -1
          ) as CellFungus[];
        nextRound = nextRound.concat(neighbours);
      });
      cellsFound = cellsFound.concat(nextRound);
      thisRound = nextRound;
    }
    this.cells.forEach(c => {
      if (!cellsFound.includes(c)) {
        this._bgService.addCell(c.col, c.row);
      }
    });
  }

  get breedDelayLowMs(): number {
    return this._breedDelayLowMs;
  }

  get breedDelayHighMs(): number {
    return this._breedDelayHighMs;
  }

  get colour(): string {
    return this._colour;
  }

  get count(): number {
    return this.cells.length;
  }

  get isDead(): boolean {
    return this.count === 0;
  }

  get cells(): CellFungus[] {
    return this._grid.cells.filter(
      c => c instanceof CellFungus && (c as CellFungus).fungus === this
    ) as CellFungus[];
  }

  private kill(): void {
    this.cells.forEach(c => this._bgService.addCell(c.col, c.row));
  }
}
