/**
 * 🛡️ نظام معالجة الأخطاء الموحد - مؤسسة إعلانات العرب
 * Unified Error Handler System v1.0
 * 
 * المميزات:
 * ✅ رسائل خطأ واضحة ومفيدة للمستخدم (عربي/إنجليزي)
 * ✅ إعادة محاولة تلقائية للطلبات الفاشلة (3 مرات)
 * ✅ تسجيل شامل للأخطاء (Console + API)
 * ✅ واجهة مستخدم احترافية مع خيارات تفاعلية
 * ✅ معالجة جميع أنواع الأخطاء (شبكة، خادم، timeout، 404)
 * 
 * @author Sherif Salama - sherow1982
 * @version 1.0.0
 * @license MIT
 */

(function() {
    'use strict';
    
    // ⚙️ إعدادات النظام
    const ERROR_CONFIG = {
        API_ENDPOINT: null, // ضع هنا endpoint API لتسجيل الأخطاء (اختياري)
        SHOW_USER_ERRORS: true,
        LOG_TO_CONSOLE: true,
        RETRY_ATTEMPTS: 3,
        RETRY_DELAY: 1000,
        TIMEOUT_DURATION: 30000, // 30 ثانية
        USER_LANGUAGE: document.documentElement.lang === 'en' ? 'en' : 'ar',
        WHATSAPP_SUPPORT: '+201110760081', // رقم الدعم الفني
        VERSION: '1.0.0'
    };

    // 📝 رسائل الأخطاء - ثنائية اللغة
    const ERROR_MESSAGES = {
        ar: {
            networkError: 'فشل الاتصال بالإنترنت. تحقق من اتصالك وحاول مرة أخرى.',
            serverError: 'حدث خطأ في الخادم. نعمل على حل المشكلة.',
            notFound: 'لم يتم العثور على البيانات المطلوبة.',
            timeout: 'انتهت مهلة الطلب. يرجى المحاولة مرة أخرى.',
            unknown: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
            dataError: 'خطأ في معالجة البيانات.',
            retry: '🔄 إعادة المحاولة',
            contact: '📞 تواصل معنا',
            close: '✖ إغلاق',
            reportBug: '🐛 الإبلاغ عن خطأ'
        },
        en: {
            networkError: 'Network connection failed. Check your connection and try again.',
            serverError: 'Server error occurred. We\'re working to fix it.',
            notFound: 'Requested data not found.',
            timeout: 'Request timeout. Please try again.',
            unknown: 'An unexpected error occurred. Please try again.',
            dataError: 'Data processing error.',
            retry: '🔄 Retry',
            contact: '📞 Contact Us',
            close: '✖ Close',
            reportBug: '🐛 Report Bug'
        }
    };

    // 🎨 نظام الإشعارات المرئية
    class ErrorNotification {
        static show(type, message, options = {}) {
            const lang = ERROR_CONFIG.USER_LANGUAGE;
            const messages = ERROR_MESSAGES[lang];
            const isRTL = lang === 'ar';
            
            // إزالة الإشعارات السابقة
            document.querySelectorAll('.error-notification-unified').forEach(el => el.remove());
            
            const notification = document.createElement('div');
            notification.className = 'error-notification-unified';
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'assertive');
            
            // تحديد اللون حسب النوع
            const colors = {
                network: '#e74c3c',
                server: '#e67e22',
                notFound: '#f39c12',
                timeout: '#d35400',
                unknown: '#c0392b',
                success: '#27ae60'
            };
            
            const bgColor = colors[type] || colors.unknown;
            
            notification.style.cssText = `
                position: fixed;
                top: 90px;
                ${isRTL ? 'right' : 'left'}: 20px;
                background: linear-gradient(135deg, ${bgColor}, ${bgColor}dd);
                color: white;
                padding: 20px 25px;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                z-index: 999999;
                font-family: ${isRTL ? "'Cairo', sans-serif" : "'Inter', sans-serif"};
                max-width: 420px;
                animation: slideInError 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                direction: ${isRTL ? 'rtl' : 'ltr'};
                text-align: ${isRTL ? 'right' : 'left'};
                border: 2px solid rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
            `;
            
            // بناء الأزرار
            const actionsHTML = options.showActions ? `
                <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                    ${options.onRetry ? `
                        <button class="error-retry-btn" style="
                            background: rgba(255,255,255,0.2);
                            border: 1px solid rgba(255,255,255,0.3);
                            color: white;
                            padding: 10px 18px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 0.9rem;
                            font-weight: 600;
                            transition: all 0.3s;
                            font-family: inherit;
                        ">
                            ${messages.retry}
                        </button>
                    ` : ''}
                    ${options.showContact ? `
                        <button class="error-contact-btn" style="
                            background: rgba(255,255,255,0.9);
                            border: 1px solid white;
                            color: ${bgColor};
                            padding: 10px 18px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 0.9rem;
                            font-weight: 600;
                            transition: all 0.3s;
                            font-family: inherit;
                        ">
                            ${messages.contact}
                        </button>
                    ` : ''}
                    ${options.showReport ? `
                        <button class="error-report-btn" style="
                            background: rgba(255,255,255,0.15);
                            border: 1px solid rgba(255,255,255,0.25);
                            color: white;
                            padding: 10px 18px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 0.85rem;
                            font-weight: 600;
                            transition: all 0.3s;
                            font-family: inherit;
                        ">
                            ${messages.reportBug}
                        </button>
                    ` : ''}
                </div>
            ` : '';
            
            notification.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 15px;">
                    <div style="font-size: 2.2rem; flex-shrink: 0; animation: errorIconBounce 0.6s ease-out;">
                        ${this.getIcon(type)}
                    </div>
                    <div style="flex: 1;">
                        <div style="font-size: 1.15rem; font-weight: 700; margin-bottom: 8px;">
                            ${this.getTitle(type, lang)}
                        </div>
                        <div style="font-size: 0.9rem; opacity: 0.95; line-height: 1.6;">
                            ${message}
                        </div>
                        ${actionsHTML}
                    </div>
                    <button class="error-close-btn" style="
                        background: none;
                        border: none;
                        color: rgba(255,255,255,0.7);
                        font-size: 1.6rem;
                        cursor: pointer;
                        padding: 0;
                        margin: 0;
                        line-height: 1;
                        flex-shrink: 0;
                        transition: color 0.3s;
                        width: 30px;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    " title="${messages.close}">
                        ×
                    </button>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Event Listeners
            this.setupEventListeners(notification, options);
            
            // إزالة تلقائية بعد 10 ثوان
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideOutError 0.4s ease-in forwards';
                    setTimeout(() => notification.remove(), 400);
                }
            }, 10000);
        }
        
        static setupEventListeners(notification, options) {
            const closeBtn = notification.querySelector('.error-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => notification.remove());
            }
            
            const retryBtn = notification.querySelector('.error-retry-btn');
            if (retryBtn && options.onRetry) {
                retryBtn.addEventListener('click', () => {
                    notification.remove();
                    options.onRetry();
                });
                retryBtn.addEventListener('mouseover', function() {
                    this.style.background = 'rgba(255,255,255,0.3)';
                });
                retryBtn.addEventListener('mouseout', function() {
                    this.style.background = 'rgba(255,255,255,0.2)';
                });
            }
            
            const contactBtn = notification.querySelector('.error-contact-btn');
            if (contactBtn) {
                contactBtn.addEventListener('click', () => {
                    const msg = encodeURIComponent('مرحباً، أواجه مشكلة في أدوات الإعلانات');
                    window.open(`https://wa.me/${ERROR_CONFIG.WHATSAPP_SUPPORT}?text=${msg}`, '_blank');
                });
                contactBtn.addEventListener('mouseover', function() {
                    this.style.background = 'white';
                    this.style.transform = 'translateY(-2px)';
                });
                contactBtn.addEventListener('mouseout', function() {
                    this.style.background = 'rgba(255,255,255,0.9)';
                    this.style.transform = 'translateY(0)';
                });
            }
            
            const reportBtn = notification.querySelector('.error-report-btn');
            if (reportBtn) {
                reportBtn.addEventListener('click', () => {
                    window.open('https://github.com/sherow1982/arabic-ads-calculator-tools/issues/new', '_blank');
                });
                reportBtn.addEventListener('mouseover', function() {
                    this.style.background = 'rgba(255,255,255,0.25)';
                });
                reportBtn.addEventListener('mouseout', function() {
                    this.style.background = 'rgba(255,255,255,0.15)';
                });
            }
        }
        
        static getIcon(type) {
            const icons = {
                network: '📡',
                server: '🔴',
                notFound: '🔍',
                timeout: '⏱️',
                unknown: '❌',
                success: '✅'
            };
            return icons[type] || icons.unknown;
        }
        
        static getTitle(type, lang) {
            const titles = {
                ar: {
                    network: '⚠️ مشكلة في الاتصال',
                    server: '🔴 خطأ في الخادم',
                    notFound: '🔍 غير موجود',
                    timeout: '⏱️ انتهت المهلة',
                    unknown: '❌ حدث خطأ',
                    success: '✅ تم بنجاح'
                },
                en: {
                    network: '⚠️ Connection Problem',
                    server: '🔴 Server Error',
                    notFound: '🔍 Not Found',
                    timeout: '⏱️ Timeout',
                    unknown: '❌ Error Occurred',
                    success: '✅ Success'
                }
            };
            return titles[lang][type] || titles[lang].unknown;
        }
    }

    // 🔄 نظام إعادة المحاولة الذكي
    class RetryHandler {
        static async retry(fn, attempts = ERROR_CONFIG.RETRY_ATTEMPTS) {
            for (let i = 0; i < attempts; i++) {
                try {
                    return await fn();
                } catch (error) {
                    if (i === attempts - 1) throw error;
                    
                    const delay = ERROR_CONFIG.RETRY_DELAY * (i + 1);
                    console.log(`🔄 إعادة المحاولة ${i + 1}/${attempts} بعد ${delay}ms...`);
                    await this.delay(delay);
                }
            }
        }
        
        static delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }

    // 📊 نظام تسجيل الأخطاء
    class ErrorLogger {
        static async log(error, context = {}) {
            const errorData = {
                message: error.message || 'Unknown error',
                stack: error.stack || '',
                type: error.name || 'Error',
                url: window.location.href,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                context: context,
                language: ERROR_CONFIG.USER_LANGUAGE,
                version: ERROR_CONFIG.VERSION
            };
            
            // تسجيل في Console
            if (ERROR_CONFIG.LOG_TO_CONSOLE) {
                console.group('🛡️ Error Handler - Log Entry');
                console.error('Error:', error);
                console.table({
                    'Type': errorData.type,
                    'Message': errorData.message,
                    'URL': errorData.url,
                    'Time': errorData.timestamp
                });
                if (context && Object.keys(context).length > 0) {
                    console.log('Context:', context);
                }
                console.groupEnd();
            }
            
            // إرسال للـ API (إن وُجد)
            if (ERROR_CONFIG.API_ENDPOINT) {
                try {
                    await fetch(ERROR_CONFIG.API_ENDPOINT, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(errorData)
                    });
                    console.log('✅ Error logged to API successfully');
                } catch (e) {
                    console.warn('⚠️ Failed to send error log to API:', e);
                }
            }
            
            return errorData;
        }
    }

    // 🌐 معالج Fetch الآمن مع إدارة شاملة للأخطاء
    class SafeFetch {
        static async fetch(url, options = {}, context = '') {
            const lang = ERROR_CONFIG.USER_LANGUAGE;
            const messages = ERROR_MESSAGES[lang];
            
            try {
                const response = await RetryHandler.retry(async () => {
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(), ERROR_CONFIG.TIMEOUT_DURATION);
                    
                    try {
                        const res = await fetch(url, {
                            ...options,
                            signal: controller.signal
                        });
                        clearTimeout(timeout);
                        return res;
                    } catch (e) {
                        clearTimeout(timeout);
                        throw e;
                    }
                });
                
                // معالجة حالات HTTP
                if (!response.ok) {
                    let errorType = 'server';
                    let errorMessage = messages.serverError;
                    
                    if (response.status === 404) {
                        errorType = 'notFound';
                        errorMessage = messages.notFound;
                    } else if (response.status >= 500) {
                        errorType = 'server';
                        errorMessage = messages.serverError;
                    }
                    
                    const error = new Error(errorMessage);
                    error.status = response.status;
                    error.type = errorType;
                    throw error;
                }
                
                console.log(`✅ Fetch successful: ${url}`);
                return response;
                
            } catch (error) {
                // تحديد نوع الخطأ
                let errorType = 'unknown';
                let errorMessage = messages.unknown;
                
                if (error.name === 'AbortError') {
                    errorType = 'timeout';
                    errorMessage = messages.timeout;
                } else if (!navigator.onLine || error.message.includes('Failed to fetch')) {
                    errorType = 'network';
                    errorMessage = messages.networkError;
                } else if (error.type) {
                    errorType = error.type;
                    errorMessage = error.message;
                }
                
                // تسجيل الخطأ
                await ErrorLogger.log(error, { 
                    url, 
                    context,
                    errorType,
                    options: JSON.stringify(options)
                });
                
                // عرض إشعار للمستخدم
                if (ERROR_CONFIG.SHOW_USER_ERRORS) {
                    ErrorNotification.show(errorType, errorMessage, {
                        showActions: true,
                        onRetry: () => this.fetch(url, options, context),
                        showContact: errorType === 'server' || errorType === 'unknown',
                        showReport: true
                    });
                }
                
                throw error;
            }
        }
    }

    // 🌍 معالج الأخطاء العام
    window.addEventListener('error', async function(event) {
        await ErrorLogger.log(event.error || new Error(event.message), {
            type: 'uncaught_error',
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
        });
    });

    window.addEventListener('unhandledrejection', async function(event) {
        await ErrorLogger.log(event.reason, {
            type: 'unhandled_rejection',
            promise: event.promise
        });
        event.preventDefault();
    });

    // 🎨 إضافة CSS Animations
    if (!document.querySelector('#error-handler-styles-unified')) {
        const style = document.createElement('style');
        style.id = 'error-handler-styles-unified';
        style.textContent = `
            @keyframes slideInError {
                from { 
                    transform: translateX(-120%); 
                    opacity: 0; 
                }
                to { 
                    transform: translateX(0); 
                    opacity: 1; 
                }
            }
            
            @keyframes slideOutError {
                from { 
                    transform: translateX(0); 
                    opacity: 1; 
                }
                to { 
                    transform: translateX(-120%); 
                    opacity: 0; 
                }
            }
            
            @keyframes errorIconBounce {
                0% { transform: scale(0) rotate(-45deg); }
                50% { transform: scale(1.2) rotate(5deg); }
                100% { transform: scale(1) rotate(0deg); }
            }
            
            .error-notification-unified {
                font-family: inherit !important;
            }
            
            @media (max-width: 768px) {
                .error-notification-unified {
                    left: 10px !important;
                    right: 10px !important;
                    max-width: calc(100% - 20px) !important;
                    top: 70px !important;
                }
            }
            
            @media (prefers-reduced-motion: reduce) {
                .error-notification-unified {
                    animation: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 📤 تصدير عام للواجهة البرمجية
    window.ErrorHandler = {
        // الوظائف الأساسية
        notify: ErrorNotification.show.bind(ErrorNotification),
        safeFetch: SafeFetch.fetch.bind(SafeFetch),
        log: ErrorLogger.log.bind(ErrorLogger),
        retry: RetryHandler.retry.bind(RetryHandler),
        
        // الإعدادات
        config: ERROR_CONFIG,
        
        // المساعدات
        showSuccess: (message) => {
            ErrorNotification.show('success', message, { showActions: false });
        },
        
        showError: (message, options = {}) => {
            ErrorNotification.show('unknown', message, options);
        },
        
        // معلومات
        version: ERROR_CONFIG.VERSION
    };

    console.log(`✅ Error Handler System v${ERROR_CONFIG.VERSION} initialized for Arabic Ads Calculator Tools`);
    console.log('📝 Use: window.ErrorHandler.safeFetch(url) for safe HTTP requests');
    console.log('📝 Use: window.ErrorHandler.notify(type, message, options) for custom notifications');

})();
