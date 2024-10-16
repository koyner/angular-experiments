import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BgModule} from './bg/bg.module';
import {CellModule} from './cell/cell.module';
import {ConfigModule} from './config/config.module';
import {FungusModule} from './fungus/fungus.module';
import {GridModule} from './grid/grid.module';
import {StatusModule} from './status/status.module';
import {ComponentsModule} from 'projects/mrb-ui/src/projects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    BgModule,
    CellModule,
    ConfigModule,
    FungusModule,
    GridModule,
    StatusModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
