import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  bgColour = 'rgb(30, 30, 30)';
  animateMs = 20;
  cols = 29;
  rows = 29;
  fungusCount = 10;
  fungusBreedDelayLowMinMs = 25;
  fungusBreedDelayLowMaxMs = 100;
  fungusBreedDelayHighMinMs = 1000;
  fungusBreedDelayHighMaxMs = 1500;
  fungusAgingDelayMs = 300;
  fungusMinOpacity = 0.7;
}
