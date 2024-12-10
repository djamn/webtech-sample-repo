import { TestBed } from '@angular/core/testing';

import { BikesService } from './bikes.service';

describe('BikesService', () => {
  let service: BikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
