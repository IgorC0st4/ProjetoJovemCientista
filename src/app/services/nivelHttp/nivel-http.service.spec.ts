import { TestBed } from '@angular/core/testing';

import { NivelHttpService } from './nivel-http.service';

describe('NivelHttpService', () => {
  let service: NivelHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NivelHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
