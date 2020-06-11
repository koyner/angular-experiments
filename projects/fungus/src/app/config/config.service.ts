import {Injectable} from '@angular/core';

export enum FungusShape {
  circle,
  square
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  bgColour = 'rgb(10, 10, 10)';
  animateMs = 20;
  fpsRefreshMs = 500;
  cols = 49;
  rows = 49;
  wallCount = 8;
  wallLengthMin = 3;
  fungus = {
    count: 5,
    breedDelayLowMinMs: 0,
    breedDelayLowMaxMs: 0,
    breedDelayHighMinMs: 200,
    breedDelayHighMaxMs: 200,
    agingDelayMs: 200,
    mutation: 40, // 0 to 200
    mutationShift: -0.09, // -0.5 zo 0.5
    minOpacity: 0.3,
    nodeOpacity: 1,
    birthBrightness: 0.3, // -1 to 1
    fillEdges: false,
    shape: FungusShape.circle
  };

  private _finished: boolean;
  private _paused: boolean;
  private _domEnabled: boolean;

  constructor() {
    this._finished = false;
    this._paused = false;
    this._domEnabled = false;
  }

  get paused(): boolean {
    return this._paused;
  }

  set paused(p: boolean) {
    this._paused = p;
  }

  get domEnabled(): boolean {
    return this._domEnabled;
  }

  set domEnabled(d: boolean) {
    this._domEnabled = d;
  }

  get finished(): boolean {
    return this._finished;
  }

  finish(): void {
    this._finished = true;
  }
}
