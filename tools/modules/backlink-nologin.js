// Extend backlink list to 25 no-login sites with batching and delays
(function(){
  const SITES = [
    {name:'Digg', url:'https://www.digg.com/submit', param:'url'},
    {name:'Mix', url:'https://mix.com/add', param:'url'},
    {name:'Pocket', url:'https://getpocket.com/save', param:'url'},
    {name:'Instapaper', url:'https://www.instapaper.com/save', param:'url'},
    {name:'AllTop', url:'https://alltop.com/submit'},
    {name:'SEO Review Tools', url:'https://www.seoreviewtools.com/seo-checker/'},
    {name:'PrePostSEO Backlinks', url:'https://www.prepostseo.com/backlinks-maker'},
    {name:'SearchEngineReports', url:'https://searchenginereports.net/backlink-maker'},
    {name:'Turbo SEO Tools', url:'https://www.turboseotools.com/backlink-maker'},
    {name:'GT SEO Tools', url:'https://gtseotools.com/backlink-maker'},
    {name:'SiteChecker Backlinks', url:'https://sitechecker.pro/backlinks-generator/'},
    {name:'Simplified SEO Tools', url:'https://simplifiedseotools.com/backlink-maker'},
    {name:'W3era Backlink Tool', url:'https://www.w3era.com/seo-tools/backlink-maker/'},
    {name:'Digital Web Services Backlink', url:'https://www.digital-web-services.com/marketing-seo-tools/backlink-maker'},
    {name:'AllInOneTools Backlink', url:'https://allinonetools.net/backlink-maker/'},
    {name:'SEOWagon Backlink', url:'https://seowagon.com/backlink-maker'},
    {name:'Turbo SEO Backlink (alt)', url:'https://turboseotools.com/backlink-maker'},
    {name:'GT SEO Backlink (alt)', url:'https://www.gtseotools.com/backlink-maker'},
    {name:'Duplichecker Backlink', url:'https://www.duplichecker.com/backlink-maker.php'},
    {name:'PrePostSEO URL Opener', url:'https://www.prepostseo.com/url-opener'},
    {name:'SmallSEOTools Ping', url:'https://smallseotools.com/website-ping/'} ,
    {name:'Ping.eu', url:'https://ping.eu/web-ping/'},
    {name:'H-supertools Pinger', url:'https://h-supertools.com/seo-tools/pinger/'},
    {name:'iTools Ping', url:'https://www.itools.com/tool/ping'}
  ];

  function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

  async function run(targetUrl){
    const results=[];
    const batchSize=12; const delay=400; // per your preference
    for(let i=0;i<SITES.length;i++){
      const s=SITES[i];
      let u=s.url;
      if(s.param){ const sep=u.includes('?')?'&':'?'; u+=`${sep}${s.param}=${encodeURIComponent(targetUrl)}`; }
      let ok=false; try{ const w=window.open(u,'_blank'); ok=!!w; }catch(_){ ok=false; }
      results.push({site:s.name,url:u,ok});
      if((i+1)%batchSize===0) await sleep(1200); else await sleep(delay);
    }
    return results;
  }

  window.BacklinkNoLogin = { run, sites: SITES };
})();