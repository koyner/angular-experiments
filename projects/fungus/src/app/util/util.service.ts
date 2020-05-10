import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  getRandomElementOf<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  get randomColStr(): string {
    return `rgb(${UtilService.randomCol}, ${UtilService.randomCol}, ${UtilService.randomCol})`;
  }

  private static get randomCol(): number {
    return Math.floor(100 + Math.random() * 155);
  }
}
