import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {AnimateService} from '../animate/animate.service';
import {DrawService, IRenderable} from '../draw/draw.service';
import {SettingsService} from '../settings/settings.service';

enum Axis {
  x,
  y
}

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.less']
})
export class NodeComponent implements OnInit, OnDestroy, IRenderable {
  private static get colRand(): number {
    return Math.floor(50 + Math.random() * 200);
  }

  get x(): number {
    return this.getCoord(Axis.x);
  }

  get y(): number {
    return this.getCoord(Axis.y);
  }

  get size(): number {
    return (
      (this.settings.size *
        Math.min(this.settings.width, this.settings.height)) /
      (100 * Math.pow(2, this.level))
    );
  }

  get bgCol(): string {
    return this.settings.solid ? this.col : 'transparent';
  }

  get border(): string | SafeStyle {
    return this.settings.solid
      ? 'none'
      : this.domSanitizer.bypassSecurityTrustStyle(`1px solid ${this.col}`);
  }

  get borderRadius(): number {
    return this.settings.circles ? this.size / 2 : 0;
  }

  get opacity(): number {
    return this.settings.opaque && this.settings.solid ? this._opacity : 1.0;
  }

  get col(): string {
    return this.settings.colourful ? this._col : 'white';
  }

  @Input() level: number;
  @Input() pos: number;
  @Input() xParent: number;
  @Input() yParent: number;

  private _col: string;
  private _opacity: number;

  constructor(
    public settings: SettingsService,
    public draw: DrawService,
    private animate: AnimateService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this._col = `rgb(${NodeComponent.colRand}, ${NodeComponent.colRand}, ${NodeComponent.colRand})`;
    this._opacity = 0.7;
    this.draw.renderables.push(this);
  }

  ngOnDestroy(): void {
    const index = this.draw.renderables.indexOf(this);
    this.draw.renderables.splice(index, 1);
  }

  render(): void {
    if (this.level >= this.settings.hideLevels) {
      const ctx = this.draw.ctx;
      ctx.globalAlpha = this.opacity;
      // connecting lines
      // node
      if (this.settings.circles) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        if (this.settings.solid) {
          ctx.fillStyle = this.col;
          ctx.fill();
        } else {
          ctx.strokeStyle = this.col;
          ctx.stroke();
        }
      } else {
        if (this.settings.solid) {
          ctx.fillStyle = this.col;
          ctx.fillRect(
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            this.size
          );
        } else {
          ctx.strokeStyle = this.col;
          ctx.strokeRect(
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            this.size
          );
        }
      }
      if (this.level > this.settings.hideLevels && this.settings.lines) {
        ctx.strokeStyle = this.col;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.xParent, this.yParent);
        ctx.closePath();
        ctx.stroke();
      }
    }
  }

  private getCoord(axis: Axis): number {
    const isX = axis === Axis.x;
    if (this.level === 0) {
      return (isX ? this.settings.width : this.settings.height) / 2;
    } else {
      const parentOffset =
        Math.min(this.settings.height, this.settings.width) /
        2 /
        Math.pow(2, this.level);
      const coordLinear =
        Math.pow(this.settings.accel, this.level) *
        (this.animate.frame *
          (1 / (this.settings.speedMax + 1 - this.settings.speed))) *
        (!this.settings.alternate || this.level % 2 === 0 ? 1 : -1);
      const trig = isX ? Math.sin : Math.cos;
      const coordRotation = trig(
        ((this.pos * 2) / this.settings.armsCount) * Math.PI + coordLinear
      );
      const coordOffset = parentOffset * coordRotation;
      return coordOffset + (isX ? this.xParent : this.yParent);
    }
  }
}
