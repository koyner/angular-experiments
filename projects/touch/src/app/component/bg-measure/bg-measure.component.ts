import {Component, OnInit} from '@angular/core';

import {Dist} from '../../model/dist';
import {DistService} from '../../service/dist.service';

import {ConstantsService} from 'mrb-ui';

@Component({
  selector: 'app-bg-measure',
  templateUrl: './bg-measure.component.html',
  styleUrls: ['./bg-measure.component.less']
})
export class BgMeasureComponent implements OnInit {
  constructor(
    private distService: DistService,
    private constants: ConstantsService
  ) {}

  ngOnInit(): void {}

  get x(): number {
    return (
      (this.distFurthest.xMid - this.distFurthest.offset) * this.constants.scale
    );
  }

  get y(): number {
    return (
      (this.distFurthest.yMid - this.distFurthest.offset) * this.constants.scale
    );
  }

  get side(): number {
    return this.distFurthest.offset * 2 * this.constants.scale;
  }

  get offset(): number {
    return this.distFurthest.offset * this.constants.scale;
  }

  get distFurthest(): Dist {
    return this.distService.distFurthest;
  }
}
