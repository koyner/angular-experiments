import {Component} from '@angular/core';
import {RenderService} from './render/render.service';
import {BgService} from './util/bg.service';
import {FungiService} from './util/fungi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  constructor(
    private renderer: RenderService,
    private fungus: FungiService,
    private bg: BgService,
  ) {
    this.bg.init();
    this.fungus.init();
  }

  resized(size: number): void {
    this.renderer.size = size;
  }
}
