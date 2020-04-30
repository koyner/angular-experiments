import {Component, Input, OnInit} from '@angular/core';
import {Fungus} from '../../model/fungus';

@Component({
  selector: 'app-fungus',
  templateUrl: './fungus.component.html',
  styleUrls: ['./fungus.component.less'],
})
export class FungusComponent implements OnInit {
  @Input() fungus: Fungus;
  constructor() {}

  ngOnInit(): void {}
}
