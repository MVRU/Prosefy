import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScreenSizeService {
  getElementosPorPaso(width: number): number {
    if (width < 576) return 1;       // XS
    if (width < 768) return 2;       // SM
    if (width < 992) return 3;       // MD
    return 4;                        // LG+
  }
}