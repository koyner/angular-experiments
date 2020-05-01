import {Component} from '@angular/core';

import {ConfigService} from './config/config.service';
import {CellBg} from './model/cell-bg';
import {Fungus} from './model/fungus';
import {RenderService} from './render/render.service';
import {UtilService} from './util/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  private _fungusBg: CellBg[][] = [];
  private _fungus = new Fungus(this.config, this.util);

  constructor(
    private renderer: RenderService,
    private config: ConfigService,
    private util: UtilService,
  ) {
    for (let i = 0; i < this.config.rows; i++) {
      this._fungusBg[i] = [];
      for (let j = 0; j < this.config.cols; j++) {
        this._fungusBg[i][j] = {
          row: i,
          col: j,
          colour: '#222',
          bgProp: 'some-prop',
        };
      }
    }
  }

  get fungusBg() {
    return this._fungusBg;
  }

  get fungus() {
    return this._fungus;
  }

  resized(size: number) {
    this.renderer.size = size;
  }
}
