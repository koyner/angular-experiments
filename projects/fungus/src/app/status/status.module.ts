import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {StatusComponent} from './component/status.component';

@NgModule({
  declarations: [StatusComponent],
  imports: [CommonModule, FormsModule],
  exports: [StatusComponent]
})
export class StatusModule {}
