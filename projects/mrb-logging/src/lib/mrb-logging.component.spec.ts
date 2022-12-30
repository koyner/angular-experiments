import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {MrbLoggingComponent} from './mrb-logging.component';

describe('MrbLoggingComponent', () => {
  let component: MrbLoggingComponent;
  let fixture: ComponentFixture<MrbLoggingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MrbLoggingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrbLoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
