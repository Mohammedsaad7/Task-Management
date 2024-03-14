import { TestBed } from '@angular/core/testing';

import { InsertTaskService } from './insert-task.service';

describe('InsertTaskService', () => {
  let service: InsertTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
