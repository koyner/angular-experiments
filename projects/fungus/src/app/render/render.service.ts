import {Injectable} from '@angular/core';
import {Cell} from '../cell/model/cell';

import {ConfigService} from '../config/config.service';
import {GridService} from '../grid/grid.service';
import {Animatable, AnimateService} from '../util/animate.service';

@Injectable({
  providedIn: 'root'
})
export class RenderService implements Animatable {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _size: number;
  constructor(
    private _config: ConfigService,
    private _animate: AnimateService,
    private _grid: GridService
  ) {
    this._animate.add(this);
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
      this._ctx.globalAlpha = 1;
      this._ctx.fillStyle = 'rgb(0, 0, 0)';
      this._ctx.fillRect(0, 0, this._size, this._size);
      this._grid.cells.forEach(c => {
        this._ctx.globalAlpha = c.opacity;
        this._ctx.strokeStyle = c.colour;
        this._ctx.fillStyle = c.colour;
        this._ctx.beginPath();
        this._ctx.arc(
          this.xFor(c) + this.wFor(c) / 2,
          this.yFor(c) + this.wFor(c) / 2,
          this.wFor(c) / 2,
          0,
          Math.PI * 2,
          true
        );
        this._ctx.closePath();
        this._ctx.fill();
        // this._ctx.fillRect(
        //   this.xFor(c) + this.wFor(c) / 2,
        //   this.yFor(c) + this.wFor(c) / 2,
        //   this.wFor(c) + 1,
        //   this.wFor(c) + 1
        // );
      });
    }
  }

  private setCanvasSize(): void {
    if (this._canvas) {
      this._canvas.width = this._size;
      this._canvas.height = this._size;
    }
  }

  private get cellWidth(): number {
    return this._size / this._config.cols;
  }

  private get cellHeight(): number {
    return this._size / this._config.rows;
  }
}
