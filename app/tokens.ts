import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface ScannerInputService {
  scannerInput: Observable<string>;
}

export const SCANNER_INPUT_SERVICE = new InjectionToken<ScannerInputService>('ScannerInputService');