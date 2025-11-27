import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { LibrosAutorComponent } from './libros-autor.component';
import { LibrosService, LibroOld } from '../../services/libros.service';
import { CurrencyService } from '../../services/currency.service';
import { AutoresService } from '../../services/autores.service';
import { Autor } from '../../models/autor.interface';

describe('LibrosAutorComponent', () => {
  let component: LibrosAutorComponent;
  let fixture: ComponentFixture<LibrosAutorComponent>;
  let librosService: LibrosService;
  let currencyService: CurrencyService;
  let autoresService: AutoresService;
  let mockAutores: Autor[];

  beforeEach(() => {

    mockAutores = [
      {
        _id: '1',
        nombre_completo: 'Nombre 1',
        perfil: 'perfil1.jpg',
        info: '...',
      },
      {
        _id: '2',
        nombre_completo: 'Nombre 2',
        perfil: 'perfil1.jpg',
        info: '...',
      },]


    TestBed.configureTestingModule({
      declarations: [LibrosAutorComponent],
      providers: [LibrosService, CurrencyService, AutoresService, DatePipe, { provide: ActivatedRoute, useValue: {} }],
      imports: [CommonModule, RouterModule]
    });
    fixture = TestBed.createComponent(LibrosAutorComponent);
    component = fixture.componentInstance;
    librosService = TestBed.inject(LibrosService);
    currencyService = TestBed.inject(CurrencyService);
    autoresService = TestBed.inject(AutoresService);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  /*
    it('debe inicializar el componente', () => {
      expect(component.currentPage).toEqual(1);
      expect(component.itemsPerPage).toEqual(4);
      expect(component.showMore).toBeFalsy();
      expect(component.deseos).toEqual({});
      expect(component.pulsateStates).toEqual({});
    });
   
   
    it('debe calcular el precio en la moneda seleccionada', () => {
      const mockPrice = 100;
      spyOn(currencyService, 'calculatePriceInSelectedCurrency').and.returnValue(80);
      const result = component.calculatePriceInSelectedCurrency(mockPrice);
      expect(result).toEqual(80);
    });
   
   
    it('debería marcar el libro en la lista de deseos', () => {
      const libro = { id: 1 };
      component.toggleDeseo(libro);
      // TODO: Agregar las expectativas apropiadas para el estado de deseos y pulsateStates
    });
   
   
    it('debería comprobar si un libro está en lista de deseos', () => {
      // Prueba para verificar si un libro está en deseos
      const libro = { id: 1 };
      // Agregar un libro a deseos antes de ejecutar la prueba
      component.toggleDeseo(libro);
      const isInDeseos = component.isInDeseos(libro);
      // TODO: Agregar las expectativas apropiadas para isInDeseos
    });
  
    */
});
