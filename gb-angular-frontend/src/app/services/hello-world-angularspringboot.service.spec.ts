import { TestBed } from '@angular/core/testing';

import { HelloWorldAngularspringbootService } from './hello-world-angularspringboot.service';

describe('HelloWorldAngularspringbootService', () => {
  let service: HelloWorldAngularspringbootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelloWorldAngularspringbootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
