import {Component} from '@angular/core';
import {ConfigService} from '../../config/config.service';
import {FungusService} from '../../fungus/fungus.service';
import {Fungus} from '../../fungus/model/fungus';
import {GridService} from '../../grid/grid.service';
import {AnimateService} from '../../util/animate.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent {
  constructor(
    private _animate: AnimateService,
    private _fungusService: FungusService,
    private _grid: GridService,
    private _config: ConfigService
  ) {}

  get animatableCount(): number {
    return this._animate.animatableCount;
  }

  get fungusCount(): number {
    return this._fungusService.fungusCount;
  }

  get fungi(): Fungus[] {
    return this._fungusService.fungi;
  }

  get cellCount(): number {
    return this._grid.cellCount;
  }

  get age(): number {
    return this._animate.age / 1000;
  }

  get paused(): boolean {
    return this._config.paused;
  }

  set paused(p: boolean) {
    this._config.paused = p;
  }
}
