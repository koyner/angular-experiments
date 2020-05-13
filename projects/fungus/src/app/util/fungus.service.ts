import {Injectable, Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Fungus} from '../model/fungus';

@Injectable({
  providedIn: 'root',
})
export class FungusService {
  private readonly _fungi: Fungus[] = [];

  constructor(private injector: Injector, private config: ConfigService) {}

  init(): void {
    let i = 0;
    while (i++ < this.config.fungusCount) {
      this._fungi.push(new Fungus(this.injector));
    }
  }

  get fungi(): Fungus[] {
    return this._fungi;
  }

  get count(): number {
    return this._fungi.length;
  }
}
