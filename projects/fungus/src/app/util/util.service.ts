import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  getRandomElementOf<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  get randomCol(): number {
    return 50 + Math.random() * 205;
  }
}
