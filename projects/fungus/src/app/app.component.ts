import {Component} from '@angular/core';
import {RenderService} from './render/render.service';
import {BgService} from './util/bg.service';
import {FungusService} from './util/fungus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(
    private renderer: RenderService,
    private fungusService: FungusService,
    private bgService: BgService
  ) {
    this.bgService.init();
    this.fungusService.init();
  }

  resized(size: number): void {
    this.renderer.size = size;
  }
}
