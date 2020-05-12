import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';

export interface Animatable {
  animate: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class AnimateService {
  private _animatable: Animatable[] = [];
  constructor(private config: ConfigService) {
    window.setInterval(() => {
      this._animatable.forEach(a => a.animate());
    }, this.config.animateMs);
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
