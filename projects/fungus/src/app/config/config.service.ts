import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  animateMs = 20;
  cols = 19;
  rows = 19;
  fungusCount = 5;
  fungusBreedDelayLowMinMs = 2000;
  fungusBreedDelayLowMaxMs = 3000;
  fungusBreedDelayHighMinMs = 3000;
  fungusBreedDelayHighMaxMs = 6000;
  fungusAgingDelayMs = 300;
  fungusMinOpacity = 0.7;
}
