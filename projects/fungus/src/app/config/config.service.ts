import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  cols = 19;
  rows = 19;
  fungusCount = 10;
  fungusBreedDelayMaxMs = 300;
  fungusBreedDelayMinMs = 25;
  animateMs = 50;
}
