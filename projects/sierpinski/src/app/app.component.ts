import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {AnimateService} from './animate/animate.service';

import {DrawService} from './draw/draw.service';
import {SettingsService} from './settings/settings.service';

@Component({
  styleUrls: ['app.component.less'],
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('appCanvas') canvasRef: ElementRef;

  constructor(
    private animate: AnimateService,
    public settings: SettingsService,
    public draw: DrawService
  ) {}

  ngOnInit(): void {
    this.animate.start();
  }

  ngAfterViewInit(): void {
    this.draw.ctx = this.canvasRef.nativeElement.getContext('2d');
  }

  resize(side: number): void {
    this.settings.width = side;
    this.settings.height = side;
  }
}
