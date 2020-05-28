import {Injector} from '@angular/core';
import {Cell, CellType} from '../../cell/model/cell';
import {ConfigService} from '../../config/config.service';
import {Cardinal, GridService} from '../../grid/grid.service';
import {UtilService} from '../../util/util.service';
import {CellWall} from '../../wall/model/cell-wall';
import {Fungus} from './fungus';

export class CellFungus extends Cell {
  readonly _pctVelocity: number;
  private _grid: GridService;
  private _util: UtilService;
  private _config: ConfigService;
  private _age = 0;
  private _breedNext: number;
  constructor(
    private _injector: Injector,
    private _fungus: Fungus,
    col: number,
    row: number,
    private _isNode: boolean
  ) {
    super(_injector, _fungus.colour, col, row);
    this._grid = _injector.get(GridService);
    this._util = _injector.get(UtilService);
    this._config = _injector.get(ConfigService);
    const velocities = this._grid
      .neighbourArrayOf(this)
      .filter(c => c instanceof CellFungus && c.fungus === this.fungus)
      .map(c => (c as CellFungus)._pctVelocity);
    const velocityAvg =
      velocities.reduce((acc: number, curr: number) => acc + curr, 0) /
      velocities.length;
    this._pctVelocity = this.isNode
      ? 50
      : Math.max(0, Math.min(100, velocityAvg + 30 * (Math.random() - 0.62)));
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

  grow(elapsed: number): void {
    this._age += elapsed;
    this.breed();
  }

  get type(): CellType {
    return CellType.fungus;
  }

  get opacity(): number {
    if (!this.isNode) {
      return Math.max(
        this._config.fungusMinOpacity,
        Math.min(
          1,
          this._pctVelocity / 100 +
            0.15 * Math.max(0, 1 - this.age / this._config.fungusAgingDelayMs)
        )
      );
    } else {
      return this._config.fungusNodeOpacity;
    }
  }

  private breed(): void {
    if (this._breedNext < this.age) {
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
        this._fungus.addCell(coords.col, coords.row, false);
      }
      this.cueNextBreed();
    }
  }

  private cueNextBreed(): void {
    this._breedNext =
      this.age +
      (4 - (4 * this._pctVelocity) / 100) *
        (this._fungus.breedDelayLowMs +
          Math.random() *
            (this._fungus.breedDelayHighMs - this._fungus.breedDelayLowMs));
  }

  private dirGrow(): Cardinal {
    const neighbours = this._grid.neighboursDirsOf(this);
    const targetNeighbourKeys = Object.keys(neighbours).filter(
      key =>
        !(neighbours[key] instanceof CellWall) &&
        !(
          neighbours[key] instanceof CellFungus &&
          (neighbours[key] as CellFungus).fungus === this.fungus
        )
    );
    return this._util.randomElOf(targetNeighbourKeys) as Cardinal;
  }
}
