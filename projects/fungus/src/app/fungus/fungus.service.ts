import {Injectable, Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {GridService} from '../grid/grid.service';
import {Fungus} from './model/fungus';

@Injectable({
  providedIn: 'root'
})
export class FungusService {
  private readonly _fungi: Fungus[] = [];

  constructor(
    private _injector: Injector,
    private _config: ConfigService,
    private _grid: GridService
  ) {}

  init(): void {
    let i = 0;
    while (i++ < this._config.fungusCount) {
      this.createFungusAt(this._grid.randCol(), this._grid.randRow());
    }
  }

  get fungi(): Fungus[] {
    return this._fungi.filter(f => !f.isDead);
  }

  get count(): number {
    return this.fungi.length;
  }

  createFungusAt(col: number, row: number): void {
    const f = new Fungus(this._injector);
    f.addCell(col, row, true);
    this._fungi.push(f);
  }
}
