import {Component} from '@angular/core';
import {Cell} from '../../cell/model/cell';
import {GridService} from '../grid.service';

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
