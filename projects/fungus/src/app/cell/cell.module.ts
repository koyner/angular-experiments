import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CellComponent} from './component/cell.component';

@NgModule({
  declarations: [CellComponent],
  imports: [CommonModule],
  exports: [CellComponent]
})
export class CellModule {}
