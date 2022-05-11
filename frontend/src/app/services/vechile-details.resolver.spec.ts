import { TestBed } from '@angular/core/testing';

import { VechileDetailsResolver } from './vechile-details.resolver';

describe('VechileDetailsResolver', () => {
  let resolver: VechileDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VechileDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
