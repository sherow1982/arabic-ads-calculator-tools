// XLSX exporter for Arabic keywords
// Requires SheetJS (xlsx) via CDN
(function(){
  function toWorksheet(rows){
    const ws = XLSX.utils.aoa_to_sheet(rows);
    // RTL support (SheetJS note: Excel renders Arabic properly; optional props)
    return ws;
  }
  function downloadXlsx(filename, rows){
    const wb = XLSX.utils.book_new();
    const ws = toWorksheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, 'Keywords');
    XLSX.writeFile(wb, filename, {bookType:'xlsx'});
  }
  window.__XLSX_EXPORT__ = { downloadXlsx };
})();
