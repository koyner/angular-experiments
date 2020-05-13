import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CellComponent} from '../cell/component/cell.component';
import {GridComponent} from '../grid/component/grid.component';
import {StatusComponent} from '../status/component/status.component';

@NgModule({
  declarations: [CellComponent, GridComponent, StatusComponent],
  imports: [CommonModule],
  exports: [CellComponent, GridComponent, StatusComponent]
})
export class FungusComponentsModule {}
