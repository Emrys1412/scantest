import { Component } from '@angular/core';
import { ScannerCheckComponent } from './components/scanner-check.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScannerCheckComponent],
  template: `
    <sew-scanner-check></sew-scanner-check>
  `
})
export class AppComponent {}