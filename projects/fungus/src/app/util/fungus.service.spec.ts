import {TestBed} from '@angular/core/testing';

import {FungusService} from './fungus.service';

describe('FungusService', () => {
  let service: FungusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FungusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
