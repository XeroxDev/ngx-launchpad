import { TestBed } from '@angular/core/testing';

import { NgxLaunchpadService } from './ngx-launchpad.service';

describe('NgxLaunchpadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxLaunchpadService = TestBed.get(NgxLaunchpadService);
    expect(service).toBeTruthy();
  });
});
