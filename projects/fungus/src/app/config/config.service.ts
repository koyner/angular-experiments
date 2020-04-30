import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly _rows = 21;
  private readonly _cols = 21;
  constructor() {}

  get rows() {
    return this._rows;
  }

  get cols() {
    return this._cols;
  }
}
