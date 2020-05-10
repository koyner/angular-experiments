import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '../../config/config.service';
import {Cell, CellType} from '../../model/cell';
import {CellFungus} from '../../model/cell-fungus';
import {RenderService} from '../../render/render.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.less'],
})
export class CellComponent implements OnInit {
  @Input() cell: Cell;
  constructor(private renderer: RenderService, private config: ConfigService) {}

  ngOnInit(): void {}

  clicked(): void {
    console.log(
      `${this.cell.col}, ${this.cell.row}, ${this.cell.type}, ${this.cell.colour}`,
    );
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
    if (this.cell.type === CellType.fungus) {
      return Math.max(
        this.config.fungusMinOpacity,
        1 - (this.cell as CellFungus).age / this.config.fungusAgeDelayMs,
      );
    } else {
      return 1;
    }
  }
}
