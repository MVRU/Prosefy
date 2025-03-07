import { LOCALE_ID } from '@angular/core';

export function provideLocale(locale: string) {
  return { provide: LOCALE_ID, useValue: locale };
}