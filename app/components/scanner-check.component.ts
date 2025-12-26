import { Component, OnInit, WritableSignal, signal, inject, DestroyRef, Directive, Input, ElementRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScanResult } from '../../types';
import { ScannerInputService, SCANNER_INPUT_SERVICE } from '../tokens';

// Mock MatTooltip Directive to allow the template code to run without Material
@Directive({
  selector: '[matTooltip]',
  standalone: true
})
export class MockMatTooltip {
  @Input('matTooltip') text: string = '';
  @Input() matTooltipShowDelay = 0;
  @Input() matTooltipHideDelay = 0;
  @Input() matTooltipPosition = '';
  
  constructor(private el: ElementRef) {}
  
  ngOnInit() {
    this.el.nativeElement.title = this.text || '';
  }
}

@Component({
  selector: 'sew-scanner-check', 
  standalone: true,
  imports: [CommonModule, MockMatTooltip],
  template: `
    <div class="flex flex-col h-screen bg-gray-50 font-sans text-sm">
      <!-- Header -->
      <header class="bg-[#1e40af] text-white p-4 flex items-center shadow-md shrink-0">
        <button class="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        </button>
        <h1 class="text-lg font-bold tracking-wide flex-grow">ПРОВЕРКА СКАНЕРА</h1>
        <div class="w-8"></div>
      </header>

      <!-- URL Bar Mockup -->
      <div class="bg-gray-100 border-b p-2 text-gray-500 text-xs flex justify-center items-center">
         <span class="bg-white px-2 py-1 rounded border">dev.tp.mvideo.ru</span>
      </div>

      <!-- Action Bar -->
      <div class="bg-[#eef2f6] p-3 flex justify-center border-b border-gray-200 shrink-0">
        <button (click)="handleClear()" class="text-[#5b6f82] font-medium active:text-blue-800">Очистить</button>
      </div>

      <!-- List Area -->
      <div class="flex-1 overflow-y-auto">
        @for (result of scanResult(); track result.timestamp) {
          <div class="flex flex-row p-3 border-b border-gray-200" [ngClass]="{'bg-[#eef6ff]': true}">
            
            <!-- Barcode Section -->
            <div class="flex-1 pr-2 flex flex-col justify-center"
                 matTooltip="Копировать"
                 [matTooltipShowDelay]="500"
                 [matTooltipHideDelay]="500"
                 [matTooltipPosition]="'right'">
               <div class="text-gray-500 mb-1">Barcode:</div>
               <div class="text-gray-700 font-medium break-all leading-tight">{{ result.barcode }}</div>
            </div>

            <!-- Source Section -->
            <div class="w-24 px-2 flex flex-col justify-start text-right">
               <div class="text-gray-500 text-xs">source:</div>
               <div class="text-gray-600 text-sm">{{ result.source }}</div>
            </div>

            <!-- Date Section -->
            <div class="w-24 pl-2 flex flex-col justify-start text-right text-gray-600 text-xs leading-relaxed">
               <div>{{ result.timestamp | date: 'dd.MM.yyyy' }}</div>
               <div class="text-sm">{{ result.timestamp | date: 'HH:mm:ss' }}</div>
               <div class="text-[10px] text-gray-400">0</div>
            </div>
          </div>
        }

        <!-- Empty State -->
        <div *ngIf="scanResult().length === 0" class="h-full flex flex-col items-center justify-center text-gray-400 p-8">
          <p class="text-center">No scans yet.<br/>(Press keys or Paste text)</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-white border-t border-gray-200 p-3 flex justify-around items-center shrink-0 pb-6">
        <button class="text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg></button>
        <button class="text-gray-400"><div class="w-5 h-5 border-2 border-gray-400 rounded-sm"></div></button>
        <button class="text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg></button>
      </div>
    </div>
  `
})
export class ScannerCheckComponent implements OnInit {
  scanResult: WritableSignal<ScanResult[]> = signal<Array<ScanResult>>([]);

  #scanner: ScannerInputService = inject<ScannerInputService>(SCANNER_INPUT_SERVICE);
  #destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.#scanner.scannerInput
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((barcode: string) => {
        const source = 'clipboard'; 
        const newEntry: ScanResult = {
          barcode: barcode,
          source: source,
          timestamp: new Date(),
        };
        this.scanResult.update((current) => [newEntry, ...current]);
      });
  }

  handleClear() {
    this.scanResult.set([]);
  }
}