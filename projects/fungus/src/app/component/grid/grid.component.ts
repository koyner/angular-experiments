import {Component, OnInit} from '@angular/core';
import {GridService, IGridEl} from '../../util/grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less'],
})
export class GridComponent implements OnInit {
  constructor(private gridService: GridService) {}

  ngOnInit(): void {}

  get grid(): IGridEl[] {
    return this.gridService.grid;
  }
}
