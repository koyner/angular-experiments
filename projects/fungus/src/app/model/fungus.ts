import {Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {GridService} from '../util/grid.service';
import {UtilService} from '../util/util.service';
import {CellFungus} from './cell-fungus';

export class Fungus {
  private util: UtilService;
  private grid: GridService;
  private config: ConfigService;

  private readonly _colour: string;
  private readonly _breedDelayLowMs: number;
  private readonly _breedDelayHighMs: number;

  constructor(private injector: Injector) {
    this.util = injector.get(UtilService);
    this.grid = injector.get(GridService);
    this.config = injector.get(ConfigService);
    this._colour = this.util.randomColourStr;
    this._breedDelayLowMs =
      this.config.fungusBreedDelayLowMinMs +
      Math.random() *
        (this.config.fungusBreedDelayLowMaxMs -
          this.config.fungusBreedDelayLowMinMs);
    this._breedDelayHighMs =
      this.config.fungusBreedDelayHighMinMs +
      Math.random() *
        (this.config.fungusBreedDelayHighMaxMs -
          this.config.fungusBreedDelayHighMinMs);

    this.add(
      new CellFungus(
        this.injector,
        this,
        this.grid.randCol(),
        this.grid.randRow(),
        true,
      ),
    );
  }

  add(cellFungus: CellFungus): void {
    this.grid.add(cellFungus);
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
}
