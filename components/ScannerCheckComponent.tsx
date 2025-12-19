import React, { useState, useCallback } from 'react';
import { ArrowLeft, Menu } from 'lucide-react';
import { ScanResult } from '../types';
import { useScannerListener } from '../hooks/useScannerListener';
import { formatDate } from '../utils/dateUtils';

export const ScannerCheckComponent: React.FC = () => {
  // Logic mimicking: scanResult : WritableSignal<ScanResult[]> = signal<Array<ScanResult>>([]);
  const [scanResult, setScanResult] = useState<ScanResult[]>([]);

  // Function to handle new entries, mimicking the subscribe logic
  const handleScan = useCallback((barcode: string, source: 'clipboard' | 'keyboard') => {
    const newEntry: ScanResult = {
      barcode: barcode,
      source: source,
      timestamp: new Date(),
    };
    
    // mimicking: this.scanResult.update((current) => [newEntry, ...current]);
    setScanResult((current) => [newEntry, ...current]);
  }, []);

  // Initialize the listener
  useScannerListener(handleScan);

  // Manual trigger for keyboard simulation (since the snippet only covered paste, 
  // but the UI shows "keyboard" source, we add a hidden helper or just rely on the paste snippet logic)
  const handleClear = () => {
    setScanResult([]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans text-sm">
      {/* Header - mimicking the blue "ПРОВЕРКА СКАНЕРА" bar */}
      <header className="bg-[#1e40af] text-white p-4 flex items-center shadow-md shrink-0">
        <button className="mr-4">
            <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold tracking-wide flex-grow">ПРОВЕРКА СКАНЕРА</h1>
        <div className="w-8"></div> {/* Spacer for balance */}
      </header>

      {/* URL/Title Bar Mockup (Optional based on screenshot frame, helps realism) */}
      <div className="bg-gray-100 border-b p-2 text-gray-500 text-xs flex justify-center items-center">
         <span className="bg-white px-2 py-1 rounded border">dev.tp.mvideo.ru</span>
      </div>

      {/* Action Bar */}
      <div className="bg-[#eef2f6] p-3 flex justify-center border-b border-gray-200 shrink-0">
        <button 
          onClick={handleClear}
          className="text-[#5b6f82] font-medium active:text-blue-800 transition-colors"
        >
          Очистить
        </button>
      </div>

      {/* Scrollable List Area */}
      <div className="flex-1 overflow-y-auto">
        {scanResult.map((result, index) => (
          <div 
            key={`${result.timestamp.getTime()}-${index}`}
            className={`
              flex flex-row p-3 border-b border-gray-200 
              ${index % 2 === 0 ? 'bg-[#eef6ff]' : 'bg-white'} 
            `}
          >
            {/* Left Column: Barcode */}
            <div className="flex-1 pr-2 flex flex-col justify-center">
              <div className="text-gray-500 mb-1">Barcode:</div>
              <div className="text-gray-700 font-medium break-all leading-tight">
                {result.barcode}
              </div>
            </div>

            {/* Middle Column: Source */}
            <div className="w-24 px-2 flex flex-col justify-start text-right">
              <div className="text-gray-500 text-xs">source:</div>
              <div className="text-gray-600 text-sm">{result.source}</div>
            </div>

            {/* Right Column: Date/Time */}
            <div className="w-24 pl-2 flex flex-col justify-start text-right text-gray-600 text-xs leading-relaxed">
              {/* Splitting date and time to match vertical stack in screenshot */}
              <div>{formatDate(result.timestamp).split(' ')[0]}</div>
              <div className="text-sm">{formatDate(result.timestamp).split(' ')[1]}</div>
              <div className="text-[10px] text-gray-400">0</div> {/* Mocking the milliseconds/extra digit seen in screenshot */}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {scanResult.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
            <p className="text-center">
              Scan a barcode to see results here.<br/>
              (Simulate by pasting text Ctrl+V)
            </p>
          </div>
        )}
      </div>
      
      {/* Footer Navigation (Mockup) */}
      <div className="bg-white border-t border-gray-200 p-3 flex justify-around items-center shrink-0 pb-6">
        <button className="text-gray-400 hover:text-blue-800"><ArrowLeft size={20}/></button>
        <button className="text-gray-400 hover:text-blue-800"><div className="w-5 h-5 border-2 border-gray-400 rounded-sm"></div></button>
        <button className="text-gray-400 hover:text-blue-800"><Menu size={20}/></button>
      </div>
    </div>
  );
};