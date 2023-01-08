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
  private _didKill: boolean;
  private _opacity = -1;
  private _opacityPrev;
  constructor(
    _injector: Injector,
    private _fungus: Fungus,
    col: number,
    row: number,
    private _isNode: boolean
  ) {
    super(_injector, _fungus.colour, col, row);
    this._grid = _injector.get(GridService);
    this._util = _injector.get(UtilService);
    this._config = _injector.get(ConfigService);
    this._pctVelocity = this.isNode ? 50 : this.calcPctVelocity();
    this.calcOpacity();
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
    this.calcOpacity();
    this.breed();
  }

  get type(): CellType {
    return CellType.fungus;
  }

  calcOpacity(): void {
    this._opacityPrev = this._opacity;
    if (this.isNode) {
      this._opacity = this._config.fungus.cell.nodeOpacity;
    } else {
      const birthBrightness =
        this._config.fungus.cell.birthBrightness * (this._didKill ? 1 : -1);
      this._opacity = Math.max(
        this._config.fungus.cell.minOpacity,
        Math.min(
          1,
          this._pctVelocity / 100 +
            birthBrightness *
              Math.max(0, 1 - this.age / this._config.fungus.cell.agingDelayMs)
        )
      );
    }
  }

  get opacity(): number {
    return this._opacity;
  }

  set didKill(d: boolean) {
    this._didKill = d;
  }

  wasRendered(): void {
    if (this._opacity === this._opacityPrev) {
      this._render.remove(this);
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
    this._breedNext = this.age + this.calcTimeToNextBreedMs();
  }

  private calcTimeToNextBreedMs(): number {
    return (10 - (9 * this._pctVelocity) / 100) * this.calcRandBreedDelayMs();
  }

  private calcRandBreedDelayMs(): number {
    return (
      this._fungus.breedDelayLowMs +
      Math.random() * this._fungus.breedDelayRangeMs
    );
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

  private calcPctVelocity(): number {
    return Math.max(
      0,
      Math.min(
        100,
        this.nbrVelocityAvg +
          this._config.fungus.mutation.rate *
            (Math.random() - 0.5 + this._config.fungus.mutation.shift)
      )
    );
  }

  private get nbrVelocityAvg(): number {
    return (
      this.nbrVelocities.reduce((acc: number, curr: number) => acc + curr, 0) /
      this.nbrVelocities.length
    );
  }

  private get nbrVelocities(): number[] {
    return this._grid
      .neighbourArrayOf(this)
      .filter(c => c instanceof CellFungus && c.fungus === this.fungus)
      .map(c => (c as CellFungus)._pctVelocity);
  }
}
