import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  bgColour = 'rgb(10, 10, 10)';
  animateMs = 20;
  cols = 39;
  rows = 39;
  wallCount = 10;
  wallLengthMin = 3;
  fungusCount = 20;
  fungusBreedDelayLowMinMs = 300;
  fungusBreedDelayLowMaxMs = 300;
  fungusBreedDelayHighMinMs = 300;
  fungusBreedDelayHighMaxMs = 300;
  fungusAgingDelayMs = 200;
  fungusMinOpacity = 0.2;
  fungusNodeOpacity = 1;

  private _finished: boolean;
  private _paused: boolean;

  constructor() {
    this._finished = false;
    this._paused = false;
  }
  get paused(): boolean {
    return this._paused;
  }

  set paused(p: boolean) {
    this._paused = p;
  }

  get finished(): boolean {
    return this._finished;
  }

  finish(): void {
    this._finished = true;
  }
}
