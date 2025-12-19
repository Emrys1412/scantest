export const formatDate = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  
  const dd = pad(date.getDate());
  const MM = pad(date.getMonth() + 1);
  const yyyy = date.getFullYear();
  
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  // Screenshot shows milliseconds/frames sometimes, but standard format is HH:mm:ss
  // The Angular snippet uses 'dd.MM.yyyy HH:mm:ss'
  
  return `${dd}.${MM}.${yyyy} ${HH}:${mm}:${ss}`;
};