import {Component} from '@angular/core';

import {ConfigService} from './config/config.service';
import {CellBg} from './model/cell-bg';
import {Fungus} from './model/fungus';
import {RenderService} from './render/render.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  private _cellBgGrid: CellBg[][] = [];
  private _fungus = new Fungus();

  constructor(private renderer: RenderService, private config: ConfigService) {
    for (let i = 0; i < this.config.rows; i++) {
      this._cellBgGrid[i] = [];
      for (let j = 0; j < this.config.cols; j++) {
        this._cellBgGrid[i][j] = {
          row: i,
          col: j,
          colour: '#444',
          bgProp: 'some-prop',
        };
      }
    }
  }

  get cellBgGrid() {
    return this._cellBgGrid;
  }

  get fungus() {
    return this._fungus;
  }

  resized(size: number) {
    this.renderer.size = size;
  }
}
