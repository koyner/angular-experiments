import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BgDistComponent} from './bg-dist.component';

describe('BgDistComponent', () => {
  let component: BgDistComponent;
  let fixture: ComponentFixture<BgDistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BgDistComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgDistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
