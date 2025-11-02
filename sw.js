const CACHE_NAME = 'arabic-ads-tools-v2.1';
const urlsToCache = [
  './',
  './index.html',
  './cpc-calculator.html',
  './roi-calculator.html', 
  './cpa-calculator.html',
  './ctr-calculator.html',
  './cvr-calculator.html',
  './profit-margin-calculator.html',
  './budget-planner.html',
  './audience-calculator.html',
  './utm-generator.html',
  './whatsapp-generator.html',
  './social-content-planner.html',
  './all-tools.html',
  './about.html',
  './alerts.html',
  './alerts.json',
  './chatbot.js',
  './manifest.json',
  './favicon.svg',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// تثبيت Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('تم فتح الذاكرة المؤقتة');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// التفعيل وحذف الذاكرة القديمة
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('حذف الذاكرة القديمة:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // بدء التحقق من التنبيهات دورياً
  self.clients.claim();
  startAlertsCheck();
});

// التعامل مع الطلبات
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // إرجاع من الذاكرة إن وُجد، وإلا جلب من الشبكة
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// استقبال الرسائل من الصفحات الرئيسية
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // التحقق من التنبيهات الجديدة
  if (event.data && event.data.type === 'CHECK_ALERTS') {
    checkForNewAlerts();
  }
});

// بدء التحقق الدوري من التنبيهات
function startAlertsCheck() {
  // فحص التنبيهات كل 30 دقيقة
  setInterval(checkForNewAlerts, 1800000);
  
  // فحص فوري عند بدء التشغيل
  setTimeout(checkForNewAlerts, 5000);
}

// التحقق من التنبيهات الجديدة
function checkForNewAlerts() {
  return fetch('./alerts.json?t=' + Date.now())
    .then(response => response.json())
    .then(data => {
      if (!data || !data.items) return;
      
      // جلب آخر تنبيه شوهد
      const lastAlertSeen = localStorage.getItem('lastAlertSeen') || '';
      
      // فلترة التنبيهات الجديدة عالية الأثر فقط
      const newHighAlerts = data.items.filter(alert => {
        const isNew = alert.id !== lastAlertSeen;
        const isHighImpact = alert.impact === 'high';
        const isRecent = new Date(alert.date) > new Date(Date.now() - 24*60*60*1000); // آخر 24 ساعة
        return isNew && isHighImpact && isRecent;
      });
      
      // إرسال إشعار للتنبيهات الجديدة عالية الأثر
      if (newHighAlerts.length > 0) {
        const alert = newHighAlerts[0];
        
        if (Notification.permission === 'granted') {
          self.registration.showNotification('تحديث مهم على ' + alert.platform, {
            body: alert.title,
            icon: './favicon.svg',
            badge: './favicon.svg',
            tag: 'ads-update-' + alert.id,
            requireInteraction: true,
            vibrate: [200, 100, 200],
            actions: [
              { action: 'view', title: '👀 عرض التفاصيل', icon: './favicon.svg' },
              { action: 'dismiss', title: '❌ تجاهل', icon: './favicon.svg' }
            ],
            data: { 
              url: './alerts.html#' + alert.id,
              alertId: alert.id
            }
          });
          
          // حفظ آخر تنبيه شُوهد
          localStorage.setItem('lastAlertSeen', alert.id);
        }
      }
      
      return data;
    })
    .catch(error => {
      console.log('فشل في تحميل التنبيهات:', error);
    });
}

// التعامل مع النقر على الإشعار
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.action === 'view') {
    // فتح صفحة التنبيهات
    event.waitUntil(
      clients.openWindow(event.notification.data.url || './alerts.html')
    );
  } else if (event.action === 'dismiss') {
    // تجاهل الإشعار
    console.log('تم تجاهل الإشعار');
  } else {
    // نقر على الإشعار بدون اختيار إجراء
    event.waitUntil(
      clients.openWindow('./alerts.html')
    );
  }
});

// Background sync للتحقق من التنبيهات
self.addEventListener('sync', function(event) {
  if (event.tag === 'alerts-check') {
    event.waitUntil(checkForNewAlerts());
  }
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // إرسال أحداث التحليلات المؤجلة عند العودة للإنترنت
  return Promise.resolve();
}

// بدء فحص التنبيهات دورياً (كل 30 دقيقة)
if ('serviceWorker' in self) {
  setInterval(() => {
    checkForNewAlerts();
  }, 1800000); // 30 دقيقة
}