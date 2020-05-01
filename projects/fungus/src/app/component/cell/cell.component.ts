import {Component, Input, OnInit} from '@angular/core';
import {Cell} from '../../model/cell';
import {RenderService} from '../../render/render.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.less'],
})
export class CellComponent implements OnInit {
  @Input() cell: Cell;
  constructor(private renderer: RenderService) {}

  ngOnInit(): void {}

  clicked() {
    console.log(`clicked: ${this.cell.col}, ${this.cell.row}`);
  }

  get x() {
    return this.renderer.xFor(this.cell);
  }

  get y() {
    return this.renderer.yFor(this.cell);
  }

  get w() {
    return this.renderer.wFor(this.cell);
  }

  get h() {
    return this.renderer.hFor(this.cell);
  }

  get colour() {
    return this.cell.colour;
  }
}
