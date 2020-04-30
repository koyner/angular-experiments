import {Component, Input, OnInit} from '@angular/core';
import {CellBg} from '../../model/cell-bg';

@Component({
  selector: 'app-fungus-bg',
  templateUrl: './fungus-bg.component.html',
  styleUrls: ['./fungus-bg.component.less'],
})
export class FungusBgComponent implements OnInit {
  @Input() cellBgGrid: CellBg[][] = [];
  constructor() {}

  ngOnInit(): void {}
}
