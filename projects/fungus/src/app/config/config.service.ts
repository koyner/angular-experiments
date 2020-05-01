import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly _cols = 9;
  private readonly _rows = 9;
  constructor() {}

  get cols() {
    return this._cols;
  }

  get rows() {
    return this._rows;
  }
}
