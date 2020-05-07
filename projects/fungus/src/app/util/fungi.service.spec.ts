import {TestBed} from '@angular/core/testing';

import {FungiService} from './fungi.service';

describe('FungiService', () => {
  let service: FungiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FungiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
