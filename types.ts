export interface ScanResult {
  barcode: string;
  timestamp: Date;
  source: 'clipboard' | 'keyboard';
}