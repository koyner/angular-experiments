import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CellComponent} from './cell/cell.component';
import {GridComponent} from './grid/grid.component';

@NgModule({
  declarations: [CellComponent, GridComponent],
  imports: [CommonModule],
  exports: [CellComponent, GridComponent],
})
export class FungusComponentsModule {}
