import {Component} from '@angular/core';
import {RenderService} from './render/render.service';
import {BgService} from './util/bg.service';
import {FungusService} from './util/fungus.service';

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
