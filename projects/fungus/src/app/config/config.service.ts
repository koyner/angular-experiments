import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly _rows = 9;
  private readonly _cols = 9;
  constructor() {}

  get rows() {
    return this._rows;
  }

  get cols() {
    return this._cols;
  }
}
