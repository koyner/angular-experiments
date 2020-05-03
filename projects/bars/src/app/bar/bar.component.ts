import {Component, OnInit} from '@angular/core';
import {IReceivesFrames, TimerService} from '../utils/timer.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit, IReceivesFrames {
  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    console.log('bar initialised');
    console.log(this.timerService);
    this.timerService.registerFrameReceiver(this);
  }

  receiveFrame(): void {
    console.log('frame updated');
  }
}
