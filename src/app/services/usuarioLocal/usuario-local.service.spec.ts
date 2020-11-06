import { TestBed } from '@angular/core/testing';

import { UsuarioLocalService } from './usuario-local.service';

describe('UsuarioLocalService', () => {
  let service: UsuarioLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
