// Add retry for blocked popups
(function(){
  if(!window.BacklinkNoLogin) return;

  const originalRun = window.BacklinkNoLogin.run;
  let lastResults = [];

  async function runWithRecord(targetUrl){
    lastResults = await originalRun(targetUrl);
    window.dispatchEvent(new CustomEvent('backlink:results', {detail: lastResults}));
    return lastResults;
  }

  async function retryBlocked(){
    if(!lastResults.length) return [];
    const blocked = lastResults.filter(r=>!r.ok);
    const retried = [];
    for(let i=0;i<blocked.length;i++){
      const b = blocked[i];
      try{
        const w = window.open(b.url, '_blank');
        retried.push({site:b.site, url:b.url, ok:!!w, retried:true});
      }catch(_){ retried.push({site:b.site, url:b.url, ok:false, retried:true}); }
      await new Promise(res=>setTimeout(res, 400));
    }
    return retried;
  }

  window.BacklinkNoLogin.run = runWithRecord;
  window.BacklinkNoLogin.retryBlocked = retryBlocked;
})();