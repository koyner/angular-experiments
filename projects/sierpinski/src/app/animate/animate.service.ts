import {Inject, Injectable} from '@angular/core';

import {DrawService} from '../draw/draw.service';
import {SettingsService} from '../settings/settings.service';

@Injectable()
export class AnimateService {
  set time(t: number) {
    this._time = t;
    this.draw.update();
  }

  get time(): number {
    return this._time;
  }

  get frame(): number {
    return this.time / this.settings.fpsIdeal;
  }

  fps = 0;
  private _time = Date.now();
  private _fpsTimeLast = this.time;
  private _fpsCount = 0;
  private _fpsCountLast = 0;

  constructor(
    @Inject('Window') private window: Window,
    private settings: SettingsService,
    private draw: DrawService
  ) {}

  start(): void {
    const next = () => {
      this.window.requestAnimationFrame(() => {
        this.time = Date.now();
        this.fpsCalc();
        next();
      });
    };
    next();
  }

  private fpsCalc(): void {
    this._fpsCount++;
    const fpsTimeElapsed = this.time - this._fpsTimeLast;
    if (fpsTimeElapsed > this.settings.fpsUpdateRate) {
      this.fps =
        ((this._fpsCount - this._fpsCountLast) * 1000) / fpsTimeElapsed;
      this._fpsTimeLast = this.time;
      this._fpsCountLast = this._fpsCount;
      if (this.fps < this.settings.fpsMin) {
        this.settings.levels--;
      }
    }
  }
}
