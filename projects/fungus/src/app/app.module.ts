import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ComponentsModule} from 'mrb-ui';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CellModule} from './cell/cell.module';
import {GridModule} from './grid/grid.module';
import {StatusModule} from './status/status.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    CellModule,
    GridModule,
    StatusModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
