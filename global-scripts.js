// Global Analytics and Utilities for Arabic Ads Tools

// Analytics tracking functions
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

function trackCalculation(toolName, inputData, result) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'calculation_completed', {
      event_category: 'Calculator',
      event_label: toolName,
      tool_name: toolName.toLowerCase().replace(/\s+/g, '_'),
      calculation_result: JSON.stringify(result)
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

function trackWhatsAppContact(source) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'whatsapp_contact', {
      event_category: 'Contact',
      event_label: source || 'Unknown',
      contact_method: 'whatsapp'
    });
  }
}

// Unified WhatsApp Integration
function initWhatsAppContact() {
  const whatsappBtn = document.getElementById('whatsappBtn') || document.querySelector('.unified-whatsapp-float');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const toolName = document.title.split('|')[0].trim();
      const message = `أريد استشارة مجانية عن: ${toolName}`;
      const url = `https://wa.me/201110760081?text=${encodeURIComponent(message)}`;
      
      trackWhatsAppContact(toolName);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
}

// Unified Back to Top
function initBackToTop() {
  const backToTop = document.getElementById('backToTop') || document.querySelector('.unified-back-to-top');
  if (backToTop) {
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
}

// Unified Form Validation
function validateForm(formData) {
  for (const [key, value] of Object.entries(formData)) {
    if (!value || value === '' || isNaN(value)) {
      return { isValid: false, message: `يرجى إدخال ${key} صحيح` };
    }
    if (parseFloat(value) < 0) {
      return { isValid: false, message: `${key} لا يمكن أن يكون سالباً` };
    }
  }
  return { isValid: true };
}

// Format Numbers in Arabic
function formatArabicNumber(number, decimals = 2, suffix = '') {
  if (isNaN(number)) return '0';
  
  const formatted = parseFloat(number).toFixed(decimals);
  return formatted.toLocaleString('ar-SA') + (suffix ? ' ' + suffix : '');
}

// Show Results Animation
function showResults(resultsElementId) {
  const resultsElement = document.getElementById(resultsElementId);
  if (resultsElement) {
    resultsElement.style.display = 'block';
    resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Initialize Global Features
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all unified features
  initWhatsAppContact();
  initBackToTop();
  
  // Service Worker Registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  }
  
  // Track page view
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      content_group1: 'Arabic Ads Tools'
    });
  }
});

// PWA Install Prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show subtle install hint after 15 seconds
  setTimeout(() => {
    if (deferredPrompt) {
      const installHint = document.createElement('div');
      installHint.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #667eea;
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        animation: slideDown 0.3s ease;
      `;
      installHint.innerHTML = '📱 تثبيت الأدوات كتطبيق؟ اضغط هنا';
      
      installHint.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          
          if (typeof gtag !== 'undefined') {
            gtag('event', 'pwa_install_prompt', {
              event_category: 'PWA',
              event_label: outcome
            });
          }
          
          deferredPrompt = null;
          installHint.remove();
        }
      });
      
      document.body.appendChild(installHint);
      
      // Auto-hide after 10 seconds
      setTimeout(() => {
        if (installHint && installHint.parentNode) {
          installHint.remove();
        }
      }, 10000);
    }
  }, 15000);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    trackToolUsage,
    trackCalculation,
    trackButtonClick,
    trackWhatsAppContact,
    validateForm,
    formatArabicNumber,
    showResults
  };
}