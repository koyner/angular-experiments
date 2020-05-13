import {Injector} from '@angular/core';
import {CellBg} from '../../bg/model/cell-bg';
import {ConfigService} from '../../config/config.service';
import {GridService} from '../../grid/grid.service';
import {UtilService} from '../../util/util.service';
import {CellFungus} from './cell-fungus';

export class Fungus {
  private _grid: GridService;

  private readonly _colour: string;
  private readonly _breedDelayLowMs: number;
  private readonly _breedDelayHighMs: number;

  constructor(private _injector: Injector) {
    this._grid = _injector.get(GridService);
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
