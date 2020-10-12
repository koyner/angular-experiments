import {Injectable} from '@angular/core';
import {Cell, CellType} from '../cell/model/cell';

import {ConfigService, FungusShape} from '../config/config.service';
import {GridService} from '../grid/grid.service';
import {Animatable, AnimateService} from '../util/animate.service';

@Injectable({
  providedIn: 'root'
})
export class RenderService implements Animatable {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _size: number;
  private readonly _pixelRatio: number;
  constructor(
    private _config: ConfigService,
    private _animate: AnimateService,
    private _grid: GridService
  ) {
    this._animate.add(this);
    this._pixelRatio = window.devicePixelRatio || 1;
  }

  setCanvas(canvas: HTMLCanvasElement): void {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
    this.setCanvasSize();
  }

  set size(size: number) {
    this._size = size;
    this.setCanvasSize();
  }

  get size(): number {
    return this._size;
  }

  xFor(cell: Cell): number {
    return Math.round(cell.col * this.cellWidth);
  }

  yFor(cell: Cell): number {
    return Math.round(cell.row * this.cellHeight);
  }

  get cellW(): number {
    return Math.round(this.cellWidth);
  }

  get cellH(): number {
    return Math.round(this.cellHeight);
  }

  animate(_tsDiff: number): void {
    if (!this._config.domEnabled) {
      const w = this.cellWScaled;
      const h = this.cellHScaled;
      this._grid.cells
        .filter(c => c.needsRerender())
        .forEach(cell => {
          const x = this.getCellXScaled(cell);
          const y = this.getCellYScaled(cell);
          this._ctx.clearRect(x, y, w, h);
          this._ctx.globalAlpha = cell.opacity;
          this._ctx.fillStyle = cell.colour;
          if (
            this._config.fungus.shape === FungusShape.circle &&
            cell.type !== CellType.wall
          ) {
            this._ctx.beginPath();
            const r = w / 3;
            this._ctx.moveTo(x + r, y);
            this._ctx.arcTo(x + w, y, x + w, y + h, r);
            this._ctx.arcTo(x + w, y + h, x, y + h, r);
            this._ctx.arcTo(x, y + h, x, y, r);
            this._ctx.arcTo(x, y, x + w, y, r);
            this._ctx.closePath();
            this._ctx.fill();
          } else {
            this._ctx.fillRect(x, y, w, h);
          }
        });
    }
  }

  private setCanvasSize(): void {
    if (this._canvas) {
      this._canvas.width = this.sizeScaled;
      this._canvas.height = this.sizeScaled;
    }
  }

  private get sizeScaled(): number {
    return this.scale(this._size);
  }

  private get cellWScaled(): number {
    return this.scale(this.cellW);
  }

  private get cellHScaled(): number {
    return this.scale(this.cellH);
  }

  private getCellXScaled(cell: Cell): number {
    return this.scale(this.xFor(cell));
  }

  private getCellYScaled(cell: Cell): number {
    return this.scale(this.yFor(cell));
  }

  private scale(n: number): number {
    return n * this._pixelRatio;
  }

  private get cellWidth(): number {
    return this._size / this._config.cols;
  }

  private get cellHeight(): number {
    return this._size / this._config.rows;
  }
}
