import { TestBed } from '@angular/core/testing';

import { AllItemsResolverService } from './all-items-resolver.service';

describe('AllItemsResolverService', () => {
  let service: AllItemsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllItemsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
