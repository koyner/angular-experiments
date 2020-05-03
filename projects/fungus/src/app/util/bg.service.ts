import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {CellBg} from '../model/cell-bg';
import {GridService} from './grid.service';

@Injectable({
  providedIn: 'root',
})
export class BgService {
  constructor(private config: ConfigService, private grid: GridService) {}

  init(): void {
    for (let i = 0; i < this.config.cols; i++) {
      for (let j = 0; j < this.config.rows; j++) {
        this.grid.set(new CellBg('#222'), i, j);
      }
    }
  }
}
