import { TestBed } from '@angular/core/testing';

import { ResultadoLocalService } from './resultado-local.service';

describe('ResultadoLocalService', () => {
  let service: ResultadoLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultadoLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
