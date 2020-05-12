import {Injectable, Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Fungus} from '../model/fungus';

@Injectable({
  providedIn: 'root',
})
export class FungiService {
  private readonly fungi: Fungus[] = [];

  constructor(private injector: Injector, private config: ConfigService) {}

  init(): void {
    let i = 0;
    while (i++ < this.config.fungusCount) {
      this.fungi.push(new Fungus(this.injector));
    }
  }
}
