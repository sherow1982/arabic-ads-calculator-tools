// Backlink publisher (no-login) robust implementation
(function(){
  const SITES = [
    {name:'Digg', url:'https://digg.com/submit', param:'url'},
    {name:'Mix', url:'https://mix.com/add', param:'url'},
    {name:'Pocket', url:'https://getpocket.com/save', param:'url'},
    {name:'Instapaper', url:'https://www.instapaper.com/save', param:'url'},
    {name:'AllTop', url:'https://alltop.com/submit', param:null},
    {name:'SEO Review Tools', url:'https://www.seoreviewtools.com/seo-checker/', param:null},
    {name:'PrePostSEO Backlinks', url:'https://www.prepostseo.com/backlinks-maker', param:null},
    {name:'SearchEngineReports', url:'https://searchenginereports.net/backlink-maker', param:null},
    {name:'Turbo SEO Tools', url:'https://www.turboseotools.com/backlink-maker', param:null},
    {name:'GT SEO Tools', url:'https://gtseotools.com/backlink-maker', param:null}
  ];

  function openBacklinkTabs(targetUrl){
    const opened = [];
    SITES.forEach((site,i)=>{
      setTimeout(()=>{
        let u = site.url;
        if(site.param){
          const sep = u.includes('?') ? '&' : '?';
          u += `${sep}${site.param}=${encodeURIComponent(targetUrl)}`;
        }
        const win = window.open(u, '_blank');
        opened.push({site: site.name, url: u, ok: !!win});
        if(!win){ console.warn('Popup blocked for ', site.name); }
      }, i*350);
    });
    return opened;
  }

  // Expose safe API
  window.BacklinkNoLogin = {
    run: openBacklinkTabs,
    sites: SITES
  };
})();