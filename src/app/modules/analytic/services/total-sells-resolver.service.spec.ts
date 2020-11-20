import { TestBed } from '@angular/core/testing';

import { TotalSellsResolverService } from './total-sells-resolver.service';

describe('TotalSellsResolverService', () => {
  let service: TotalSellsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalSellsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
