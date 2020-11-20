import { TestBed } from '@angular/core/testing';

import { EachItemResolverService } from './each-item-resolver.service';

describe('EachItemResolverService', () => {
  let service: EachItemResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EachItemResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
