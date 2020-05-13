import {Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {GridService} from '../util/grid.service';
import {UtilService} from '../util/util.service';
import {CellBg} from './cell-bg';
import {CellFungus} from './cell-fungus';

export class Fungus {
  private _util: UtilService;
  private _grid: GridService;
  private _config: ConfigService;

  private readonly _colour: string;
  private readonly _breedDelayLowMs: number;
  private readonly _breedDelayHighMs: number;

  constructor(private _injector: Injector) {
    this._util = _injector.get(UtilService);
    this._grid = _injector.get(GridService);
    this._config = _injector.get(ConfigService);
    this._colour = this._util.randomColourStr;
    this._breedDelayLowMs =
      this._config.fungusBreedDelayLowMinMs +
      Math.random() *
        (this._config.fungusBreedDelayLowMaxMs -
          this._config.fungusBreedDelayLowMinMs);
    this._breedDelayHighMs =
      this._config.fungusBreedDelayHighMinMs +
      Math.random() *
        (this._config.fungusBreedDelayHighMaxMs -
          this._config.fungusBreedDelayHighMinMs);

    this.add(
      new CellFungus(
        this._injector,
        this,
        this._grid.randCol(),
        this._grid.randRow(),
        true
      )
    );
  }

  add(cf: CellFungus): void {
    const cellReplaced = this._grid.add(cf);
    if (cellReplaced instanceof CellFungus) {
      const cellFungusReplaced = cellReplaced as CellFungus;
      if (cellFungusReplaced.isNode) {
        this._grid.cells
          .filter(c => {
            if (c instanceof CellFungus) {
              return (c as CellFungus).fungus === cellFungusReplaced.fungus;
            }
          })
          .forEach((c: CellFungus) =>
            this._grid.add(new CellBg(this._injector, c.col, c.row))
          );
      }
    }
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
}
