import {Injectable, Injector} from '@angular/core';
import {Wall} from './model/wall';

@Injectable({
  providedIn: 'root'
})
export class WallService {
  private _walls: Wall[] = [];
  constructor(private _injector: Injector) {}

  init(): void {
    this._walls.push(new Wall(this._injector, 30));
    this._walls.push(new Wall(this._injector, 33));
  }

  get walls(): Wall[] {
    return this._walls;
  }

  get wallCount(): number {
    return this._walls.length;
  }
}
