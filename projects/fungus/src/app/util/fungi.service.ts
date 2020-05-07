import {Injectable, Injector} from '@angular/core';
import {Fungus} from '../model/fungus';

@Injectable({
  providedIn: 'root',
})
export class FungiService {
  private readonly _fungusCount = 10;
  constructor(private injector: Injector) {}

  init(): void {
    let i = 0;
    while (i++ < this._fungusCount) {
      const c = new Fungus(this.injector);
      c.init();
    }
  }
}
