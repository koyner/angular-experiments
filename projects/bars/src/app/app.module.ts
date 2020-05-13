import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MrbLoggingModule} from 'mrb-logging';

import {AppComponent} from './app.component';
import {BarComponent} from './bar/bar.component';

import {TimerService} from './utils/timer.service';

@NgModule({
  declarations: [AppComponent, BarComponent],
  imports: [BrowserModule, FormsModule, MrbLoggingModule],
  providers: [TimerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
