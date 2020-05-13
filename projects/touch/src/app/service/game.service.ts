import {Inject, Injectable} from '@angular/core';

import {BubbleService} from './bubble.service';
import {DistService} from './dist.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private rate = 500;

  constructor(
    @Inject('Window') private window: Window,
    private bubbleService: BubbleService,
    private distService: DistService
  ) {}

  start(): void {
    this.bubbleService.create();
    this.distService.updateDistMatrix(this.bubbleService.bubbles);
    this.window.setInterval(this.update, 10);
  }

  update = (): void => {
    if (Date.now() - this.bubbleService.tLastCreated > this.rate) {
      this.bubbleService.create();
    }
    this.bubbleService.update();
    this.distService.updateDistMatrix(this.bubbleService.bubbles);
  };

  updateRate(v: number): void {
    this.rate = v;
  }
}
