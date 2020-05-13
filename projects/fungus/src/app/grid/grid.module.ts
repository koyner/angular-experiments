import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CellModule} from '../cell/cell.module';
import {GridComponent} from './component/grid.component';

@NgModule({
  declarations: [GridComponent],
  imports: [CommonModule, CellModule],
  exports: [GridComponent]
})
export class GridModule {}
