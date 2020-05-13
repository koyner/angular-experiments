import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '../../config/config.service';
import {Cell} from '../../model/cell';
import {CellFungus} from '../../model/cell-fungus';
import {RenderService} from '../../render/render.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.less'],
})
export class CellComponent {
  @Input() cell: Cell;
  constructor(private renderer: RenderService, private config: ConfigService) {}

  clicked(): void {
    console.log(this.cell.toString());
  }

  get x(): number {
    return this.renderer.xFor(this.cell);
  }

  get y(): number {
    return this.renderer.yFor(this.cell);
  }

  get w(): number {
    return this.renderer.wFor(this.cell);
  }

  get h(): number {
    return this.renderer.hFor(this.cell);
  }

  get colour(): string {
    return this.cell.colour;
  }

  get opacity(): number {
    // if (this.cell instanceof CellFungus) {
    //   const cf = this.cell as CellFungus;
    //   if (!cf.isNode) {
    //     return Math.max(
    //       this.config.fungusMinOpacity,
    //       1 - cf.age / this.config.fungusAgingDelayMs,
    //     );
    //   }
    // }
    // return 1;
    if (this.cell instanceof CellFungus) {
      const cf = this.cell as CellFungus;
      if (!cf.isNode) {
        return 0.7;
      }
    }
    return 1;
  }
}
