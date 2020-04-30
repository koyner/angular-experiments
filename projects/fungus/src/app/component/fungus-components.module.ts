import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CellComponent} from './cell/cell.component';
import {FungusComponent} from './fungus/fungus.component';
import {FungusBgComponent} from './fungus-bg/fungus-bg.component';

@NgModule({
  declarations: [CellComponent, FungusComponent, FungusBgComponent],
  imports: [CommonModule],
  exports: [CellComponent, FungusComponent, FungusBgComponent],
})
export class FungusComponentsModule {}
