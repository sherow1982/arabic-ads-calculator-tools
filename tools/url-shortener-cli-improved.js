#!/usr/bin/env node

/**
 * نسخة محسّنة من مختصر الروابط CLI
 * تنشئ ملفات HTML فردية بدلاً من GitHub Issues
 * 
 * Improved URL Shortener CLI
 * Creates individual HTML files instead of GitHub Issues
 * 
 * Usage: node url-shortener-cli-improved.js <xlsx-file-path> [base-url]
 * Example: node url-shortener-cli-improved.js urls.xlsx "https://mysite.github.io/myrepo"
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Configuration
const CONFIG = {
    MAX_URLS: 1000,
    OUTPUT_DIR: 'short-urls-output',
    BASE_URL_DEFAULT: 'https://yourusername.github.io/yourrepo'
};

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
    log(`❌ Error: ${message}`, 'red');
}

function logSuccess(message) {
    log(`✅ ${message}`, 'green');
}

function logInfo(message) {
    log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
    log(`⚠️  ${message}`, 'yellow');
}

// Validate URL format
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Read URLs from XLSX file
function readUrlsFromXLSX(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        logInfo(`Reading XLSX file: ${filePath}`);
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        if (data.length === 0) {
            throw new Error('XLSX file is empty or has no data');
        }

        // Extract URLs from various possible column names
        const urls = data.map(row => {
            const url = row['original_url'] || 
                       row['Original URL'] || 
                       row['url'] || 
                       row['URL'] || 
                       row['الرابط الأصلي'] ||
                       row['الرابط'] ||
                       Object.values(row)[0];
            
            return {
                url: typeof url === 'string' ? url.trim() : '',
                note: row['note'] || row['Note'] || row['ملاحظة'] || ''
            };
        }).filter(item => item.url && isValidUrl(item.url));

        logInfo(`Found ${urls.length} valid URLs in XLSX file`);
        return urls;

    } catch (error) {
        logError(`Failed to read XLSX file: ${error.message}`);
        process.exit(1);
    }
}

// Generate HTML content for redirect page
function generateHtmlContent(originalUrl, shortCode, baseUrl) {
    const shortUrl = `${baseUrl}/${shortCode}`;
    
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="1;url=${originalUrl}">
    <title>جاري إعادة التوجيه إلى ${originalUrl.substring(0, 50)}...</title>
    <link rel="canonical" href="${originalUrl}">
    <meta name="description" content="رابط قصير يعيد التوجيه تلقائياً إلى ${originalUrl}">
    
    <style>
        body {
            font-family: 'Cairo', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0; padding: 0; display: flex;
            justify-content: center; align-items: center;
            min-height: 100vh; color: white; text-align: center;
        }
        .container { max-width: 600px; padding: 2rem; }
        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%; border-top: 4px solid white;
            width: 50px; height: 50px;
            animation: spin 1s linear infinite;
            margin: 0 auto 1.5rem;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .url-preview {
            background: rgba(255, 255, 255, 0.1);
            padding: 1.5rem; border-radius: 15px;
            margin: 1.5rem 0; word-break: break-all; 
            font-size: 0.95rem; line-height: 1.4;
        }
        .manual-link {
            display: inline-block; background: rgba(255, 255, 255, 0.2);
            color: white; padding: 1rem 2rem; border-radius: 30px;
            text-decoration: none; margin-top: 1.5rem; font-weight: 600;
            transition: all 0.3s ease; font-size: 1.1rem;
        }
        .manual-link:hover { 
            background: rgba(255, 255, 255, 0.3); color: white;
            transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .stats {
            display: flex; justify-content: center; gap: 2rem;
            margin: 2rem 0; flex-wrap: wrap;
        }
        .stat-item {
            background: rgba(255, 255, 255, 0.15);
            padding: 1rem 1.5rem; border-radius: 15px;
            text-align: center; backdrop-filter: blur(10px);
        }
        .stat-number { font-size: 1.8rem; font-weight: 800; }
        .stat-label { font-size: 0.9rem; opacity: 0.9; margin-top: 0.5rem; }
    </style>
    
    <script>
        // Analytics tracking if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'short_url_redirect', {
                'short_code': '${shortCode}',
                'original_url': '${originalUrl}',
                'short_url': '${shortUrl}',
                'user_agent': navigator.userAgent,
                'timestamp': new Date().toISOString()
            });
        }
    </script>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <h1 style="font-size: 2.2rem; margin-bottom: 1rem;">🚀 جاري إعادة التوجيه...</h1>
        
        <div class="stats">
            <div class="stat-item">
                <div class="stat-number">#${shortCode}</div>
                <div class="stat-label">الرابط القصير</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">1ث</div>
                <div class="stat-label">زمن التوجيه</div>
            </div>
        </div>
        
        <p style="font-size: 1.2rem; margin-bottom: 1rem; opacity: 0.95;">
            سيتم توجيهك تلقائياً خلال ثانية واحدة...
        </p>
        
        <div class="url-preview">
            <strong style="font-size: 1.1rem;">🎯 الوجهة:</strong><br>
            <span style="font-weight: 600; color: #fbbf24;">${originalUrl}</span>
        </div>
        
        <a href="${originalUrl}" class="manual-link">
            🔗 اضغط هنا إذا لم يتم التوجيه تلقائياً
        </a>
        
        <div style="margin-top: 2.5rem; font-size: 0.85rem; opacity: 0.75; line-height: 1.4;">
            رابط قصير من 🇦🇭 <strong>أدوات الإعلانات العربية</strong><br>
            مجاني 100% | بدون أطراف ثالثة | آمن وموثوق
        </div>
    </div>
    
    <script>
        // Multiple redirect methods for maximum compatibility
        
        // Method 1: Immediate redirect (fastest)
        setTimeout(() => {
            window.location.replace('${originalUrl}');
        }, 1200);
        
        // Method 2: Fallback redirect
        setTimeout(() => {
            window.location.href = '${originalUrl}';
        }, 2500);
        
        // Method 3: User-triggered redirect
        document.addEventListener('click', () => {
            window.location.href = '${originalUrl}';
        });
        
        // Method 4: If all else fails, show manual link prominently
        setTimeout(() => {
            if (window.location.href.includes('${shortCode}.html')) {
                const manualLink = document.querySelector('.manual-link');
                if (manualLink) {
                    manualLink.style.background = 'rgba(239, 68, 68, 0.8)';
                    manualLink.style.animation = 'pulse 1s infinite';
                    manualLink.innerHTML = '⚠️ اضغط هنا للتوجيه يدوياً';
                }
            }
        }, 5000);
    </script>
    
    <style>
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    </style>
</body>
</html>`;
}

// Create output directory
function createOutputDirectory() {
    if (fs.existsSync(CONFIG.OUTPUT_DIR)) {
        // Clear existing directory
        fs.rmSync(CONFIG.OUTPUT_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(CONFIG.OUTPUT_DIR, { recursive: true });
    logInfo(`Created output directory: ${CONFIG.OUTPUT_DIR}`);
}

// Generate HTML files
function generateHtmlFiles(urls, baseUrl) {
    const results = [];
    
    urls.forEach((urlData, index) => {
        const shortCode = index + 1;
        const filename = `${shortCode}.html`;
        const filePath = path.join(CONFIG.OUTPUT_DIR, filename);
        
        try {
            const htmlContent = generateHtmlContent(urlData.url, shortCode, baseUrl);
            fs.writeFileSync(filePath, htmlContent, 'utf8');
            
            const shortUrl = `${baseUrl}/${shortCode}`;
            
            logSuccess(`Created: ${filename} -> ${urlData.url.substring(0, 60)}${urlData.url.length > 60 ? '...' : ''}`);
            
            results.push({
                shortCode,
                filename,
                originalUrl: urlData.url,
                shortUrl,
                note: urlData.note,
                status: 'success'
            });
            
        } catch (error) {
            logError(`Failed to create ${filename}: ${error.message}`);
            results.push({
                shortCode,
                filename,
                originalUrl: urlData.url,
                shortUrl: '',
                note: urlData.note,
                status: 'failed',
                error: error.message
            });
        }
    });
    
    return results;
}

// Generate results XLSX file
function generateResultsXLSX(results) {
    try {
        const data = results.map((result, index) => ({
            '#': index + 1,
            'Filename / اسم الملف': result.filename,
            'Short Code / الرمز': result.shortCode,
            'Original URL / الرابط الأصلي': result.originalUrl,
            'Short URL / الرابط القصير': result.shortUrl,
            'Status / الحالة': result.status,
            'Note / ملاحظة': result.note || '',
            'Error / الخطأ': result.error || '',
            'Created Date / تاريخ الإنشاء': new Date().toISOString().split('T')[0]
        }));
        
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Short URLs Results');
        
        const resultsFile = path.join(CONFIG.OUTPUT_DIR, 'results.xlsx');
        XLSX.writeFile(wb, resultsFile);
        
        logSuccess(`Results saved to: ${resultsFile}`);
        return resultsFile;
        
    } catch (error) {
        logError(`Failed to generate results XLSX: ${error.message}`);
        return null;
    }
}

// Generate README file
function generateReadme(results, baseUrl) {
    const readmeContent = `# 🔗 روابط قصيرة جاهزة للرفع

تم إنشاء **${results.length} ملف HTML** للروابط القصيرة.

## 📁 الملفات المُنشأة:

${results.map(r => `- **${r.filename}** → [الرابط القصير](${r.shortUrl})
  - الأصلي: ${r.originalUrl}
  - الحالة: ${r.status === 'success' ? '✅ نجح' : '❌ فشل'}`).join('\n\n')}

## 🚀 خطوات الرفع:

### طريقة 1: عبر واجهة GitHub
1. ادخل إلى مستودع GitHub الخاص بك
2. اضغط **"Add files"** > **"Upload files"**
3. اسحب جميع ملفات HTML إلى المنطقة
4. اضغط **"Commit changes"**
5. انتظر 2-3 دقائق لتفعيل GitHub Pages

### طريقة 2: عبر Git CLI
\`\`\`bash
cd ${CONFIG.OUTPUT_DIR}
git init
git remote add origin YOUR_REPO_URL
git add *.html
git commit -m "إضافة روابط قصيرة جديدة"
git push origin main
\`\`\`

## ✅ اختبار الروابط:

بعد الرفع، اختبر الروابط القصيرة:

${results.filter(r => r.status === 'success').map(r => `- [${r.shortUrl}](${r.shortUrl})`).join('\n')}

## 📊 الإحصائيات:

- **إجمالي الملفات**: ${results.length}
- **نجح**: ${results.filter(r => r.status === 'success').length}
- **فشل**: ${results.filter(r => r.status === 'failed').length}
- **معدل النجاح**: ${((results.filter(r => r.status === 'success').length / results.length) * 100).toFixed(1)}%

---
**أداة مختصر الروابط - مجاني 100% | صنع ب❤️ للمجتمع العربي**`;
    
    const readmePath = path.join(CONFIG.OUTPUT_DIR, 'README.md');
    fs.writeFileSync(readmePath, readmeContent, 'utf8');
    logSuccess(`README created: ${readmePath}`);
}

// Print summary
function printSummary(results, outputDir, baseUrl) {
    const successful = results.filter(r => r.status === 'success').length;
    const failed = results.filter(r => r.status === 'failed').length;
    
    log('\n' + '='.repeat(70), 'bright');
    log('📊 SUMMARY / ملخص العملية', 'bright');
    log('='.repeat(70), 'bright');
    
    log(`📁 Output directory: ${outputDir}`, 'blue');
    log(`🌍 Base URL: ${baseUrl}`, 'blue');
    log(`📄 Total files created: ${results.length}`, 'blue');
    log(`✅ Successful: ${successful}`, 'green');
    log(`❌ Failed: ${failed}`, failed > 0 ? 'red' : 'green');
    log(`🏆 Success rate: ${((successful / results.length) * 100).toFixed(1)}%`, 'cyan');
    
    if (successful > 0) {
        log('\n🎉 Next steps:', 'green');
        log('1. Upload all HTML files to your GitHub repository root', 'yellow');
        log('2. Wait 2-3 minutes for GitHub Pages to deploy', 'yellow');
        log('3. Test your short URLs!', 'yellow');
        
        log('\n🔗 Example short URLs:', 'cyan');
        results.filter(r => r.status === 'success').slice(0, 3).forEach(r => {
            log(`   ${r.shortUrl} -> ${r.originalUrl.substring(0, 50)}...`, 'blue');
        });
    }
    
    log('='.repeat(70), 'bright');
}

// Main function
function main() {
    log('🚀 Improved URL Shortener CLI - HTML Files Generator', 'bright');
    log('مختصر الروابط المحسّن - مولد ملفات HTML\n', 'bright');
    
    // Check command line arguments
    const args = process.argv.slice(2);
    if (args.length === 0) {
        logError('Please provide XLSX file path');
        log('Usage: node url-shortener-cli-improved.js <xlsx-file> [base-url]', 'yellow');
        log('Example: node url-shortener-cli-improved.js urls.xlsx "https://mysite.github.io/myrepo"', 'yellow');
        process.exit(1);
    }
    
    const xlsxFilePath = args[0];
    const baseUrl = args[1] || CONFIG.BASE_URL_DEFAULT;
    
    logInfo(`Using base URL: ${baseUrl}`);
    
    // Read URLs from XLSX
    const urls = readUrlsFromXLSX(xlsxFilePath);
    
    if (urls.length === 0) {
        logError('No valid URLs found in the XLSX file');
        process.exit(1);
    }
    
    if (urls.length > CONFIG.MAX_URLS) {
        logWarning(`File contains ${urls.length} URLs, but maximum is ${CONFIG.MAX_URLS}`);
        logWarning(`Only the first ${CONFIG.MAX_URLS} URLs will be processed`);
        urls.splice(CONFIG.MAX_URLS);
    }
    
    // Create output directory
    createOutputDirectory();
    
    // Generate HTML files
    logInfo(`Generating HTML files for ${urls.length} URLs...`);
    const startTime = Date.now();
    
    const results = generateHtmlFiles(urls, baseUrl);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(1);
    
    // Generate results file and README
    generateResultsXLSX(results);
    generateReadme(results, baseUrl);
    
    // Print summary
    printSummary(results, CONFIG.OUTPUT_DIR, baseUrl);
    
    log(`\n⏱️  Generation time: ${duration} seconds`, 'magenta');
    log('\n🎯 All files are ready for upload to GitHub!', 'green');
}

// Error handling
process.on('uncaughtException', (error) => {
    logError(`Uncaught exception: ${error.message}`);
    process.exit(1);
});

process.on('SIGINT', () => {
    log('\n\n⚠️  Process interrupted. Exiting...', 'yellow');
    process.exit(0);
});

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    CONFIG,
    generateHtmlContent,
    generateHtmlFiles,
    readUrlsFromXLSX,
    isValidUrl
};