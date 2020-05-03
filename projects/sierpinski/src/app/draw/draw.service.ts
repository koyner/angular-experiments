import {Injectable} from '@angular/core';

import {SettingsService} from '../settings/settings.service';

export interface IRenderable {
  render: () => void;
}

@Injectable()
export class DrawService {
  ctx: CanvasRenderingContext2D;
  renderables: IRenderable[] = [];
  private _isCanvasRendered = false;

  constructor(private settings: SettingsService) {}

  isCanvasReady(): boolean {
    return this.settings.canvasMode && this._isCanvasRendered;
  }

  update(): void {
    if (this.ctx && this.settings.canvasMode) {
      this.fillBlack(this.settings.trail ? this.settings.trailOpacity : 1);
      this.renderables.forEach(r => r.render());
      this._isCanvasRendered = true;
    } else if (this._isCanvasRendered) {
      this.fillBlack();
      this._isCanvasRendered = false;
    }
  }

  private fillBlack(opacity: number = 1): void {
    this.ctx.globalAlpha = opacity;
    this.ctx.fillStyle = 'rgb(0, 0, 0)';
    this.ctx.fillRect(0, 0, this.settings.width, this.settings.height);
  }
}
