// Minimal client-side module to guide user to build high-DA backlinks professionally
// Adds a new button in url-shortener.html via DOM injection and opens a guided modal
(function(){
  const SITES = [
    {name:'Medium', url:'https://medium.com', type:'Article', dr:95},
    {name:'LinkedIn Articles', url:'https://www.linkedin.com/post/new/', type:'Article', dr:96},
    {name:'WordPress.com', url:'https://wordpress.com/start', type:'Web 2.0', dr:94},
    {name:'Blogger', url:'https://www.blogger.com/about/', type:'Web 2.0', dr:93},
    {name:'Tumblr', url:'https://www.tumblr.com', type:'Web 2.0', dr:94},
    {name:'Sites.Google', url:'https://sites.google.com/new', type:'Web 2.0', dr:94},
    {name:'GitHub Pages', url:'https://pages.github.com/', type:'Docs/Project', dr:96},
    {name:'Substack', url:'https://substack.com/', type:'Newsletter', dr:86},
    {name:'Quora', url:'https://www.quora.com/', type:'Q&A', dr:93},
    {name:'Reddit', url:'https://www.reddit.com/submit', type:'Community', dr:96}
  ];

  function ensureModal(){
    if(document.getElementById('backlinkModal')) return;
    const m = document.createElement('div');
    m.id='backlinkModal';
    m.innerHTML = `
    <div class="modal fade" id="backlinkModal" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">🔗 إنشاء باك لينك قوي (DA عالي)</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-muted">اختر منصة موثوقة، سننشئ لك نصاً احترافياً يتضمن الرابط القصير والجميل، وعناصر E-E-A-T (عنوان، وصف، CTA).</p>
            <div class="mb-3">
              <label class="form-label">اختر منصة:</label>
              <div class="row g-2" id="siteGrid"></div>
            </div>
            <div class="mb-3">
              <label class="form-label">عنوان المنشور</label>
              <input class="form-control" id="blTitle" placeholder="أفضل عرض: [اسم المنتج] مع توصيل سريع في الكويت" />
            </div>
            <div class="mb-3">
              <label class="form-label">وصف احترافي (سيُولّد تلقائياً ويمكن تعديله)</label>
              <textarea class="form-control" id="blBody" rows="6"></textarea>
            </div>
            <div class="alert alert-info" id="blPreview" style="white-space:pre-wrap"></div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal">إغلاق</button>
            <a class="btn btn-success" id="blGo" target="_blank" rel="noopener">اذهب للنشر ↗</a>
          </div>
        </div>
      </div>
    </div>`;
    document.body.appendChild(m);

    // build site grid
    const grid = m.querySelector('#siteGrid');
    SITES.forEach((s,i)=>{
      const col = document.createElement('div');
      col.className='col-6 col-md-4';
      col.innerHTML = `<button class="btn btn-light w-100 text-start border" data-index="${i}">
        <div class="fw-bold">${s.name}</div>
        <small class="text-muted">${s.type} • DR~${s.dr}</small>
      </button>`;
      grid.appendChild(col);
    });

    grid.addEventListener('click', e=>{
      const btn = e.target.closest('button[data-index]');
      if(!btn) return;
      const idx = +btn.dataset.index;
      const platform = SITES[idx];
      const latest = (window.__processedResults||[])[0];
      const shortUrl = latest? latest.shortUrl : '';
      const prettyUrl = latest? latest.prettyUrl : '';
      const title = document.getElementById('blTitle').value || 'عرض مميز ومنتج مطلوب في الكويت';
      const body = `\n${title}\n\n• رابط قصير: ${shortUrl}\n• رابط جميل: ${prettyUrl}\n\nلماذا هذا المنتج؟\n- جودة عالية وسعر مناسب\n- تقييمات ممتازة\n- شحن سريع\n\nاطلب الآن من الرابط أعلاه ✅`;
      document.getElementById('blBody').value = body;
      document.getElementById('blPreview').textContent = `المعاينة:\n\n${body}`;
      const go = document.getElementById('blGo');
      go.href = platform.url;
    });
  }

  function injectButton(){
    const ctr = document.querySelector('.text-center.mb-4');
    if(!ctr || document.getElementById('btnBacklink')) return;
    const btn = document.createElement('button');
    btn.id='btnBacklink';
    btn.className='btn btn-outline-dark btn-lg';
    btn.innerHTML = '<i class="fa-solid fa-bolt me-2"></i> باك لينك DA عالي';
    btn.onclick = ()=>{
      ensureModal();
      const modal = new bootstrap.Modal(document.getElementById('backlinkModal'));
      // expose last processed results for content
      window.__processedResults = window.processedResults || [];
      modal.show();
    };
    ctr.appendChild(btn);
  }

  // try inject after load
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', injectButton);
  } else {
    injectButton();
  }
})();