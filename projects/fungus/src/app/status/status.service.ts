import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private _paused: boolean;

  constructor() {}

  get paused(): boolean {
    return this._paused;
  }

  set paused(p: boolean) {
    this._paused = p;
  }
}
