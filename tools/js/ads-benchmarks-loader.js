// Arabic Ads Country Benchmarks Loader
// Note: Replace placeholders by real market data. Numbers are indicative only.

(async function(){
  try{
    const res = await fetch('/data/ads-country-benchmarks.json');
    const data = await res.json();
    window.__ADS_BENCHMARKS__ = data;
  }catch(e){ console.error('Failed to load benchmarks', e); }
})();
