import { TestBed } from '@angular/core/testing';

import { Colaboradores } from './colaboradores';

describe('Colaboradores', () => {
  let service: Colaboradores;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Colaboradores);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
