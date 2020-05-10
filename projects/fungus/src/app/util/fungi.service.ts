import {Injectable, Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Fungus} from '../model/fungus';

@Injectable({
  providedIn: 'root',
})
export class FungiService {
  constructor(private injector: Injector, private config: ConfigService) {}

  init(): void {
    let i = 0;
    while (i++ < this.config.fungusCount) {
      const fungus = new Fungus(this.injector);
      fungus.init();
    }
  }
}