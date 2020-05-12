import {Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {AnimateService} from '../util/animate.service';
import {GridService} from '../util/grid.service';
import {UtilService} from '../util/util.service';
import {CellFungus} from './cell-fungus';

export class Fungus {
  private util: UtilService;
  private grid: GridService;
  private config: ConfigService;
  private animate: AnimateService;

  private readonly _colour: string;
  private readonly _breedDelayLowMs: number;
  private readonly _breedDelayHighMs: number;

  constructor(private injector: Injector) {
    this.util = injector.get(UtilService);
    this.grid = injector.get(GridService);
    this.config = injector.get(ConfigService);
    this.animate = injector.get(AnimateService);
    this._colour = this.util.randomColStr;
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
  }

  init(): void {
    this.add(
      new CellFungus(this.injector, this, this.randCol(), this.randRow(), true),
    );
  }

  add(cell: CellFungus): void {
    this.grid.add(cell);
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

  private randCol(): number {
    return Math.floor(Math.random() * this.config.cols);
  }

  private randRow(): number {
    return Math.floor(Math.random() * this.config.rows);
  }
}
