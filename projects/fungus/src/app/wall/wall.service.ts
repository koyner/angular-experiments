import {Injectable, Injector} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Wall, WallAxis} from './model/wall';

@Injectable({
  providedIn: 'root'
})
export class WallService {
  private _walls: Wall[] = [];
  constructor(private _injector: Injector, private _config: ConfigService) {}

  init(): void {
    for (let i = 0; i < this._config.wall.count; i++) {
      const x =
        1 +
        Math.floor(
          Math.random() * (this._config.cols - this._config.wall.lengthMin - 2)
        );
      const y =
        1 +
        Math.floor(
          Math.random() * (this._config.rows - this._config.wall.lengthMin - 2)
        );
      const dir = Math.random() > 0.5 ? WallAxis.x : WallAxis.y;
      const length = Math.max(
        this._config.wall.lengthMin,
        Math.floor(
          Math.random() *
            (dir === WallAxis.x ? this._config.cols - x : this._config.rows - y)
        )
      );
      this._walls.push(new Wall(this._injector, x, y, length, dir));
    }
  }

  get walls(): Wall[] {
    return this._walls;
  }

  get wallCount(): number {
    return this._walls.length;
  }
}
