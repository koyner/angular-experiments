import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {StatusService} from '../status/status.service';
import {UtilService} from './util.service';

export interface Animatable {
  animate: (tsDiff: number) => void;
}

@Injectable({
  providedIn: 'root'
})
export class AnimateService {
  private _animatable: Animatable[] = [];
  private _tsPrev: number;
  constructor(
    private _config: ConfigService,
    private _status: StatusService,
    private _util: UtilService
  ) {
    this._tsPrev = this._util.now;
    window.setInterval(() => {
      const tsNow = this._util.now;
      if (!this._status.paused) {
        this._animatable.forEach(a => a.animate(tsNow - this._tsPrev));
      }
      this._tsPrev = tsNow;
    }, this._config.animateMs);
  }

  add(a: Animatable): void {
    this._animatable.push(a);
  }

  remove(a: Animatable): void {
    this._animatable.splice(this._animatable.indexOf(a), 1);
  }

  isAnimatable(object: any): object is Animatable {
    return object && 'animate' in object;
  }

  get count(): number {
    return this._animatable.length;
  }
}
