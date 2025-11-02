// Site-wide Search Bar Logic
(function(){
  const searchConfig = {
    inputSelector: '#globalSearchInput',
    scopeSelector: 'body',
    cardSelector: '.tool-card, .card',
    titleSelector: '.tool-title, h3',
    descSelector: '.tool-description, p',
    navAttachSelector: '.unified-container',
  };

  function createSearchUI(){
    if(document.getElementById('globalSearchBar')) return;
    const wrap = document.createElement('div');
    wrap.className = 'unified-search-wrapper';
    wrap.innerHTML = `
      <div class="unified-search" id="globalSearchBar">
        <select id="globalSearchFilter" class="filter-select">
          <option value="all">كل الموقع</option>
          <option value="tools">الأدوات فقط</option>
          <option value="advanced">الأدوات المتقدمة</option>
          <option value="basic">الأدوات الأساسية</option>
          <option value="pages">الصفحات</option>
        </select>
        <input id="globalSearchInput" type="search" placeholder="ابحث في 27 أداة... (مثال: ROAS، Performance Max، مزايدة)" aria-label="بحث">
        <button id="globalSearchBtn" class="search-btn"><i class="fas fa-search"></i> بحث</button>
      </div>`;
    const attachPoint = document.querySelector(searchConfig.navAttachSelector);
    attachPoint?.parentNode?.insertBefore(wrap, attachPoint.nextSibling);
  }

  function getCards(){
    return Array.from(document.querySelectorAll(searchConfig.cardSelector));
  }

  function matchesFilters(card, filter){
    if(filter === 'all') return true;
    const isAdvanced = card.querySelector('.badge.advanced, .advanced-badge');
    if(filter === 'advanced') return !!isAdvanced;
    if(filter === 'basic') return !isAdvanced;
    if(filter === 'tools') return true;
    if(filter === 'pages') return false; // cards are tools
    return true;
  }

  function search(){
    const q = (document.querySelector(searchConfig.inputSelector)?.value || '').trim().toLowerCase();
    const filter = document.getElementById('globalSearchFilter')?.value || 'all';
    const cards = getCards();
    let shown = 0;

    if(!q){
      cards.forEach(c=> c.style.display = '');
      return;
    }

    const terms = q.split(/\s+/).filter(Boolean);

    cards.forEach(card =>{
      const title = (card.querySelector(searchConfig.titleSelector)?.textContent || '').toLowerCase();
      const desc = (card.querySelector(searchConfig.descSelector)?.textContent || '').toLowerCase();
      const hay = `${title} ${desc}`;
      const allMatch = terms.every(t => hay.includes(t));
      const pass = allMatch && matchesFilters(card, filter);
      card.style.display = pass ? '' : 'none';
      if(pass) shown++;
    });

    if(typeof gtag !== 'undefined'){
      gtag('event', 'global_search', {query:q, filter, results: shown});
    }
  }

  function bind(){
    const input = document.querySelector(searchConfig.inputSelector);
    const btn = document.getElementById('globalSearchBtn');
    const filter = document.getElementById('globalSearchFilter');
    input?.addEventListener('input', debounce(search, 150));
    btn?.addEventListener('click', search);
    filter?.addEventListener('change', search);
  }

  function debounce(fn, wait){
    let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn.apply(this,args), wait); };
  }

  // init when DOM ready
  document.addEventListener('DOMContentLoaded', ()=>{
    createSearchUI();
    bind();
  });
})();