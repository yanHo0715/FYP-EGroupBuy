import { TestBed } from '@angular/core/testing';

import { GroupbuyEventService } from './groupbuy-event.service';

describe('GroupbuyEventService', () => {
  let service: GroupbuyEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupbuyEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
