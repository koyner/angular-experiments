import {Component} from '@angular/core';
import {Cell} from '../../model/cell';
import {GridService} from '../../util/grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent {
  constructor(private _grid: GridService) {}

  get cells(): Cell[] {
    return this._grid.cells;
  }
}
