import { useEffect } from 'react';

/**
 * This hook replicates the logic found in UrovoScannerService.
 * specifically the registerScanListener and onEvent methods.
 */
export const useScannerListener = (
  onScan: (barcode: string, source: 'clipboard' | 'keyboard') => void
) => {
  useEffect(() => {
    // Logic from: private registerScanListener(): void
    const onEvent = async (event: ClipboardEvent) => {
      // Logic from: private onEvent
      event.stopPropagation();
      // NOTE: Using 'any' cast to match snippet behavior where strict types might fight raw DOM events
      const clipboardData: any = event.clipboardData || (window as any)['clipboardData'];
      
      if (clipboardData) {
        const text: any = clipboardData.getData('text');
        if (text) {
           onScan(text, 'clipboard');
        }
      }
    };

    window.addEventListener('paste', onEvent);

    // Logic from: private removeScanListener(): void
    return () => {
      window.removeEventListener('paste', onEvent);
    };
  }, [onScan]);
};