import {Inject, Injectable, InjectionToken} from '@angular/core';

export const WINDOW = new InjectionToken('Window');

/** @dynamic */
@Injectable()
export class ConstantsService {
  scale: number;
  speed = 0.002;

  constructor(@Inject(WINDOW) private window: Window) {
    this.resize();
  }

  resize(): void {
    this.scale = Math.min(this.winW, this.winH) - 20;
  }

  get winW(): number {
    return this.window.innerWidth;
  }

  get winH(): number {
    return this.window.innerHeight;
  }
}
