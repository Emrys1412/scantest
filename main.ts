import '@angular/compiler'; // Required for JIT compilation in browser
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { UrovoScannerService } from './app/services/urovo-scanner.service';
import { SCANNER_INPUT_SERVICE } from './app/tokens';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: SCANNER_INPUT_SERVICE, useClass: UrovoScannerService }
  ]
}).catch(err => console.error(err));