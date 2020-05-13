import {Component, OnInit} from '@angular/core';
import {Fungus} from '../../model/fungus';
import {AnimateService} from '../../util/animate.service';
import {FungiService} from '../../util/fungi.service';
import {GridService} from '../../util/grid.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less'],
})
export class StatusComponent implements OnInit {
  constructor(
    private animate: AnimateService,
    private fungus: FungiService,
    private grid: GridService,
  ) {}

  ngOnInit(): void {}

  get animatableCount(): number {
    return this.animate.count;
  }

  get fungusCount(): number {
    return this.fungus.count;
  }

  get fungi(): Fungus[] {
    return this.fungus.fungi;
  }

  get cellCount(): number {
    return this.grid.count;
  }
}
