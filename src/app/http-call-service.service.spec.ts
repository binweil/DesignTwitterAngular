import { TestBed } from '@angular/core/testing';

import { HttpCallServiceService } from './http-call-service.service';

describe('HttpCallServiceService', () => {
  let service: HttpCallServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCallServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
