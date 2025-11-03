const CACHE_NAME = 'arabic-ads-tools-v2.2';
const urlsToCache = [
  './',
  './index.html',
  './tools/market-research-advisor.html',
  './data/ad-strategy.json',
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
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// تثبيت Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('تم فتح الذاكرة المؤقتة مع أداة الإعلانات الذكية');
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
  notifyClientsOfUpdate();
});

// التعامل مع الطلبات مع تحديث ذكي للبيانات
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // إذا وُجد في الكاش، أرجعه مع فحص التحديث في الخلفية
        if (response) {
          // للملفات الحساسة (البيانات وأداة الإعلانات)، فحص التحديث في الخلفية
          if (event.request.url.includes('/data/') || 
              event.request.url.includes('market-research-advisor.html') ||
              event.request.url.includes('alerts.json')) {
            // تحديث صامت في الخلفية
            fetch(event.request)
              .then(fetchResponse => {
                if (fetchResponse && fetchResponse.status === 200) {
                  caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                    // إخبار الصفحات بوجود تحديث
                    broadcastUpdate(event.request.url);
                  });
                }
              })
              .catch(() => {}); // فشل صامت
          }
          return response;
        }
        
        // ليس في الكاش - جلب من الشبكة
        return fetch(event.request)
          .then(function(response) {
            // تحقق من صحة الاستجابة
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // نسخ الاستجابة للكاش
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
  );
});

// إخبار الصفحات بالتحديثات
function broadcastUpdate(url) {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'DATA_UPDATED',
        url: url,
        timestamp: new Date().toISOString()
      });
    });
  });
}

// إشعار العملاء بوجود تحديث
function notifyClientsOfUpdate() {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'SW_UPDATED',
        message: 'تم تحديث الأدوات - أعد تحميل الصفحة للحصول على آخر نسخة'
      });
    });
  });
}

// استقبال الرسائل من الصفحات الرئيسية
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // التحقق من التنبيهات الجديدة
  if (event.data && event.data.type === 'CHECK_ALERTS') {
    checkForNewAlerts();
  }
  
  // إرسال معلومات آخر تحديث
  if (event.data && event.data.type === 'GET_LAST_UPDATE') {
    getLastCommitDate().then(date => {
      event.ports[0].postMessage({
        type: 'LAST_UPDATE_DATE',
        date: date
      });
    });
  }
});

// جلب تاريخ آخر تحديث من GitHub API
async function getLastCommitDate() {
  try {
    const response = await fetch('https://api.github.com/repos/sherow1982/arabic-ads-calculator-tools/commits/main');
    if (response.ok) {
      const data = await response.json();
      return data.commit.author.date;
    }
  } catch (error) {
    console.log('فشل في جلب تاريخ التحديث:', error);
  }
  return new Date().toISOString(); // تاريخ افتراضي
}

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