import {Component, OnInit} from '@angular/core';
import {MatLegacySliderChange as MatSliderChange} from '@angular/material/legacy-slider';

import {BubbleService} from '../../service/bubble.service';
import {GameService} from '../../service/game.service';

import {ConstantsService} from 'mrb-ui';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent {
  constructor(
    private gameService: GameService,
    private bubbleService: BubbleService,
    private constants: ConstantsService
  ) {}

  get bubbleCount(): number {
    return this.bubbleService.bubbles.length;
  }

  setRate(e: MatSliderChange): void {
    this.gameService.updateRate(5000 - e.value);
  }

  get speed(): number {
    return this.constants.speed * 1000;
  }

  setSpeed(e: MatSliderChange): void {
    this.constants.speed = e.value / 1000;
    this.bubbleService.registerSpeed();
  }
}
