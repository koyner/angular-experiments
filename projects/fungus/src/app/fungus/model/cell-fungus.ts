import {Injector} from '@angular/core';
import {Cell} from '../../cell/model/cell';
import {Cardinal, GridService} from '../../grid/grid.service';
import {Animatable} from '../../util/animate.service';
import {UtilService} from '../../util/util.service';
import {Fungus} from './fungus';

export class CellFungus extends Cell implements Animatable {
  private _grid: GridService;
  private _util: UtilService;
  private _age: number;
  private _breedNext: number;
  private readonly _createdAt: number;
  constructor(
    private _injector: Injector,
    private _fungus: Fungus,
    col: number,
    row: number,
    private _isNode: boolean
  ) {
    super(_fungus.colour, col, row);
    this._grid = _injector.get(GridService);
    this._util = _injector.get(UtilService);
    this._createdAt = this._util.now;
    this.cueNextBreed();
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
    this._age = this._util.now - this._createdAt;
    this.breed();
  }

  private breed(): void {
    if (this._breedNext < this._util.now) {
      let coords;
      switch (this.dirGrow()) {
        case Cardinal.w:
          coords = {col: this.col - 1, row: this.row};
          break;
        case Cardinal.e:
          coords = {col: this.col + 1, row: this.row};
          break;
        case Cardinal.n:
          coords = {col: this.col, row: this.row - 1};
          break;
        case Cardinal.s:
          coords = {col: this.col, row: this.row + 1};
          break;
        default:
          break;
      }
      if (coords) {
        this._fungus.add(
          new CellFungus(
            this._injector,
            this._fungus,
            coords.col,
            coords.row,
            false
          )
        );
      }
      this.cueNextBreed();
    }
  }

  private cueNextBreed(): void {
    this._breedNext =
      this._util.now +
      this._fungus.breedDelayLowMs +
      Math.random() *
        (this._fungus.breedDelayHighMs - this._fungus.breedDelayLowMs);
  }

  private dirGrow(): Cardinal {
    const neighbours = this._grid.neighboursOf(this);
    const targetNeighbourKeys = Object.keys(neighbours).filter(
      key =>
        !(
          neighbours[key] instanceof CellFungus &&
          (neighbours[key] as CellFungus).fungus === this.fungus
        )
    );
    return this._util.randomElOf(targetNeighbourKeys) as Cardinal;
  }
}