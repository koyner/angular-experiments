import {Injector} from '@angular/core';

export enum CellType {
  wall,
  fungus,
  bg
}

export abstract class Cell {
  private _needsRender = true;

  protected constructor(
    _injector: Injector,
    public colour: string,
    public col: number,
    public row: number
  ) {}

  toString(): string {
    return `${this.col}, ${this.row}, ${this.colour}`;
  }

  needsRerender(): boolean {
    const n = this._needsRender;
    this._needsRender = false;
    return n;
  }

  abstract get type(): CellType;
  abstract get opacity(): number;
}
