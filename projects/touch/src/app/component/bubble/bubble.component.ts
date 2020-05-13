import {Component, Input} from '@angular/core';

import {ConstantsService} from 'mrb-ui';
import {Bubble} from '../../model/bubble';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.less']
})
export class BubbleComponent {
  @Input() bubble: Bubble;

  constructor(private constants: ConstantsService) {}

  get x(): number {
    return this.bubble.x * this.constants.scale;
  }

  get y(): number {
    return this.bubble.y * this.constants.scale;
  }

  get side(): number {
    return this.bubble.side * this.constants.scale;
  }

  get bgCol(): string {
    return `hsl(${this.hue}, 60%, 50%)`;
  }

  get borderCol(): string {
    return `hsl(${this.hue}, 100%, 50%)`;
  }

  get borderSize(): number {
    return this.side / 20;
  }

  clicked(): void {
    this.bubble.reverse();
  }

  private get hue(): number {
    return this.bubble.side * 360;
  }
}
