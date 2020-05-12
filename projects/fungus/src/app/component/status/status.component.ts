import {Component, OnInit} from '@angular/core';
import {AnimateService} from '../../util/animate.service';
import {FungiService} from '../../util/fungi.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less'],
})
export class StatusComponent implements OnInit {
  constructor(private animate: AnimateService, private fungi: FungiService) {}

  ngOnInit(): void {}

  get animatableCount(): number {
    return this.animate.count;
  }

  get fungusCount(): number {
    return this.fungi.count;
  }
}
