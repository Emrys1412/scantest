import React, { useState } from 'react';
import { useScannerListener } from '../hooks/useScannerListener';
import { ScanResult } from '../types';

export const ScannerCheckComponent: React.FC = () => {
  const [results, setResults] = useState<ScanResult[]>([]);

  useScannerListener((barcode) => {
    // Mimic the source logic (simple heuristic for demo)
    const source = 'clipboard'; 
    const newEntry: ScanResult = {
      barcode,
      timestamp: new Date(),
      source,
    };
    setResults((prev) => [newEntry, ...prev]);
  });

  const handleClear = () => {
    setResults([]);
  };

  const formatDate = (date: Date) => {
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${d}.${m}.${y}`;
  };

  const formatTime = (date: Date) => {
    const h = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');
    return `${h}:${min}:${s}`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans text-sm select-none">
      {/* Header */}
      <header className="bg-[#1e40af] text-white p-4 flex items-center shadow-md shrink-0">
        <button className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        </button>
        <h1 className="text-lg font-bold tracking-wide flex-grow uppercase">ПРОВЕРКА СКАНЕРА</h1>
        <div className="w-8"></div>
      </header>

      {/* URL Bar Mockup */}
      <div className="bg-gray-100 border-b border-gray-300 p-2 text-gray-500 text-xs flex justify-center items-center">
         <div className="bg-white px-3 py-1 rounded border border-gray-300 flex items-center gap-2 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>dev.tp.mvideo.ru</span>
         </div>
      </div>

      {/* Action Bar */}
      <div className="bg-[#eef2f6] p-3 flex justify-center border-b border-gray-200 shrink-0">
        <button 
          onClick={handleClear} 
          className="text-[#5b6f82] font-medium text-base active:text-blue-800 transition-colors"
        >
          Очистить
        </button>
      </div>

      {/* List Area */}
      <div className="flex-1 overflow-y-auto bg-white">
        {results.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 space-y-4">
             <div className="w-16 h-16 border-2 border-gray-200 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
             </div>
             <p className="text-center">Scan a barcode<br/>(Paste text or Type + Enter)</p>
          </div>
        ) : (
          results.map((result, index) => (
            <div key={index} className="flex flex-row p-3 border-b border-gray-200 bg-[#eef6ff]">
              
              {/* Barcode Section */}
              <div className="flex-1 pr-2 flex flex-col justify-center group relative cursor-pointer" title="Копировать">
                 <div className="text-gray-500 mb-1 text-xs">Barcode:</div>
                 <div className="text-gray-700 font-medium break-all leading-tight text-base">{result.barcode}</div>
              </div>

              {/* Source Section */}
              <div className="w-24 px-2 flex flex-col justify-start text-right">
                 <div className="text-gray-500 text-xs">source:</div>
                 <div className="text-gray-600 text-sm">{result.source}</div>
              </div>

              {/* Date Section */}
              <div className="w-24 pl-2 flex flex-col justify-start text-right text-gray-600 text-xs leading-relaxed font-mono">
                 <div className="text-gray-800">{formatDate(result.timestamp)}</div>
                 <div className="text-gray-800">{formatTime(result.timestamp)}</div>
                 <div className="text-[10px] text-gray-400 mt-1">{result.timestamp.getMilliseconds()}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 p-3 flex justify-around items-center shrink-0 pb-6">
        <button className="text-gray-400 hover:text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg></button>
        <button className="text-gray-400 hover:text-gray-600"><div className="w-5 h-5 border-2 border-currentColor rounded-sm"></div></button>
        <button className="text-gray-400 hover:text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg></button>
      </div>
    </div>
  );
};