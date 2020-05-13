import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CellComponent} from './cell/cell.component';
import {GridComponent} from './grid/grid.component';
import {StatusComponent} from './status/status.component';

@NgModule({
  declarations: [CellComponent, GridComponent, StatusComponent],
  imports: [CommonModule],
  exports: [CellComponent, GridComponent, StatusComponent]
})
export class FungusComponentsModule {}
