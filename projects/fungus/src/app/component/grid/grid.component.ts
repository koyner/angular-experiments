import {Component, OnInit} from '@angular/core';
import {Cell} from '../../model/cell';
import {GridService} from '../../util/grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less'],
})
export class GridComponent implements OnInit {
  constructor(private gridService: GridService) {}

  ngOnInit(): void {}

  get grid(): Cell[] {
    return this.gridService.grid;
  }
}
