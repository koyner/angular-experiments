import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CellComponent} from './cell/cell.component';

@NgModule({
  declarations: [CellComponent],
  imports: [CommonModule],
  exports: [CellComponent],
})
export class FungusComponentModule {}
