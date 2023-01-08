import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {BgService} from './bg/bg.service';
import {ConfigService} from './config/config.service';
import {FungusService} from './fungus/fungus.service';
import {RenderService} from './render/render.service';
import {StatusService} from './status/status.service';
import {AnimateService} from './util/animate.service';
import {WallService} from './wall/wall.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myCanvas') myCanvas: ElementRef<HTMLCanvasElement>;

  constructor(
    private _renderer: RenderService,
    private _config: ConfigService,
    private _bgService: BgService,
    private _fungusService: FungusService,
    private _wallService: WallService,
    private _status: StatusService,
    private _animate: AnimateService
  ) {
    this._bgService.init();
    this._wallService.init();
    this._fungusService.init();
    this._renderer.init();
    this._status.init();
    this._animate.start();
  }

  ngAfterViewInit(): void {
    this._renderer.setCanvas(this.myCanvas.nativeElement);
  }

  resized(size: number): void {
    this._renderer.size = size;
  }

  isDomEnabled(): boolean {
    return this._config.domEnabled;
  }
}
