import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AboutComponent} from './about/about.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {QuizModule} from './quiz/quiz.module';

@NgModule({
  imports: [BrowserModule, QuizModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
