import {TestBed} from '@angular/core/testing';

import {CellManager} from './cell-manager.service';

describe('CellManager', () => {
  let service: CellManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CellManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
