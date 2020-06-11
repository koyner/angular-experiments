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
  cols = 39;
  rows = 39;
  wallCount = 8;
  wallLengthMin = 3;
  fungus = {
    count: 3,
    breedDelayLowMinMs: 200,
    breedDelayLowMaxMs: 200,
    breedDelayHighMinMs: 400,
    breedDelayHighMaxMs: 400,
    agingDelayMs: 200,
    mutation: 30, // 0 to 200
    mutationShift: -0.05, // -0.5 zo 0.5
    minOpacity: 0.3,
    nodeOpacity: 1,
    birthBrightness: 0.3, // -1 to 1
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
