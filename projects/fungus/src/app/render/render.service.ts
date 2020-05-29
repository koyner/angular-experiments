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
  private readonly pixelRatio: number;
  constructor(
    private _config: ConfigService,
    private _animate: AnimateService,
    private _grid: GridService
  ) {
    this._animate.add(this);
    this.pixelRatio = window.devicePixelRatio || 1;
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
    return Math.floor(cell.col * this.cellWidth);
  }

  yFor(cell: Cell): number {
    return Math.floor(cell.row * this.cellHeight);
  }

  wFor(cell: Cell): number {
    return Math.floor(this.cellWidth);
  }

  hFor(cell: Cell): number {
    return Math.floor(this.cellHeight);
  }

  animate(_tsDiff: number): void {
    if (!this._config.domEnabled) {
      this._ctx.clearRect(0, 0, this.scale(this.size), this.scale(this.size));
      this._grid.cells.forEach(c => {
        this._ctx.globalAlpha = c.opacity;
        this._ctx.fillStyle = c.colour;
        if (
          this._config.fungusShape === FungusShape.circle &&
          c.type !== CellType.wall
        ) {
          this._ctx.beginPath();
          this._ctx.arc(
            this.scale(this.xFor(c) + this.wFor(c) / 2),
            this.scale(this.yFor(c) + this.wFor(c) / 2),
            this.scale(this.wFor(c) / 2),
            0,
            Math.PI * 2,
            true
          );
          this._ctx.closePath();
          this._ctx.fill();
        } else {
          this._ctx.fillRect(
            this.scale(this.xFor(c) - 1),
            this.scale(this.yFor(c) - 1),
            this.scale(this.wFor(c) + 1),
            this.scale(this.wFor(c) + 1)
          );
        }
      });
    }
  }

  private scale(n: number): number {
    return n * this.pixelRatio;
  }

  private setCanvasSize(): void {
    if (this._canvas) {
      this._canvas.width = this.scale(this._size);
      this._canvas.height = this.scale(this._size);
    }
  }

  private get cellWidth(): number {
    return this._size / this._config.cols;
  }

  private get cellHeight(): number {
    return this._size / this._config.rows;
  }
}
