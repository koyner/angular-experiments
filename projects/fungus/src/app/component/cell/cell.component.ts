import {Component, Input, OnInit} from '@angular/core';
import {Cell} from '../../model/cell';
import {RenderService} from '../../render/render.service';
import {GridService} from '../../util/grid.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.less'],
})
export class CellComponent implements OnInit {
  @Input() cell: Cell;
  constructor(private renderer: RenderService) {}

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
}
