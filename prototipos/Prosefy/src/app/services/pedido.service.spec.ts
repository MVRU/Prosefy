import { TestBed } from '@angular/core/testing';

import { PedidosService } from './pedido.service';

describe('PedidoService', () => {
  let service: PedidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
