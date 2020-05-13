import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {QuizComponent} from './quiz.component';
import {QuizzesComponent} from './quizzes.component';

const appRoutes: Routes = [
  {
    path: 'quizzes',
    component: QuizzesComponent
  },
  {
    path: 'quiz/:id',
    component: QuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {}
