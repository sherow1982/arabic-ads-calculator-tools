// نظام النشر الأوتوماتيكي للروابط القصيرة والجميلة
// يتم استدعاؤه من مدير الروابط الذكي لإنشاء ونشر الملفات تلقائياً

class SmartUrlPublisher {
    constructor() {
        this.baseUrl = 'https://sherow1982.github.io/arabic-ads-calculator-tools';
        this.githubApi = 'https://api.github.com/repos/sherow1982/arabic-ads-calculator-tools';
        this.owner = 'sherow1982';
        this.repo = 'arabic-ads-calculator-tools';
    }

    // إنشاء HTML لإعادة التوجيه
    createRedirectHtml(targetUrl, code, type = 'short') {
        const title = type === 'short' ? `رابط قصير ${code}` : `رابط جميل ${code}`;
        const description = type === 'short' 
            ? `رابط قصير يعيد التوجيه تلقائياً - كود ${code}`
            : `رابط جميل وصديق لمحركات البحث - ${code}`;

        return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="1;url=${targetUrl}">
    <title>${title} - إعادة توجيه</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${targetUrl}">
    <meta name="robots" content="index,follow">
    
    <!-- SEO Tags -->
    <meta property="og:url" content="${targetUrl}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    
    <style>
        body {
            font-family: 'Cairo', Arial, sans-serif;
            background: linear-gradient(135deg, #4f46e5, #7c3aed, #db2777);
            color: white; text-align: center; padding: 0; margin: 0;
            display: flex; align-items: center; justify-content: center;
            min-height: 100vh;
        }
        .container {
            max-width: 500px; padding: 2rem;
            background: rgba(255,255,255,0.1); backdrop-filter: blur(15px);
            border-radius: 20px; border: 1px solid rgba(255,255,255,0.2);
        }
        h1 { font-size: 2rem; margin-bottom: 1rem; }
        .code { color: #fbbf24; font-weight: bold; font-size: 1.2rem; }
        .btn {
            display: inline-block; background: rgba(255,255,255,0.9);
            color: #4f46e5; padding: 1rem 2rem; border-radius: 25px;
            text-decoration: none; font-weight: 600; margin: 1rem;
            transition: all 0.3s ease;
        }
        .btn:hover {
            background: white; transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }
        .spinner {
            width: 40px; height: 40px; margin: 0 auto 1rem;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white; border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <h1>🚀 جاري إعادة التوجيه</h1>
        <p>رمز الرابط: <span class="code">${code}</span></p>
        <p>سيتم التوجيه تلقائياً خلال ثانية واحدة...</p>
        
        <a href="${targetUrl}" class="btn">
            🔗 اضغط للتوجيه الفوري
        </a>
        
        <div style="margin-top: 2rem; font-size: 0.9rem; opacity: 0.8;">
            🇪🇬 مختصر الروابط العربي | مجاني 100% | آمن وسريع
        </div>
    </div>
    
    <script>
        // إعادة توجيه تلقائية
        setTimeout(() => {
            window.location.href = '${targetUrl}';
        }, 1000);
        
        // إعادة توجيه عند النقر في أي مكان
        document.addEventListener('click', () => {
            window.location.href = '${targetUrl}';
        });
        
        // تتبع الإحصائيات (اختياري)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'short_url_click', {
                'short_code': '${code}',
                'target_url': '${targetUrl}',
                'redirect_type': '${type}'
            });
        }
    </script>
</body>
</html>`;
    }

    // إنشاء slug جميل من الرابط
    createSlug(url) {
        try {
            const urlObj = new URL(url);
            const params = new URLSearchParams(urlObj.search);
            
            // استخراج النص المفيد
            let text = params.get('name') || params.get('title') || params.get('q') || 
                      urlObj.pathname.split('/').filter(p => p && p.length > 2).pop() || 'item';
            
            // تنظيف وتجميل النص العربي/الإنجليزي
            text = decodeURIComponent(text)
                .replace(/[\u0000-\u001F\u007F]/g, '') // إزالة أحرف التحكم
                .replace(/[^\u0600-\u06FFa-zA-Z0-9\s\-]/g, '-') // إبقاء العربي والإنجليزي والأرقام
                .replace(/\s+/g, '-') // المسافات إلى شرطات
                .replace(/-+/g, '-') // توحيد الشرطات المتعددة
                .replace(/^-|-$/g, '') // إزالة الشرطات من البداية والنهاية
                .substring(0, 60); // تحديد الطول الأقصى
            
            return text || 'item';
        } catch {
            return 'item-' + Date.now().toString(36);
        }
    }

    // معالجة مجموعة من الروابط
    async processUrls(urls, mode = 'both') {
        const results = [];
        const seen = new Set();
        let index = 1;

        for (const originalUrl of urls) {
            const normalized = this.normalizeUrl(originalUrl);
            
            if (seen.has(normalized) || !this.isValidUrl(normalized)) {
                continue;
            }
            seen.add(normalized);

            const shortCode = `k${index}`;
            const slug = this.createSlug(normalized);
            
            const result = {
                index,
                original: originalUrl,
                normalized,
                shortCode,
                shortUrl: `${this.baseUrl}/s.html?to=${shortCode}`,
                slug,
                prettyUrl: `${this.baseUrl}/${slug}`,
                files: []
            };

            // إنشاء ملفات HTML حسب الوضع المحدد
            if (mode === 'shorten' || mode === 'both') {
                result.files.push({
                    type: 'short',
                    path: `${shortCode}.html`,
                    content: this.createRedirectHtml(normalized, shortCode, 'short'),
                    url: `${this.baseUrl}/${shortCode}`
                });
            }

            if (mode === 'beautify' || mode === 'both') {
                result.files.push({
                    type: 'pretty',
                    path: `${slug}/index.html`,
                    content: this.createRedirectHtml(normalized, slug, 'pretty'),
                    url: result.prettyUrl
                });
            }

            results.push(result);
            index++;
        }

        return results;
    }

    // تطبيع الروابط
    normalizeUrl(url) {
        url = url.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        try {
            const urlObj = new URL(url);
            // تنظيف المسار
            let pathname = urlObj.pathname.replace(/\/\.\/+/g, '/').replace(/\/+/g, '/');
            return `${urlObj.protocol}//${urlObj.host}${pathname}${urlObj.search}${urlObj.hash}`;
        } catch {
            return url;
        }
    }

    // التحقق من صحة الرابط
    isValidUrl(url) {
        try {
            const parsed = new URL(url);
            return parsed.protocol === 'http:' || parsed.protocol === 'https:';
        } catch {
            return false;
        }
    }

    // تحديث قاعدة البيانات JSON
    generateUpdatedDatabase(results) {
        const linkDb = {
            meta: {
                version: "3.0.0",
                created: "2025-11-03T09:00:00Z",
                description: "قاعدة بيانات الروابط القصيرة والجميلة - تم التحديث تلقائياً",
                total_links: results.length + 8,
                last_updated: new Date().toISOString(),
                generator: "Smart URL Manager v3.0"
            },
            links: {
                // الروابط الأساسية الموجودة
                "1": { url: "https://arabsad.com", title: "الموقع الرسمي", category: "main", status: "active" },
                "2": { url: "https://sherow1982.github.io/arabic-ads-calculator-tools/", title: "الصفحة الرئيسية", category: "tools", status: "active" },
                "demo": { url: "https://sherow1982.github.io/arabic-ads-calculator-tools/", title: "عرض توضيحي", category: "demo", status: "active" },
                "test": { url: "https://www.google.com", title: "رابط اختبار", category: "test", status: "active" },
                "tools": { url: "https://sherow1982.github.io/arabic-ads-calculator-tools/tools-directory.html", title: "دليل الأدوات", category: "tools", status: "active" },
                "fb": { url: "https://facebook.com/arabads.me", title: "صفحة فيسبوك", category: "social", status: "active" },
                "wa": { url: "https://wa.me/201110760081", title: "واتساب الدعم", category: "support", status: "active" }
            }
        };

        // إضافة النتائج الجديدة
        results.forEach(result => {
            linkDb.links[result.shortCode] = {
                url: result.normalized,
                title: result.slug.replace(/-/g, ' '),
                created: new Date().toISOString(),
                clicks: 0,
                status: "active",
                category: "auto-generated",
                slug: result.slug,
                prettyUrl: result.prettyUrl,
                originalUrl: result.original
            };
        });

        return linkDb;
    }

    // توليد ملف URLs.txt للفهرسة
    generateIndexingFile(results) {
        let content = `# ملف الروابط للفهرسة التلقائية على جوجل
# تم إنشاؤه بواسطة مدير الروابط الذكي
# التاريخ: ${new Date().toLocaleDateString('ar-SA')}

# الصفحات الرئيسية
https://sherow1982.github.io/arabic-ads-calculator-tools/
https://sherow1982.github.io/arabic-ads-calculator-tools/tools/smart-url-manager.html
https://sherow1982.github.io/arabic-ads-calculator-tools/s.html

# الروابط القصيرة الجديدة
`;

        results.forEach(result => {
            content += `${result.shortUrl}\n`;
            if (result.prettyUrl) {
                content += `${result.prettyUrl}\n`;
            }
        });

        return content;
    }

    // معاينة النتائج قبل النشر
    previewResults(results) {
        console.log('نتائج المعالجة:', {
            total: results.length,
            shortUrls: results.map(r => r.shortUrl),
            prettyUrls: results.map(r => r.prettyUrl),
            files: results.reduce((total, r) => total + r.files.length, 0)
        });
        
        return {
            totalUrls: results.length,
            shortUrls: results.map(r => r.shortUrl),
            prettyUrls: results.map(r => r.prettyUrl),
            filesToCreate: results.reduce((total, r) => total + r.files.length, 0),
            database: this.generateUpdatedDatabase(results),
            indexingFile: this.generateIndexingFile(results)
        };
    }
}

// تصدير للاستخدام العام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartUrlPublisher;
} else {
    // للاستخدام في المتصفح
    window.SmartUrlPublisher = SmartUrlPublisher;
}

// مثال للاستخدام:
// const publisher = new SmartUrlPublisher();
// const results = await publisher.processUrls(['https://example.com'], 'both');
// const preview = publisher.previewResults(results);