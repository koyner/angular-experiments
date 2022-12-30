import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {BubblesComponent} from './bubbles.component';

describe('BubblesComponent', () => {
  let component: BubblesComponent;
  let fixture: ComponentFixture<BubblesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BubblesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
