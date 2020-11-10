import { TestBed } from '@angular/core/testing';

import { NivelLocalService } from './nivel-local.service';

describe('NivelLocalService', () => {
  let service: NivelLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NivelLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
