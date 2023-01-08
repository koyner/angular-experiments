import {Injectable} from '@angular/core';

export enum FungusShape {
  circle,
  square
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  bgColour = 'rgb(5, 5, 5)';
  animateMs = 20;
  fpsRefreshMs = 500;
  cols = 50;
  rows = 50;
  wall = {
    count: 0,
    lengthMin: 3
  };
  fungus = {
    count: 10, // number of funguses at the start,
    mutation: {
      rate: 40, // 0 to 200
      shift: -0.09 // -0.5 zo 0.5
    },
    breedDelay: {
      loMinMs: 0, // the min possible low value for a fungus's breed delay
      loMaxMs: 100, // the max possible low value for a fungus's breed delay
      hiMinMs: 300, // the min possible high value for a fungus's breed delay
      hiMaxMs: 600 // the max possible high value for a fungus's breed delay
    },
    cell: {
      shape: FungusShape.circle,
      nodeOpacity: 1,
      minOpacity: 0.2,
      birthBrightness: 0.3, // -1 to 1
      agingDelayMs: 100
    }
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
