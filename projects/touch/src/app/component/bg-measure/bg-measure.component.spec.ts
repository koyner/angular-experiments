import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {BgMeasureComponent} from './bg-measure.component';

describe('BgMeasureComponent', () => {
  let component: BgMeasureComponent;
  let fixture: ComponentFixture<BgMeasureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BgMeasureComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
