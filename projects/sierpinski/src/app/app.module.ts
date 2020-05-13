import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AnimateService} from './animate/animate.service';
import {AppComponent} from './app.component';
import {DrawService} from './draw/draw.service';
import {NodeComponent} from './node/node.component';
import {SettingsComponent} from './settings/settings.component';
import {SettingsService} from './settings/settings.service';

import {ComponentsModule} from 'mrb-ui';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    ComponentsModule
  ],
  declarations: [AppComponent, NodeComponent, SettingsComponent],
  bootstrap: [AppComponent],
  providers: [
    SettingsService,
    AnimateService,
    DrawService,
    {provide: 'Window', useValue: window}
  ]
})
export class AppModule {}
