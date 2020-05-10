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
    return `hsl(${UtilService.randomHue}, 80%, 50%, 1)`;
  }

  private static get randomHue(): number {
    return Math.floor(Math.random() * 360);
  }
}
