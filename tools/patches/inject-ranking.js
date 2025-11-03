// Inject ranking patch into the manual generator
(function(){
  function popularityScore(kw){
    let score = 0;
    if(/اسعار|تكلفة|سعر/.test(kw)) score += 9;
    if(/افضل|أفضل|احسن/.test(kw)) score += 8;
    if(/قريب مني|في\s+\S+/.test(kw)) score += 7;
    if(/حجز|طلب|رقم|اتصال/.test(kw)) score += 7;
    if(/24\s*ساعة|اليوم|فوري/.test(kw)) score += 6;
    if(/عروض|خصومات/.test(kw)) score += 5;
    if(/مع\s+التأمين|تغليف|فك وتركيب|رافعة|تخزين/.test(kw)) score += 4;
    const wc = kw.trim().split(/\s+/).length; 
    if(wc>=2 && wc<=4) score += 2; else if(wc>6) score -= 1;
    return score;
  }
  function sortByPopularity(keywords){ return [...keywords].sort((a,b)=>popularityScore(b)-popularityScore(a)); }
  function enforceCount(keywords){
    const MIN=20, MAX=50; const uniq=[...new Set(keywords)];
    if(uniq.length<MIN){
      const boosters=['قريب مني','اليوم','24 ساعة','افضل','رخيص'];
      let i=0; while(uniq.length<MIN && i<keywords.length){
        const base=keywords[i%keywords.length].replace(/\s+\(.*\)$/,'');
        boosters.forEach(b=>{ if(uniq.length<MIN) uniq.push(base+" "+b); }); i++;
      }
    }
    return sortByPopularity(uniq).slice(0, Math.max(MIN, Math.min(MAX, uniq.length)));
  }
  // hook into page if available
  if (typeof generateSmartKeywords === 'function'){
    const _origGen = generateSmartKeywords;
    window.generateSmartKeywords = function(){
      const result = _origGen.apply(this, arguments);
      return enforceCount(result);
    }
  }
})();