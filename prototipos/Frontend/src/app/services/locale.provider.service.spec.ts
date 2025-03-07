/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Locale.providerService } from './locale.provider.service';

describe('Service: Locale.provider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Locale.providerService]
    });
  });

  it('should ...', inject([Locale.providerService], (service: Locale.providerService) => {
    expect(service).toBeTruthy();
  }));
});
