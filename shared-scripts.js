// السكريبت الموحد لجميع الصفحات

// تتبع الأحداث
function trackToolUsage(toolName, action, value) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: 'Calculator Tools',
      event_label: toolName,
      value: value || 1,
      tool_name: toolName.toLowerCase().replace(/\s+/g, '_')
    });
  }
}

function trackButtonClick(buttonName, toolName) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'click', {
      event_category: 'Tool Navigation',
      event_label: toolName + ' - ' + buttonName,
      tool_name: toolName.toLowerCase().replace(/\s+/g, '_')
    });
  }
}

// وظائف الواتساب
function initWhatsApp() {
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const toolName = document.title.split('|')[0].trim();
      const message = `أريد استشارة مجانية عن: ${toolName}`;
      const url = `https://wa.me/201110760081?text=${encodeURIComponent(message)}`;
      
      trackButtonClick('WhatsApp Contact', toolName);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
}

// البوت الذكي
function initChatbot() {
  const chatToggle = document.getElementById('chatbotToggle');
  const miniChat = document.getElementById('miniChatWindow');
  const closeMiniChat = document.getElementById('closeMiniChat');
  const miniChatInput = document.getElementById('miniChatInput');
  const miniChatSend = document.getElementById('miniChatSend');
  const miniChatMessages = document.getElementById('miniChatMessages');
  
  if (!chatToggle || !miniChat) return;
  
  chatToggle.addEventListener('click', () => {
    const isVisible = miniChat.style.display === 'block';
    miniChat.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
      miniChatInput.focus();
      trackButtonClick('Chatbot Open', document.title.split('|')[0].trim());
    }
  });
  
  chatToggle.addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 12px 25px rgba(102, 126, 234, 0.6)';
  });
  
  chatToggle.addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
  });
  
  if (closeMiniChat) {
    closeMiniChat.addEventListener('click', () => {
      miniChat.style.display = 'none';
    });
  }
  
  function addMiniChatMessage(text, isBot = false) {
    if (!miniChatMessages) return;
    
    const msgDiv = document.createElement('div');
    const bgColor = isBot ? '#f3f4f6' : '#667eea';
    const textColor = isBot ? '#374151' : 'white';
    const align = isBot ? 'left' : 'right';
    
    msgDiv.innerHTML = `<div style="background: ${bgColor}; color: ${textColor}; padding: 8px 12px; border-radius: 10px; margin: 8px 0; font-size: 13px; line-height: 1.4; text-align: ${align}; ${isBot ? 'margin-right: 20px;' : 'margin-left: 20px;'}">${text}</div>`;
    miniChatMessages.appendChild(msgDiv);
    miniChatMessages.scrollTop = miniChatMessages.scrollHeight;
  }
  
  function sendMiniChatMessage() {
    if (!miniChatInput) return;
    
    const message = miniChatInput.value.trim();
    if (!message) return;
    
    addMiniChatMessage(message, false);
    miniChatInput.value = '';
    
    // Track chat usage
    trackButtonClick('Chatbot Message', message.substring(0, 20));
    
    // Bot response
    setTimeout(() => {
      let response = '😊 شكراً لسؤالك!';
      
      const msg = message.toLowerCase();
      const currentTool = document.title.toLowerCase();
      
      if (msg.includes('cpc') || msg.includes('تكلفة النقرة') || msg.includes('نقرة')) {
        response = '📊 ممتاز! جرب <a href="cpc-calculator.html" style="color: #667eea; font-weight: bold;">حاسبة CPC</a> لحساب تكلفة النقرة';
      } else if (msg.includes('roi') || msg.includes('عائد') || msg.includes('استثمار')) {
        response = '📈 زين! استخدم <a href="roi-calculator.html" style="color: #10b981; font-weight: bold;">حاسبة ROI</a> لمعرفة عائد الاستثمار';
      } else if (msg.includes('cpa') || msg.includes('عميل') || msg.includes('اكتساب')) {
        response = '🎯 أكيد! <a href="cpa-calculator.html" style="color: #f59e0b; font-weight: bold;">حاسبة CPA</a> هتفيدك في حساب تكلفة العميل';
      } else if (msg.includes('ميزانية') || msg.includes('budget') || msg.includes('توزيع')) {
        response = '📊 ممتاز! <a href="budget-planner.html" style="color: #8b5cf6; font-weight: bold;">مخطط الميزانية</a> هيوزعلك فلوسك بذكاء';
      } else if (msg.includes('utm') || msg.includes('تتبع') || msg.includes('رابط')) {
        response = '🔗 زين! <a href="utm-generator.html" style="color: #06b6d4; font-weight: bold;">مولد UTM</a> لروابط تتبع احترافية';
      } else if (msg.includes('واتساب') || msg.includes('رسائل') || msg.includes('whatsapp')) {
        response = '💬 ممتاز! <a href="whatsapp-generator.html" style="color: #25d366; font-weight: bold;">مولد واتساب</a> هيعطيك رسائل جاهزة';
      } else if (msg.includes('منافسة') || msg.includes('تحليل') || msg.includes('مقارنة')) {
        response = '🔍 رائع! <a href="competition-analyzer.html" style="color: #ef4444; font-weight: bold;">محلل المنافسة</a> يقارن أداءك مع السوق';
      } else if (msg.includes('تنبيه') || msg.includes('آخر') || msg.includes('جديد')) {
        response = '🚨 شوف <a href="alerts.html" style="color: #f59e0b; font-weight: bold;">التنبيهات</a> لآخر تحديثات المنصات';
      } else if (msg.includes('مساعدة') || msg.includes('help') || msg.includes('ايه')) {
        response = '🤝 أكيد هساعدك! عندنا 18 أداة مجانية:<br><br>💰 <a href="cpc-calculator.html">CPC</a> | 📈 <a href="roi-calculator.html">ROI</a> | 🎯 <a href="cpa-calculator.html">CPA</a><br>📊 <a href="budget-planner.html">ميزانية</a> | 🔗 <a href="utm-generator.html">UTM</a> | 💬 <a href="whatsapp-generator.html">واتساب</a><br>🔍 <a href="competition-analyzer.html">منافسة</a> | 🚨 <a href="alerts.html">تنبيهات</a>';
      } else {
        // Detect current tool and suggest related tools
        if (currentTool.includes('cpc')) {
          response = 'هذي حاسبة CPC! جرب كمان <a href="roi-calculator.html" style="color: #10b981;">حاسبة ROI</a> أو <a href="budget-planner.html" style="color: #8b5cf6;">مخطط الميزانية</a>';
        } else if (currentTool.includes('roi')) {
          response = 'هذي حاسبة ROI! جرب كمان <a href="cpa-calculator.html" style="color: #f59e0b;">حاسبة CPA</a> أو <a href="competition-analyzer.html" style="color: #ef4444;">محلل المنافسة</a>';
        } else {
          response = 'تقدر تجرب أدواتنا التانية:<br><br>• <a href="./">العودة للرئيسية</a><br>• <a href="all-tools.html">عرض كل الأدوات الـ18</a><br>• <a href="alerts.html">تنبيهات المنصات</a><br>• <a href="https://wa.me/201110760081" target="_blank">تواصل معنا</a>';
        }
      }
      
      addMiniChatMessage(response, true);
    }, 1200);
  }
  
  if (miniChatSend) {
    miniChatSend.addEventListener('click', sendMiniChatMessage);
  }
  
  if (miniChatInput) {
    miniChatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMiniChatMessage();
    });
  }
}

// العودة للأعلى
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackButtonClick('Back to Top', document.title.split('|')[0].trim());
  });
}

// تفعيل Service Worker
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  }
}

// تهيئة كل شيء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  initWhatsApp();
  initChatbot();
  initBackToTop();
  initServiceWorker();
  
  // Track page view
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      content_group1: 'Arabic Ads Tools'
    });
  }
  
  // تحسين الأداء - lazy loading للصور
  const images = document.querySelectorAll('img');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
});