import {NgModule} from '@angular/core';
import {ConstantsService, WINDOW} from '../services/constants.service';
import {ContainerComponent} from './container/container.component';

export function _window() {
  return window;
}

@NgModule({
  declarations: [ContainerComponent],
  imports: [],
  exports: [ContainerComponent],
  providers: [{provide: WINDOW, useFactory: _window}, ConstantsService]
})
export class ComponentsModule {}
