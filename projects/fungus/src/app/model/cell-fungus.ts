import {Injector} from '@angular/core';
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
    private _fungus: Fungus,
    colour: string,
    col: number,
    row: number,
    private _isNode: boolean,
  ) {
    super(colour, col, row);
    this.grid = injector.get(GridService);
    this.config = injector.get(ConfigService);
    this._createdAt = this.now;
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

  get fungus(): Fungus {
    return this._fungus;
  }

  animate(): void {
    this._age = this.now - this._createdAt;
    this.breed();
  }

  private breed(): void {
    if (this._breedNext < this.now) {
      if (this.grid.canGrow(this)) {
        let coordsNew;
        switch (this.grid.dirGrow(this)) {
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
          this._fungus,
          this.colour,
          coordsNew.col,
          coordsNew.row,
          false,
        );
        this._fungus.add(cellNew);
      }
      this.cueNextBreed();
    }
  }

  private get now(): number {
    return Date.now();
  }

  private cueNextBreed(): void {
    this._breedNext =
      this.now +
      this._fungus.breedDelayLowMs +
      Math.random() *
        (this._fungus.breedDelayHighMs - this._fungus.breedDelayLowMs);
  }
}
