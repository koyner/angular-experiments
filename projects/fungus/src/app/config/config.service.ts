import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  bgColour = 'rgb(30, 30, 30)';
  animateMs = 20;
  cols = 29;
  rows = 29;
  fungusCount = 0;
  fungusBreedDelayLowMinMs = 50;
  fungusBreedDelayLowMaxMs = 200;
  fungusBreedDelayHighMinMs = 1000;
  fungusBreedDelayHighMaxMs = 4000;
  fungusAgingDelayMs = 300;
  fungusMinOpacity = 0.7;
}
