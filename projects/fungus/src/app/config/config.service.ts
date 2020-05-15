import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  bgColour = 'rgb(30, 30, 30)';
  animateMs = 20;
  cols = 9;
  rows = 9;
  fungusCount = 0;
  fungusBreedDelayLowMinMs = 50;
  fungusBreedDelayLowMaxMs = 200;
  fungusBreedDelayHighMinMs = 1000;
  fungusBreedDelayHighMaxMs = 4000;
  fungusAgingDelayMs = 300;
  fungusMinOpacity = 0.7;

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

  get spaceCount(): number {
    return this.rows * this.cols;
  }
}
