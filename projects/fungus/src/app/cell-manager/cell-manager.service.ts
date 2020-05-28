import {Injectable} from '@angular/core';
import {Cell, CellType} from '../cell/model/cell';
import {GridService} from '../grid/grid.service';

import wall = CellType.wall;
import bg = CellType.bg;
import fungus = CellType.fungus;

@Injectable({
  providedIn: 'root'
})
export class CellManager {
  private static isWallOrFungus(type: CellType): boolean {
    return [wall, fungus].includes(type);
  }

  private static isWallFungusOrBg(type: CellType): boolean {
    return [wall, fungus, bg].includes(type);
  }

  constructor(private _grid: GridService) {}

  add(cNew: Cell): Cell {
    let canAdd: boolean;
    switch (this._grid.cellAt(cNew.col, cNew.row)?.type) {
      case undefined:
        canAdd = true;
        break;
      case bg:
        canAdd = CellManager.isWallOrFungus(cNew.type);
        break;
      case fungus:
        canAdd = CellManager.isWallFungusOrBg(cNew.type);
        break;
      case wall:
        canAdd = false;
        break;
      default:
        canAdd = false;
        break;
    }
    if (canAdd) {
      return this._grid.add(cNew);
    } else {
      throw new Error(
        `Could not add cell of type ${(cNew.constructor as any).name} (${cNew})`
      );
    }
  }
}
