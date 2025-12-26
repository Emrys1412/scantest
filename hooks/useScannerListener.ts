import { useEffect, useRef } from 'react';

export const useScannerListener = (onScan: (barcode: string) => void) => {
  // Use a ref for the callback to avoid re-binding listeners on every render if the callback function identity changes
  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;

  useEffect(() => {
    const bufferRef = { current: '' };
    let timeout: any;

    const onPaste = (event: ClipboardEvent) => {
      event.stopPropagation();
      const clipboardData = event.clipboardData || (window as any).clipboardData;
      if (clipboardData) {
        const text = clipboardData.getData('text');
        if (text) {
          onScanRef.current(text);
        }
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      // Simulate scanner keyboard wedge input
      if (event.key === 'Enter') {
        if (bufferRef.current.length > 0) {
          onScanRef.current(bufferRef.current);
          bufferRef.current = '';
          if (timeout) clearTimeout(timeout);
        }
        return;
      }
      
      // Basic character capture (ignoring control keys)
      if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
        bufferRef.current += event.key;
        if (timeout) clearTimeout(timeout);
        // Scanners usually type very fast, reset buffer if too slow
        timeout = setTimeout(() => { bufferRef.current = ''; }, 100);
      }
    };

    window.addEventListener('paste', onPaste);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('paste', onPaste);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);
};