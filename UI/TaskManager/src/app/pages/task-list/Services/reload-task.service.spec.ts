import { TestBed } from '@angular/core/testing';

import { ReloadTaskService } from './reload-task.service';

describe('ReloadTaskService', () => {
  let service: ReloadTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReloadTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
