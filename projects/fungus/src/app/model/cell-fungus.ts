import {Injector} from '@angular/core';
import {Config} from 'codelyzer';
import {ConfigService} from '../config/config.service';
import {Animatable} from '../util/animate.service';
import {Cardinal, GridService} from '../util/grid.service';
import {Cell, CellType} from './cell';
import {Fungus} from './fungus';

export class CellFungus extends Cell implements Animatable {
  private grid: GridService;
  private config: ConfigService;
  private _age: number;
  private _breedNext: number;
  private readonly _createdAt: number;
  constructor(
    private injector: Injector,
    private fungus: Fungus,
    colour: string,
    col: number,
    row: number,
    private _isNode: boolean,
  ) {
    super(colour, col, row);
    this.grid = injector.get(GridService);
    this.config = injector.get(ConfigService);
    this._createdAt = Date.now();
    this.cueNextBreed();
  }

  get type(): CellType {
    return CellType.fungus;
  }

  get isNode(): boolean {
    return this._isNode;
  }

  get age(): number {
    return this._age;
  }

  animate(): void {
    this.breed();
    this._age = Date.now() - this._createdAt;
  }

  private breed(): void {
    if (this._breedNext < Date.now()) {
      if (this.grid.hasNeighbourOfDifferentType(this, CellType.fungus)) {
        let coordsNew;
        switch (
          this.grid.dirOfRandomNeighbourWithDifferentType(this, CellType.fungus)
        ) {
          case Cardinal.w:
            coordsNew = {col: this.col - 1, row: this.row};
            break;
          case Cardinal.e:
            coordsNew = {col: this.col + 1, row: this.row};
            break;
          case Cardinal.n:
            coordsNew = {col: this.col, row: this.row - 1};
            break;
          case Cardinal.s:
            coordsNew = {col: this.col, row: this.row + 1};
            break;
          default:
            break;
        }
        const cellNew = new CellFungus(
          this.injector,
          this.fungus,
          this.colour,
          coordsNew.col,
          coordsNew.row,
          false,
        );
        this.fungus.add(cellNew);
        this.cueNextBreed();
      }
    }
  }

  private cueNextBreed(): void {
    this._breedNext =
      Date.now() +
      this.fungus.breedDelayLowMs +
      Math.random() *
        (this.fungus.breedDelayHighMs - this.fungus.breedDelayLowMs);
  }
}
