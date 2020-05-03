import {Component, OnInit} from '@angular/core';
import {MatSliderChange} from '@angular/material/slider';

import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

import {AnimateService} from '../animate/animate.service';

import {SettingsService} from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
})
export class SettingsComponent implements OnInit {
  isOpen = false;

  updateArmsHandler: (event: MatSliderChange) => void;

  constructor(
    public settings: SettingsService,
    public animate: AnimateService,
  ) {}

  close(): void {
    this.isOpen = false;
  }

  open(): void {
    this.isOpen = true;
  }

  ngOnInit(): void {
    this.createArms();
    this.armsCountUpdates().subscribe(armsCount => {
      this.settings.armsCount = armsCount;
      this.createArms();
    });
  }

  // Get an observable that reacts to changes to the arms count slider, with a debounce time of 500ms.
  // We need debounce because updating the arms count triggers a lot of new calculations.
  private armsCountUpdates(): Observable<number> {
    return new Observable<number>(observer => {
      this.updateArmsHandler = (event: MatSliderChange) => {
        observer.next(event.source.value);
      };
    }).pipe(
      distinctUntilChanged(),
      debounceTime(this.settings.armsCountDebounce),
    );
  }

  private createArms(): void {
    this.settings.arms = [];
    let i = 0;
    while (i < this.settings.armsCount) {
      this.settings.arms[i] = i++;
    }
  }
}
