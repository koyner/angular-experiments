import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatLegacySliderModule as MatSliderModule} from '@angular/material/legacy-slider';

import {AppComponent} from './app.component';
import {BgDistComponent} from './component/bg-dist/bg-dist.component';
import {BgMeasureComponent} from './component/bg-measure/bg-measure.component';
import {BgComponent} from './component/bg/bg.component';
import {BubbleComponent} from './component/bubble/bubble.component';
import {BubblesComponent} from './component/bubbles/bubbles.component';
import {StatusComponent} from './component/status/status.component';

import {ComponentsModule} from 'mrb-ui';

@NgModule({
  declarations: [
    AppComponent,
    BubbleComponent,
    BgDistComponent,
    BgMeasureComponent,
    BgComponent,
    BubblesComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ComponentsModule
  ],
  providers: [{provide: 'Window', useValue: window}],
  bootstrap: [AppComponent]
})
export class AppModule {}
