import {Injectable} from '@angular/core';
import {BgService} from '../bg/bg.service';
import {ConfigService} from '../config/config.service';
import {FungusService} from '../fungus/fungus.service';
import {GridService} from '../grid/grid.service';
import {Animatable, AnimateService} from '../util/animate.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService implements Animatable {
  constructor(
    private _animate: AnimateService,
    private _config: ConfigService,
    private _fungusService: FungusService,
    private _bgService: BgService,
    private _grid: GridService
  ) {}

  init(): void {
    this._animate.add(this);
  }

  animate(_tsDiff: number): void {
    if (this.isDone()) {
      this._config.finish();
    }
  }

  private isDone() {
    return this.areNoCellsBg() && this.isOneFungusLeft();
  }

  private areNoCellsBg(): boolean {
    return this._bgService.count === 0;
  }

  private isOneFungusLeft(): boolean {
    return this._fungusService.fungusCount === 1;
  }
}
