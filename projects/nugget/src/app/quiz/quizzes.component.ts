import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IQuiz, QuizService} from './quiz.service';

@Component({
  template: `
    <h1>Quizzes</h1>
    <p>A collection of quizzes created by the community.</p>
    <ul>
      <li *ngFor="let quiz of quizzes" (click)="onSelect(quiz)">
        {{ quiz.name }}
      </li>
    </ul>
  `,
})
export class QuizzesComponent implements OnInit {
  quizzes: IQuiz[];
  constructor(private router: Router, private quizService: QuizService) {}
  ngOnInit(): void {
    this.quizzes = this.quizService.getQuizzes();
  }
  onSelect = (quiz: any) => {
    this.router.navigate(['/quiz', quiz.id]);
  };
}
