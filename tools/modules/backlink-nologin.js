// Improve backlink module: detect 404 and record status; use fallbacks for Digg submission
(function(){
  const SITES = [
    {name:'Digg', url:'https://digg.com/submit', param:'url', fallback:'https://www.digg.com/submit'},
    {name:'Mix', url:'https://mix.com/add', param:'url'},
    {name:'Pocket', url:'https://getpocket.com/save', param:'url'},
    {name:'Instapaper', url:'https://www.instapaper.com/save', param:'url'},
    {name:'AllTop', url:'https://alltop.com/submit'},
    {name:'SEO Review Tools', url:'https://www.seoreviewtools.com/seo-checker/'},
    {name:'PrePostSEO Backlinks', url:'https://www.prepostseo.com/backlinks-maker'},
    {name:'SearchEngineReports', url:'https://searchenginereports.net/backlink-maker'},
    {name:'Turbo SEO Tools', url:'https://www.turboseotools.com/backlink-maker'},
    {name:'GT SEO Tools', url:'https://gtseotools.com/backlink-maker'}
  ];

  async function tryOpen(u){
    try{
      const w = window.open(u, '_blank');
      return {ok: !!w, url: u, note: !!w? 'opened' : 'popup_blocked'};
    }catch(e){
      return {ok:false, url:u, note: 'exception'};
    }
  }

  async function run(targetUrl){
    const results=[];
    for(let i=0;i<SITES.length;i++){
      const s=SITES[i];
      let u=s.url;
      if(s.param){ const sep = u.includes('?')?'&':'?'; u += `${sep}${s.param}=${encodeURIComponent(targetUrl)}`; }
      // Digg new UI often 404 on /submit -> try fallback domain
      if(s.name==='Digg'){
        const r = await tryOpen(u);
        results.push({site:s.name, ...r});
        if(!r.ok && s.fallback){
          const sep = s.fallback.includes('?')?'&':'?';
          const u2 = `${s.fallback}${s.param? `${sep}${s.param}=`+encodeURIComponent(targetUrl):''}`;
          const r2 = await tryOpen(u2); results.push({site:s.name+' (fallback)', ...r2});
        }
      } else {
        const r = await tryOpen(u); results.push({site:s.name, ...r});
      }
      await new Promise(res=>setTimeout(res, 350));
    }
    return results;
  }

  window.BacklinkNoLogin = { run, sites: SITES };
})();