import { TestBed } from '@angular/core/testing';

import { GetDaterangeService } from './get-daterange.service';

describe('GetDaterangeService', () => {
  let service: GetDaterangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDaterangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
