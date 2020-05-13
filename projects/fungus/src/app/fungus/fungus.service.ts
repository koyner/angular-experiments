import {Injectable, Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Fungus} from './model/fungus';

@Injectable({
  providedIn: 'root'
})
export class FungusService {
  private readonly _fungi: Fungus[] = [];

  constructor(private _injector: Injector, private _config: ConfigService) {}

  init(): void {
    let i = 0;
    while (i++ < this._config.fungusCount) {
      this.createFungus();
    }
  }

  get fungi(): Fungus[] {
    return this._fungi.filter(f => !f.isDead);
  }

  get count(): number {
    return this.fungi.length;
  }

  private createFungus(): void {
    this._fungi.push(new Fungus(this._injector));
  }
}
