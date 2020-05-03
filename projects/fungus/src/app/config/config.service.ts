import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly _cols = 19;
  private readonly _rows = 19;
  constructor() {}

  get cols(): number {
    return this._cols;
  }

  get rows(): number {
    return this._rows;
  }
}
