import {Injectable, Injector} from '@angular/core';
import {Wall, WallAxis} from './model/wall';

@Injectable({
  providedIn: 'root'
})
export class WallService {
  private _walls: Wall[] = [];
  constructor(private _injector: Injector) {}

  init(): void {
    this._walls.push(new Wall(this._injector, 13, 23, 20, WallAxis.x));
    this._walls.push(new Wall(this._injector, 22, 26, 15, WallAxis.x));
    this._walls.push(new Wall(this._injector, 13, 26, 13, WallAxis.y));
    this._walls.push(new Wall(this._injector, 16, 24, 13, WallAxis.y));
    this._walls.push(new Wall(this._injector, 19, 26, 11, WallAxis.y));
  }

  get walls(): Wall[] {
    return this._walls;
  }

  get wallCount(): number {
    return this._walls.length;
  }
}
