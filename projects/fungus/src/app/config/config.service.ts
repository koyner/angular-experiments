import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  bgColour = 'rgb(30, 30, 30)';
  animateMs = 25;
  cols = 29;
  rows = 29;
  fungusCount = 10;
  fungusBreedDelayLowMinMs = 50;
  fungusBreedDelayLowMaxMs = 1000;
  fungusBreedDelayHighMinMs = 1000;
  fungusBreedDelayHighMaxMs = 5000;
  fungusAgingDelayMs = 300;
  fungusMinOpacity = 0.7;
}
