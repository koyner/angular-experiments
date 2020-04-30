import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ComponentsModule} from 'mrb-ui';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FungusComponentModule} from './component/fungus-component.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    FungusComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
