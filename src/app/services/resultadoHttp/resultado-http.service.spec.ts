import { TestBed } from '@angular/core/testing';

import { ResultadoHttpService } from './resultado-http.service';

describe('ResultadoHttpService', () => {
  let service: ResultadoHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultadoHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
