import {Component, Input} from '@angular/core';
import {Cell} from '../model/cell';
import {ConfigService} from '../../config/config.service';
import {CellFungus} from '../../fungus/model/cell-fungus';
import {RenderService} from '../../render/render.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.less']
})
export class CellComponent {
  @Input() cell: Cell;
  constructor(
    private _renderer: RenderService,
    private _config: ConfigService
  ) {}

  clicked(): void {
    console.log(this.cell.toString());
  }

  get x(): number {
    return this._renderer.xFor(this.cell);
  }

  get y(): number {
    return this._renderer.yFor(this.cell);
  }

  get w(): number {
    return this._renderer.wFor(this.cell);
  }

  get h(): number {
    return this._renderer.hFor(this.cell);
  }

  get colour(): string {
    return this.cell.colour;
  }

  get opacity(): number {
    if (this.cell instanceof CellFungus) {
      const cf = this.cell as CellFungus;
      if (!cf.isNode) {
        return Math.max(
          this._config.fungusMinOpacity,
          1 - cf.age / this._config.fungusAgingDelayMs
        );
      }
    }
    return 1;
  }
}