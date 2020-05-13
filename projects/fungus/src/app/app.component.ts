import {Component} from '@angular/core';
import {BgService} from './bg/bg.service';
import {FungusService} from './fungus/fungus.service';
import {RenderService} from './render/render.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(
    private _renderer: RenderService,
    private _fungusService: FungusService,
    private _bgService: BgService
  ) {
    this._bgService.init();
    this._fungusService.init();
  }

  resized(size: number): void {
    this._renderer.size = size;
  }
}
