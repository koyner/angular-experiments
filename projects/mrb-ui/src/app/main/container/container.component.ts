import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConstantsService} from './constants.service';

@Component({
  selector: 'app-mrb-ui-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.less'],
})
export class ContainerComponent implements OnInit {
  @Output() resized = new EventEmitter<number>();

  constructor(private constants: ConstantsService) {}

  ngOnInit() {
    this.resize();
  }

  onResize() {
    this.resize();
  }

  resize() {
    this.constants.resize();
    this.resized.emit(this.side);
  }

  get left(): number {
    return (this.constants.winW - this.side) / 2;
  }

  get top(): number {
    return (this.constants.winH - this.side) / 2;
  }

  get side(): number {
    return this.constants.scale;
  }
}
