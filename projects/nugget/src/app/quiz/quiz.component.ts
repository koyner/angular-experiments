import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {IQuiz, QuizService} from './quiz.service';

@Component({
  template: ` <div>quiz: {{ quiz?.name }}</div> `
})
export class QuizComponent implements OnInit {
  quiz: IQuiz;
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}
  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => this.quizService.getQuiz(+params['id']))
      )
      .subscribe((quiz: IQuiz) => (this.quiz = quiz));
  }
}
