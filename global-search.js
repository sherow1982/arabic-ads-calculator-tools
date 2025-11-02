// Site-wide Search Bar Logic (robust v2)
(function(){
  const cfg = {
    input: '#globalSearchInput',
    btn: '#globalSearchBtn',
    filter: '#globalSearchFilter',
    scope: 'body',
    // دعم محددات بطاقات الدليل والكلّ
    cards: '.directory-tool, .tool-card, .card, .alert-card',
    title: '.tool-name-large, .tool-title, h3, .alert-title',
    desc: '.tool-description-large, .tool-description, p, .alert-summary'
  };

  function qsel(sel){ return document.querySelector(sel); }
  function qall(sel){ return Array.from(document.querySelectorAll(sel)); }

  function ensureUI(){
    // لا تُنشئ شريط جديد إذا كان موجوداً
    if(qsel('#globalSearchBar')) return;
    const container = qsel('.unified-container');
    if(!container) return;
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
        <input id="globalSearchInput" type="search" placeholder="ابحث… (ROAS، مزايدة، UTM)" aria-label="بحث">
        <button id="globalSearchBtn" class="search-btn"><i class="fas fa-search"></i> بحث</button>
      </div>`;
    container.parentNode?.insertBefore(wrap, container.nextSibling);
  }

  function matchFilter(card, filter){
    if(filter === 'all') return true;
    const cat = (card.getAttribute('data-category')||'').toLowerCase();
    if(filter==='advanced') return cat.includes('advanced');
    if(filter==='basic') return !cat.includes('advanced');
    if(filter==='tools') return true;
    if(filter==='pages') return false;
    return true;
  }

  function runSearch(){
    const input = qsel(cfg.input);
    if(!input){ return; }
    const query = (input.value||'').trim().toLowerCase();
    const filter = qsel(cfg.filter)?.value || 'all';
    const cards = qall(cfg.cards);

    // إذا لا يوجد بطاقات على الصفحة (مثل صفحات الأدوات الفردية)، لا شيء يُفلتر
    if(cards.length === 0) return;

    if(!query){ cards.forEach(c=> c.style.display=''); return; }

    const terms = query.split(/\s+/).filter(Boolean);

    let shown=0;
    cards.forEach(card=>{
      const title = (card.querySelector(cfg.title)?.textContent||'').toLowerCase();
      const desc = (card.querySelector(cfg.desc)?.textContent||'').toLowerCase();
      const hay = `${title} ${desc}`;
      const ok = terms.every(t=> hay.includes(t)) && matchFilter(card, filter);
      card.style.display = ok ? '' : 'none';
      if(ok) shown++;
    });

    if(typeof gtag!=='undefined'){
      gtag('event','global_search',{query,filter,results:shown});
    }
  }

  function bind(){
    // احتياطي في حال السكربت تأخر: ربط لاحقاً عند ظهور العناصر
    const tryBind = ()=>{
      const input = qsel(cfg.input);
      const btn = qsel(cfg.btn);
      const filter = qsel(cfg.filter);
      if(!input || !btn || !filter){ return setTimeout(tryBind, 200); }
      input.addEventListener('input', debounce(runSearch, 150));
      btn.addEventListener('click', runSearch);
      filter.addEventListener('change', runSearch);
    };
    tryBind();
  }

  function debounce(fn, wait){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn.apply(this,a), wait); }; }

  document.addEventListener('DOMContentLoaded', ()=>{
    // لا نضيف UI جديد، نفترض أنه موجود ضمن الصفحة، لكن نحسّن المنطق والاختيارات
    bind();
  });

})();
