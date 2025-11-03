// URL Cleaner Module - لا يغيّر الدومين، ينظّف فقط المسار والاستعلام للأحرف العربية/الرموز
(function(){
  function normalizeUrl(url){
    try{
      // إضافة البروتوكول لو ناقص
      if(!/^https?:\/\//i.test(url)) url = 'https://' + url.trim();
      const u = new URL(url);
      // إزالة /./ و //// وتطبيع المسار
      let path = u.pathname.replace(/\/\.\//g,'/').replace(/\/+/, '/');
      // إعادة ترميز قيم الاستعلام بشكل صحيح (خاصة العربية)
      const params = new URLSearchParams(u.search);
      const clean = new URL(u.origin + path);
      const keys = Array.from(params.keys());
      keys.forEach(k=>{
        const vals = params.getAll(k);
        vals.forEach(v=>{
          // فك ثم إعادة ترميز آمن بدون تغيير الدومين
          try{ v = decodeURIComponent(v); }catch(_){ }
          clean.searchParams.append(k, encodeURIComponent(v).replace(/%20/g,'+'));
        });
      });
      // إعادة تجميع الرابط النهائي مع نفس الدومين
      return clean.toString();
    }catch{ return url.trim(); }
  }

  function cleanBulk(list){
    return list
      .split('\n')
      .map(l=>l.trim())
      .filter(Boolean)
      .map(normalizeUrl)
      .join('\n');
  }

  // إدراج زر في صفحة الأداة
  function injectButton(){
    const actions = document.querySelector('.text-center.mb-4');
    if(!actions || document.getElementById('btnCleanUrls')) return;
    const btn = document.createElement('button');
    btn.id = 'btnCleanUrls';
    btn.className = 'btn btn-outline-warning me-2';
    btn.innerHTML = '<i class="fas fa-broom me-2"></i>تنظيف الروابط (لا يغيّر الدومين)';
    btn.onclick = () => {
      const textarea = document.getElementById('urlInput');
      textarea.value = cleanBulk(textarea.value);
      // تحديث الإحصائيات فوراً
      if(typeof updateStats === 'function') updateStats();
    };
    actions.prepend(btn);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', injectButton);
  } else {
    injectButton();
  }
})();