import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';
import {MatLegacySliderModule as MatSliderModule} from '@angular/material/legacy-slider';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AnimateService} from './animate/animate.service';
import {AppComponent} from './app.component';
import {DrawService} from './draw/draw.service';
import {NodeComponent} from './node/node.component';
import {SettingsComponent} from './settings/settings.component';
import {SettingsService} from './settings/settings.service';

import {ComponentsModule} from 'projects/mrb-ui/src/projects';

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
