import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FungusBgComponent} from './fungus-bg.component';

describe('BgComponent', () => {
  let component: FungusBgComponent;
  let fixture: ComponentFixture<FungusBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FungusBgComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FungusBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
