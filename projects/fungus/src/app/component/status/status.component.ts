import {Component} from '@angular/core';
import {Fungus} from '../../model/fungus';
import {AnimateService} from '../../util/animate.service';
import {FungusService} from '../../util/fungus.service';
import {GridService} from '../../util/grid.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent {
  constructor(
    private _animate: AnimateService,
    private _fungusService: FungusService,
    private _grid: GridService
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
}
