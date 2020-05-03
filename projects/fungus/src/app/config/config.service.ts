import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly _cols = 29;
  private readonly _rows = 29;
  constructor() {}

  get cols(): number {
    return this._cols;
  }

  get rows(): number {
    return this._rows;
  }
}
