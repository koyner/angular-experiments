import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() {}

  randomElOf<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  get randomColourStr(): string {
    return `hsl(${UtilService.randomHue}, 90%, 50%, 1)`;
  }

  get now(): number {
    return Date.now();
  }

  private static get randomHue(): number {
    return Math.floor(Math.random() * 360);
  }
}
