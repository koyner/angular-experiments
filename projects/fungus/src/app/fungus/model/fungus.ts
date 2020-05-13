import {Injector} from '@angular/core';
import {BgService} from '../../bg/bg.service';
import {ConfigService} from '../../config/config.service';
import {GridService} from '../../grid/grid.service';
import {UtilService} from '../../util/util.service';
import {CellFungus} from './cell-fungus';

export class Fungus {
  private _grid: GridService;
  private _bgService: BgService;

  private readonly _colour: string;
  private readonly _breedDelayLowMs: number;
  private readonly _breedDelayHighMs: number;

  constructor(private _injector: Injector) {
    this._grid = _injector.get(GridService);
    this._bgService = _injector.get(BgService);
    this._colour = _injector.get(UtilService).randomColourStr;
    const config = _injector.get(ConfigService);
    this._breedDelayLowMs =
      config.fungusBreedDelayLowMinMs +
      Math.random() *
        (config.fungusBreedDelayLowMaxMs - config.fungusBreedDelayLowMinMs);
    this._breedDelayHighMs =
      config.fungusBreedDelayHighMinMs +
      Math.random() *
        (config.fungusBreedDelayHighMaxMs - config.fungusBreedDelayHighMinMs);
  }

  addCell(col: number, row: number, isNode: boolean): void {
    this.add(new CellFungus(this._injector, this, col, row, isNode));
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
    return this._grid.cells.filter(
      c => c instanceof CellFungus && (c as CellFungus).fungus === this
    ).length;
  }

  get isDead(): boolean {
    return this.count === 0;
  }

  private add(cf: CellFungus): void {
    const cReplaced = this._grid.add(cf);
    if (cReplaced instanceof CellFungus) {
      const cfReplaced = cReplaced as CellFungus;
      if (cfReplaced.isNode) {
        this._grid.cells
          .filter(c => {
            if (c instanceof CellFungus) {
              return (c as CellFungus).fungus === cfReplaced.fungus;
            }
          })
          .forEach(c => this._bgService.addCell(c.col, c.row));
      }
    }
  }
}
