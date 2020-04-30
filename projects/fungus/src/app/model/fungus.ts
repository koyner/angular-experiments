import {CellFungus} from './cell-fungus';

export class Fungus {
  private _cells: CellFungus[] = [];

  constructor() {
    this.cells.push({
      col: 5,
      row: 6,
      colour: '#55CC55',
      isNode: true,
    });
  }

  get cells() {
    return this._cells;
  }
}
