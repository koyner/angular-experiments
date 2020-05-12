import {Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {AnimateService} from '../util/animate.service';
import {GridService} from '../util/grid.service';
import {UtilService} from '../util/util.service';
import {CellType} from './cell';
import {CellFungus} from './cell-fungus';

export class Fungus {
  private util: UtilService;
  private grid: GridService;
  private config: ConfigService;
  private animate: AnimateService;

  private readonly _breedDelayLowMs: number;
  private readonly _breedDelayHighMs: number;

  constructor(private injector: Injector) {
    this.util = injector.get(UtilService);
    this.grid = injector.get(GridService);
    this.config = injector.get(ConfigService);
    this.animate = injector.get(AnimateService);
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
      new CellFungus(
        this.injector,
        this,
        this.util.randomColStr,
        this.randCol(),
        this.randRow(),
        true,
      ),
    );
  }

  add(cell: CellFungus): void {
    const replaced = this.grid.add(cell);
    this.animate.add(cell);
    if (replaced && (replaced as CellFungus).type === CellType.fungus) {
      this.animate.remove(replaced as CellFungus);
    }
  }

  get breedDelayLowMs(): number {
    return this._breedDelayLowMs;
  }

  get breedDelayHighMs(): number {
    return this._breedDelayHighMs;
  }

  private randCol(): number {
    return Math.floor(Math.random() * this.config.cols);
  }

  private randRow(): number {
    return Math.floor(Math.random() * this.config.rows);
  }
}
