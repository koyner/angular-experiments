import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {QuizRoutingModule} from './quiz-routing.module';

import {QuizComponent} from './quiz.component';
import {QuizService} from './quiz.service';
import {QuizzesComponent} from './quizzes.component';

@NgModule({
  imports: [QuizRoutingModule, CommonModule],
  declarations: [QuizComponent, QuizzesComponent],
  providers: [QuizService]
})
export class QuizModule {}
