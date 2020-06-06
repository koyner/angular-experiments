import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
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
  private _age = 0;
  constructor(private _config: ConfigService, private _util: UtilService) {
    this._tsPrev = this._util.now;
    window.setInterval(this.animateFrame, this._config.animateMs);
  }

  add(a: Animatable): void {
    this._animatable.push(a);
  }

  get animatableCount(): number {
    return this._animatable.length;
  }

  get age(): number {
    return this._age;
  }

  private animateFrame = (): void => {
    const tsNow = this._util.now;
    if (this.isAnimating()) {
      const tsDiff = tsNow - this._tsPrev;
      this._age += tsDiff;
      this._animatable.forEach(a => a.animate(tsDiff));
    }
    this._tsPrev = tsNow;
  };

  private isAnimating(): boolean {
    return !this._config.paused && !this._config.finished;
  }
}
