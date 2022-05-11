import { TestBed } from '@angular/core/testing';

import { VechileService } from './vechile.service';

describe('VechileService', () => {
  let service: VechileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VechileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
