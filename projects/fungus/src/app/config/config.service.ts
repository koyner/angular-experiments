import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  animateMs = 50;
  cols = 29;
  rows = 29;
  fungusCount = 3;
  fungusBreedDelayMaxMs = 800;
  fungusBreedDelayMinMs = 30;
  fungusAgeDelayMs = 300;
  fungusMinOpacity = 0.7;
}
