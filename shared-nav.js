/* Shared top navigation and back button styles + markup injector with mobile sidebar */
(function(){
  const navHTML = `
    <div id="tools-topbar" dir="rtl" style="position:sticky;top:0;z-index:1000;background:rgba(255,255,255,.95);backdrop-filter:blur(8px);border-bottom:1px solid rgba(0,0,0,.06);font-family:'Cairo',system-ui,Arial,sans-serif">
      <div style="max-width:1200px;margin:0 auto;padding:10px 16px;display:flex;align-items:center;gap:10px">
        <a href="index.html" aria-label="رجوع للصفحة الرئيسية" style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;text-decoration:none;padding:8px 14px;border-radius:999px;font-weight:700">
          <span>⬅️</span><span>رجوع</span>
        </a>
        
        <!-- Desktop Navigation -->
        <nav aria-label="التنقل" style="display:flex;gap:8px;flex-wrap:wrap;margin-inline-start:8px" class="desktop-nav">
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

        <!-- Mobile Menu Button -->
        <button id="mobile-menu-btn" class="mobile-only" style="display:none;background:rgba(102,126,234,.12);border:none;padding:8px 12px;border-radius:12px;color:#0a2540;font-weight:700;margin-inline-start:auto" aria-label="فتح القائمة">
          ☰ الأدوات
        </button>

        <div class="desktop-nav" style="margin-inline-start:auto;display:flex;gap:8px">
          <a href="https://arabsad.com" target="_blank" rel="noopener" style="text-decoration:none;background:rgba(0,0,0,.06);padding:8px 12px;border-radius:12px;color:#0a2540">🌐 الموقع</a>
          <a href="https://wa.me/201110760081?text=أريد%20استشارة%20مجانية" target="_blank" rel="noopener" style="text-decoration:none;background:#10b981;color:#fff;padding:8px 12px;border-radius:12px">📱 واتساب</a>
        </div>
      </div>
    </div>
    
    <!-- Mobile Sidebar Overlay -->
    <div id="sidebar-overlay" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:1001" class="mobile-only"></div>
    
    <!-- Mobile Sidebar -->
    <div id="mobile-sidebar" style="display:none;position:fixed;top:0;right:0;width:280px;height:100%;background:#fff;z-index:1002;transform:translateX(100%);transition:transform 0.3s ease;box-shadow:-2px 0 10px rgba(0,0,0,.1)" class="mobile-only">
      <div style="padding:20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center">
        <h3 style="color:#0a2540;font-weight:800">🧰 الأدوات</h3>
        <button id="close-sidebar" style="background:none;border:none;font-size:24px;color:#64748b;cursor:pointer" aria-label="إغلاق القائمة">×</button>
      </div>
      <nav style="padding:20px">
        <div style="display:flex;flex-direction:column;gap:12px">
          <a href="index.html#tools" style="text-decoration:none;color:#0a2540;background:#f8fafc;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:8px">🏠 الصفحة الرئيسية</a>
          <a href="cpc-calculator.html" style="text-decoration:none;color:#0a2540;background:#f8fafc;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:8px">📊 حاسبة CPC</a>
          <a href="roi-calculator.html" style="text-decoration:none;color:#0a2540;background:#f8fafc;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:8px">💰 حاسبة ROI</a>
          <a href="cpa-calculator.html" style="text-decoration:none;color:#0a2540;background:#f8fafc;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:8px">🎯 حاسبة CPA</a>
          <a href="ctr-calculator.html" style="text-decoration:none;color:#0a2540;background:#f8fafc;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:8px">👆 حاسبة CTR</a>
          <a href="cvr-calculator.html" style="text-decoration:none;color:#0a2540;background:#f8fafc;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:8px">📈 حاسبة CVR</a>
          <a href="profit-margin-calculator.html" style="text-decoration:none;color:#0a2540;background:#f8fafc;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:8px">💰 هامش الربح</a>
          <a href="budget-planner.html" style="text-decoration:none;color:#0a2540;background:#f8fafc;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:8px">📈 مخطط الميزانية</a>
          <a href="utm-generator.html" style="text-decoration:none;color:#0a2540;background:#f8fafc;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:8px">🔗 مولد UTM</a>
          <a href="whatsapp-generator.html" style="text-decoration:none;color:#0a2540;background:#f8fafc;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:8px">💬 مولد واتساب</a>
          <a href="social-content-planner.html" style="text-decoration:none;color:#0a2540;background:#f8fafc;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:8px">📅 مخطط المحتوى</a>
          <a href="all-tools.html" style="text-decoration:none;color:#fff;background:linear-gradient(135deg,#667eea,#764ba2);padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:8px;font-weight:700;margin-top:8px">⭐ كل الأدوات</a>
        </div>
        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e2e8f0">
          <a href="https://arabsad.com" target="_blank" rel="noopener" style="text-decoration:none;color:#0a2540;background:#f1f5f9;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:8px;margin-bottom:8px">🌐 الموقع الرسمي</a>
          <a href="https://wa.me/201110760081?text=أريد%20استشارة%20مجانية" target="_blank" rel="noopener" style="text-decoration:none;color:#fff;background:#10b981;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:8px;font-weight:700">📱 تواصل واتساب</a>
        </div>
      </nav>
    </div>`;

  // CSS for mobile responsiveness
  const mobileCSS = `
    <style>
      @media (max-width: 768px) {
        .desktop-nav { display: none !important; }
        .mobile-only { display: block !important; }
        #mobile-sidebar.open { transform: translateX(0) !important; }
      }
      @media (min-width: 769px) {
        .mobile-only { display: none !important; }
      }
    </style>
  `;

  // لا تُضيف في الصفحة الرئيسية (تحتوي بالفعل على تنقّل)
  if (!/index\.html?$/.test(location.pathname) && !location.pathname.endsWith('/')) {
    // Add CSS first
    document.head.insertAdjacentHTML('beforeend', mobileCSS);
    
    // Add navigation HTML
    const wrapper = document.createElement('div');
    wrapper.innerHTML = navHTML;
    document.body.prepend(wrapper.firstElementChild);
    
    // Add event listeners for mobile sidebar
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const closeSidebar = document.getElementById('close-sidebar');
    
    function openSidebar() {
      sidebar.style.display = 'block';
      overlay.style.display = 'block';
      setTimeout(() => {
        sidebar.classList.add('open');
      }, 10);
      document.body.style.overflow = 'hidden';
    }
    
    function closeSidebarFn() {
      sidebar.classList.remove('open');
      setTimeout(() => {
        sidebar.style.display = 'none';
        overlay.style.display = 'none';
      }, 300);
      document.body.style.overflow = '';
    }
    
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', openSidebar);
    }
    
    if (closeSidebar) {
      closeSidebar.addEventListener('click', closeSidebarFn);
    }
    
    if (overlay) {
      overlay.addEventListener('click', closeSidebarFn);
    }
  }
})();