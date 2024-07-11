import { TestBed } from '@angular/core/testing';

import { LoadinServiceService } from './loadin.service.service';

describe('LoadinServiceService', () => {
  let service: LoadinServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadinServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
