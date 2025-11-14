/**
 * 🔇 فلتر أخطاء إضافات المتصفح
 * Browser Extensions Error Filter
 * 
 * يتجاهل الأخطاء الناتجة عن إضافات المتصفح ويضمن عمل الموقع بسلاسة
 * 
 * @version 1.0.0
 * @author Sherif Salama - sherow1982
 */

(function() {
    'use strict';
    
    console.log('🔇 Extension Error Filter initializing...');
    
    // 📋 قائمة أنماط أخطاء الإضافات المعروفة
    const EXTENSION_ERROR_PATTERNS = [
        'runtime.lastError',
        'extension port',
        'back/forward cache',
        'chrome-extension://',
        'moz-extension://',
        'safari-extension://',
        'Extension context invalidated',
        'message channel is closed',
        'Could not establish connection',
        'Extension manifest',
        'chrome.runtime',
        'browser.runtime'
    ];
    
    // 🎯 فلتر الأخطاء من Console
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    console.error = function(...args) {
        const message = args.join(' ');
        
        // تحقق إذا كان الخطأ من إضافة
        const isExtensionError = EXTENSION_ERROR_PATTERNS.some(pattern => 
            message.includes(pattern)
        );
        
        if (isExtensionError) {
            // تجاهل أخطاء الإضافات - لا تعرضها
            return;
        }
        
        // عرض الأخطاء الحقيقية فقط
        originalConsoleError.apply(console, args);
    };
    
    console.warn = function(...args) {
        const message = args.join(' ');
        
        const isExtensionError = EXTENSION_ERROR_PATTERNS.some(pattern => 
            message.includes(pattern)
        );
        
        if (isExtensionError) {
            return;
        }
        
        originalConsoleWarn.apply(console, args);
    };
    
    // 🛡️ معالج أخطاء window.error
    const originalErrorHandler = window.onerror;
    
    window.onerror = function(message, source, lineno, colno, error) {
        const errorMessage = message ? message.toString() : '';
        
        // تحقق إذا كان من إضافة
        const isExtensionError = EXTENSION_ERROR_PATTERNS.some(pattern => 
            errorMessage.includes(pattern) || (source && source.includes(pattern))
        );
        
        if (isExtensionError) {
            // تجاهل أخطاء الإضافات
            return true; // منع العرض الافتراضي
        }
        
        // معالجة الأخطاء الحقيقية
        if (originalErrorHandler) {
            return originalErrorHandler.call(this, message, source, lineno, colno, error);
        }
        
        return false;
    };
    
    // 🚫 معالج unhandledrejection
    const originalRejectionHandler = window.onunhandledrejection;
    
    window.addEventListener('unhandledrejection', function(event) {
        const reason = event.reason ? event.reason.toString() : '';
        
        const isExtensionError = EXTENSION_ERROR_PATTERNS.some(pattern => 
            reason.includes(pattern)
        );
        
        if (isExtensionError) {
            // تجاهل ومنع العرض
            event.preventDefault();
            return;
        }
        
        // معالجة الرفض الحقيقي
        if (originalRejectionHandler) {
            originalRejectionHandler.call(this, event);
        }
    });
    
    // 🧹 تنظيف أخطاء Chrome Runtime
    if (typeof chrome !== 'undefined' && chrome.runtime) {
        const originalSendMessage = chrome.runtime.sendMessage;
        
        chrome.runtime.sendMessage = function(...args) {
            try {
                return originalSendMessage.apply(this, args);
            } catch (e) {
                // تجاهل أخطاء الإضافات بصمت
                return Promise.resolve();
            }
        };
    }
    
    // 📊 تقرير الإحصائيات
    let filteredErrors = 0;
    
    window.ExtensionFilter = {
        getStats: () => ({
            filteredErrors,
            patterns: EXTENSION_ERROR_PATTERNS.length,
            version: '1.0.0'
        }),
        
        addPattern: (pattern) => {
            if (!EXTENSION_ERROR_PATTERNS.includes(pattern)) {
                EXTENSION_ERROR_PATTERNS.push(pattern);
                console.log(`✅ Added new extension error pattern: ${pattern}`);
            }
        },
        
        clearStats: () => {
            filteredErrors = 0;
        }
    };
    
    console.log('✅ Extension Error Filter v1.0.0 activated');
    console.log(`📋 Filtering ${EXTENSION_ERROR_PATTERNS.length} extension error patterns`);
    console.log('🛡️ Your site will now work smoothly with any browser extensions!');
    
})();
