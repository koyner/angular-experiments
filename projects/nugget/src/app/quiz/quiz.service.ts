import {Injectable} from '@angular/core';

export interface IQuiz {
  id: number;
  name: string;
}

const quizzes: IQuiz[] = [
  {id: 1, name: 'the first quiz'},
  {id: 2, name: 'the 2nd quiz'},
  {id: 3, name: 'the 3rd one'},
];

const quizzesPromise = Promise.resolve(quizzes);

@Injectable()
export class QuizService {
  getQuizzes(): IQuiz[] {
    return quizzes;
  }
  getQuiz(id: number | string): Promise<IQuiz> {
    return quizzesPromise.then(q => q.find(quiz => quiz.id === +id));
  }
}
