import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {FungusService} from '../fungus/fungus.service';
import {CellFungus} from '../fungus/model/cell-fungus';
import {GridService} from '../grid/grid.service';
import {Animatable, AnimateService} from '../util/animate.service';
import {CellWall} from '../wall/model/cell-wall';

@Injectable({
  providedIn: 'root'
})
export class StatusService implements Animatable {
  constructor(
    private _animate: AnimateService,
    private _config: ConfigService,
    private _fungusService: FungusService,
    private _grid: GridService
  ) {}

  init(): void {
    this._animate.add(this);
  }

  animate(_tsDiff: number): void {
    if (this.areAllCellsFungusAndWall() && this.isOneFungusLeft) {
      this._config.finish();
    }
  }

  private areAllCellsFungusAndWall(): boolean {
    return this.fungusOrWallCellCount === this._config.spaceCount;
  }

  private get fungusOrWallCellCount(): number {
    return this._grid.cells.filter(
      c => c instanceof CellFungus || c instanceof CellWall
    ).length;
  }
  
  private get isOneFungusLeft(): boolean {
    return this._fungusService.fungusCount === 1;
  }
}
