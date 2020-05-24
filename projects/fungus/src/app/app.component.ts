import {Component} from '@angular/core';
import {BgService} from './bg/bg.service';
import {FungusService} from './fungus/fungus.service';
import {RenderService} from './render/render.service';
import {StatusService} from './status/status.service';
import {WallService} from './wall/wall.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(
    private _renderer: RenderService,
    private _bgService: BgService,
    private _fungusService: FungusService,
    private _wallService: WallService,
    private _status: StatusService
  ) {
    this._status.init();
    this._bgService.init();
    this._fungusService.init();
    this._wallService.init();
  }

  resized(size: number): void {
    this._renderer.size = size;
  }
}
