import { TestBed } from '@angular/core/testing';

import { UsrinfoaccountService } from './usrinfoaccount.service';

describe('UsrinfoaccountService', () => {
  let service: UsrinfoaccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsrinfoaccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});