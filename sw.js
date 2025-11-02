// Service Worker for Arabic Ads Calculator Tools
// مؤسسة إعلانات العرب - Service Worker

const CACHE_NAME = 'arabic-ads-tools-v2025.11.02';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/cpc-calculator.html',
  '/roi-calculator.html',
  '/cpa-calculator.html',
  '/budget-planner.html',
  '/audience-calculator.html',
  '/favicon.svg',
  '/manifest.json'
];

// تثبيت Service Worker
self.addEventListener('install', (event) => {
  console.log('📦 Installing Arabic Ads Tools Service Worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching critical resources...');
        return cache.addAll(CACHE_URLS);
      })
      .then(() => {
        console.log('✅ Arabic Ads Tools cached successfully!');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Cache installation failed:', error);
      })
  );
});

// تفعيل Service Worker
self.addEventListener('activate', (event) => {
  console.log('⚙️ Activating Arabic Ads Tools Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗫 Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activated!');
        return self.clients.claim();
      })
  );
});

// استراتيجية الذاكرة المؤقتة
self.addEventListener('fetch', (event) => {
  // فقط للطلبات من نفس النطاق
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // إرجاع من الذاكرة إذا وجد
        if (response) {
          console.log('💾 Serving from cache:', event.request.url);
          return response;
        }
        
        // جلب من الشبكة وحفظ في الذاكرة
        return fetch(event.request)
          .then((response) => {
            // تأكد مر الاستجابة صالحة
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // نسخ الاستجابة للحفظ
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                console.log('💾 Adding to cache:', event.request.url);
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // عرض صفحة بديلة عند عدم وجود انترنت
            return caches.match('/')
              .then((fallbackResponse) => {
                if (fallbackResponse) {
                  return fallbackResponse;
                }
                
                // صفحة بديلة بسيطة عند عدم توفر الأنترنت
                return new Response(`
                  <!DOCTYPE html>
                  <html lang="ar" dir="rtl">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1">
                    <title>أدوات الإعلانات - وضع بدون اتصال</title>
                    <style>
                      body{font-family:system-ui;padding:40px 20px;text-align:center;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center}
                      .offline{background:rgba(255,255,255,.1);padding:40px;border-radius:20px;backdrop-filter:blur(10px)}
                      h1{margin-bottom:20px}
                      p{margin:10px 0;opacity:.9}
                      .btn{display:inline-block;background:rgba(255,255,255,.2);color:#fff;padding:12px 24px;text-decoration:none;border-radius:25px;margin-top:20px;border:2px solid rgba(255,255,255,.3)}
                    </style>
                  </head>
                  <body>
                    <div class="offline">
                      <h1>📏 وضع بدون اتصال</h1>
                      <p>أنت تتصفح بدون انترنت حالياً</p>
                      <p>الأدوات المحفوظة متاحة</p>
                      <button onclick="location.reload()" class="btn">إعادة المحاولة</button>
                    </div>
                  </body>
                  </html>
                `, {
                  headers: {
                    'Content-Type': 'text/html; charset=utf-8'
                  }
                });
              });
          });
      })
  );
});

// رسائل من الصفحة
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// تحديث الذاكرة في الخلفية
self.addEventListener('backgroundsync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync triggered');
    
    event.waitUntil(
      // تحديث الملفات المهمة
      caches.open(CACHE_NAME)
        .then(cache => {
          return Promise.all(
            CACHE_URLS.map(url => 
              fetch(url)
                .then(response => {
                  if (response.ok) {
                    return cache.put(url, response);
                  }
                })
                .catch(err => console.log('❌ Failed to update:', url))
            )
          );
        })
    );
  }
});

// إشعار المستخدم بالتحديثات
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'تحديثات جديدة متوفرة في أدوات الإعلانات',
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      vibrate: [200, 100, 200],
      tag: 'arabic-ads-update',
      requireInteraction: false,
      actions: [
        {
          action: 'open',
          title: 'فتح الأدوات',
          icon: '/favicon.svg'
        },
        {
          action: 'close',
          title: 'إغلاق',
          icon: '/favicon.svg'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification('أدوات الإعلانات', options)
    );
  }
});

// معالجة نقرات الإشعارات
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('🚀 Arabic Ads Calculator Tools Service Worker loaded successfully!');