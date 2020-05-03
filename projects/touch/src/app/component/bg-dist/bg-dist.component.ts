import {Component, Input, OnInit} from '@angular/core';

import {Dist} from '../../model/dist';
import {DistService} from '../../service/dist.service';

import {ConstantsService} from 'mrb-ui';

@Component({
  selector: 'app-bg-dist',
  templateUrl: './bg-dist.component.html',
  styleUrls: ['./bg-dist.component.less'],
})
export class BgDistComponent implements OnInit {
  @Input() dist: Dist;

  constructor(
    private distService: DistService,
    private constants: ConstantsService,
  ) {}

  ngOnInit(): void {}

  isFurthest(): boolean {
    return this.dist === this.distService.distFurthest;
  }

  get x(): number {
    return this.dist.x * this.constants.scale;
  }

  get y(): number {
    return this.dist.y * this.constants.scale;
  }

  get width(): number {
    return this.dist.w * this.constants.scale;
  }

  get height(): number {
    return this.dist.h * this.constants.scale;
  }

  get brightness(): number {
    return Math.floor(2 * this.dist.offset * 255);
  }

  get col(): string {
    return `rgb(${this.brightness},${this.brightness},${this.brightness})`;
  }
}
