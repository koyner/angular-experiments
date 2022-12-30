import {Injector} from '@angular/core';
import {RenderService} from '../../render/render.service';

export enum CellType {
  wall,
  fungus,
  bg
}

export abstract class Cell {
  protected _render: RenderService;

  protected constructor(
    protected _injector: Injector,
    public colour: string,
    public col: number,
    public row: number
  ) {
    this._render = _injector.get(RenderService);
  }

  toString(): string {
    return `${this.col}, ${this.row}, ${this.colour}`;
  }

  forceRender(): void {
    this._render.add(this);
  }

  wasRendered(): void {
    this._render.remove(this);
  }

  abstract get type(): CellType;
  abstract get opacity(): number;
}
