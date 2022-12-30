import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {BgComponent} from './bg.component';

describe('BgComponent', () => {
  let component: BgComponent;
  let fixture: ComponentFixture<BgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BgComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
