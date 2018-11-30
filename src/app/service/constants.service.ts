import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  scale: number;
  speed = 0.002;

  constructor(@Inject('Window') window: Window) {
    this.resize();
  }

  resize() {
    this.scale = Math.min(this.winW, this.winH) - 20;
  }

  get winW() {
    return window.innerWidth;
  }

  get winH() {
    return window.innerHeight;
  }

}
