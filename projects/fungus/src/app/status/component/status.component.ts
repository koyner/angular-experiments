import {Component} from '@angular/core';
import {FungusService} from '../../fungus/fungus.service';
import {Fungus} from '../../fungus/model/fungus';
import {GridService} from '../../grid/grid.service';
import {AnimateService} from '../../util/animate.service';
import {StatusService} from '../status.service';

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
    private _status: StatusService
  ) {}

  get animatableCount(): number {
    return this._animate.count;
  }

  get fungusCount(): number {
    return this._fungusService.count;
  }

  get fungi(): Fungus[] {
    return this._fungusService.fungi;
  }

  get cellCount(): number {
    return this._grid.count;
  }

  get paused(): boolean {
    return this._status.paused;
  }

  set paused(p: boolean) {
    this._status.paused = p;
  }
}
