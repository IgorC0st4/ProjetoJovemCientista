import { TestBed } from '@angular/core/testing';

import { UsuarioHttpServiceService } from './usuario-http-service.service';

describe('UsuarioHttpServiceService', () => {
  let service: UsuarioHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
