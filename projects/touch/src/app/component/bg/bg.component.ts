import {Component, OnInit} from '@angular/core';

import {Dist} from '../../model/dist';
import {DistService} from '../../service/dist.service';

import {ConstantsService} from 'mrb-ui';

@Component({
  selector: 'app-bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.less'],
})
export class BgComponent implements OnInit {
  constructor(
    private distService: DistService,
    private constants: ConstantsService,
  ) {}

  ngOnInit(): void {}

  get dists(): Dist[][] {
    return this.distService.dists;
  }

  getOffset(dist: Dist): number {
    return dist.offset * this.constants.scale;
  }
}
