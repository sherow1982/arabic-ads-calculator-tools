/* Shared top navigation and back button styles + markup injector */
(function(){
  const navHTML = `
    <div id="tools-topbar" dir="rtl" style="position:sticky;top:0;z-index:1000;background:rgba(255,255,255,.85);backdrop-filter:blur(8px);border-bottom:1px solid rgba(0,0,0,.06);font-family:'Cairo',system-ui,Arial,sans-serif">
      <div style="max-width:1200px;margin:0 auto;padding:10px 16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <a href="index.html" aria-label="رجوع للصفحة الرئيسية" style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;text-decoration:none;padding:8px 14px;border-radius:999px;font-weight:700">
          <span>⬅️</span><span>رجوع</span>
        </a>
        <nav aria-label="التنقل" style="display:flex;gap:8px;flex-wrap:wrap;margin-inline-start:8px">
          <a href="index.html#tools" style="text-decoration:none;color:#0a2540;background:rgba(102,126,234,.12);padding:8px 12px;border-radius:14px">الأدوات</a>
          <a href="cpc-calculator.html" style="text-decoration:none;color:#0a2540;background:rgba(102,126,234,.12);padding:8px 12px;border-radius:14px">CPC</a>
          <a href="roi-calculator.html" style="text-decoration:none;color:#0a2540;background:rgba(102,126,234,.12);padding:8px 12px;border-radius:14px">ROI</a>
          <a href="cpa-calculator.html" style="text-decoration:none;color:#0a2540;background:rgba(102,126,234,.12);padding:8px 12px;border-radius:14px">CPA</a>
          <a href="budget-planner.html" style="text-decoration:none;color:#0a2540;background:rgba(102,126,234,.12);padding:8px 12px;border-radius:14px">الميزانية</a>
          <a href="cvr-calculator.html" style="text-decoration:none;color:#0a2540;background:rgba(102,126,234,.12);padding:8px 12px;border-radius:14px">CVR</a>
          <a href="ctr-calculator.html" style="text-decoration:none;color:#0a2540;background:rgba(102,126,234,.12);padding:8px 12px;border-radius:14px">CTR</a>
          <a href="profit-margin-calculator.html" style="text-decoration:none;color:#0a2540;background:rgba(102,126,234,.12);padding:8px 12px;border-radius:14px">الربح</a>
          <a href="utm-generator.html" style="text-decoration:none;color:#0a2540;background:rgba(102,126,234,.12);padding:8px 12px;border-radius:14px">UTM</a>
          <a href="whatsapp-generator.html" style="text-decoration:none;color:#0a2540;background:rgba(102,126,234,.12);padding:8px 12px;border-radius:14px">واتساب</a>
          <a href="social-content-planner.html" style="text-decoration:none;color:#0a2540;background:rgba(102,126,234,.12);padding:8px 12px;border-radius:14px">محتوى</a>
          <a href="all-tools.html" style="text-decoration:none;color:#0a2540;background:rgba(16,185,129,.14);padding:8px 12px;border-radius:14px;font-weight:700">كل الأدوات</a>
        </nav>
        <div style="margin-inline-start:auto;display:flex;gap:8px">
          <a href="https://arabsad.com" target="_blank" rel="noopener" style="text-decoration:none;background:rgba(0,0,0,.06);padding:8px 12px;border-radius:12px;color:#0a2540">🌐 الموقع</a>
          <a href="https://wa.me/201110760081?text=أريد%20استشارة%20مجانية" target="_blank" rel="noopener" style="text-decoration:none;background:#10b981;color:#fff;padding:8px 12px;border-radius:12px">📱 واتساب</a>
        </div>
      </div>
    </div>`;

  // لا تُضيف في الصفحة الرئيسية (تحتوي بالفعل على تنقّل)
  if (!/index\.html?$/.test(location.pathname)) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = navHTML;
    document.body.prepend(wrapper.firstElementChild);
  }
})();
