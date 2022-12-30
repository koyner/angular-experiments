import {Injectable} from '@angular/core';
import {Cell, CellType} from '../cell/model/cell';
import {GridService} from '../grid/grid.service';
import {RenderService} from '../render/render.service';

import bg = CellType.bg;
import fungus = CellType.fungus;
import wall = CellType.wall;

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

  constructor(private _grid: GridService, private _render: RenderService) {}

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
      const cOld = this._grid.add(cNew);
      this._render.remove(cOld);
      this._render.add(cNew);
      return cOld;
    } else {
      throw new Error(
        `Could not add cell of type ${CellType[cNew.type]} (${cNew})`
      );
    }
  }
}
