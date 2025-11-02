/**
 * TinyMCE عربي لمشروع أدوات حاسبة الإعلانات
 * محرر عربي متقدم للمحتوى والمقالات
 * تم إصلاح مشاكل التحميل
 */

// تحميل TinyMCE مع معالجة الأخطاء
function loadTinyMCE() {
  return new Promise((resolve, reject) => {
    if (window.tinymce) {
      console.log('✅ TinyMCE محمل مسبقاً');
      resolve();
      return;
    }
    
    console.log('🔄 جاري تحميل TinyMCE...');
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tinymce@6/tinymce.min.js';
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'origin';
    script.onload = () => {
      console.log('✅ تم تحميل TinyMCE بنجاح');
      resolve();
    };
    script.onerror = (error) => {
      console.error('❌ فشل في تحميل TinyMCE:', error);
      reject(new Error('Failed to load TinyMCE'));
    };
    document.head.appendChild(script);
  });
}

// إعداد TinyMCE لمشروع مع إصلاحات
function initCalculatorTinyMCE() {
  const config = {
    selector: 'textarea.arabic-editor, .tinymce-content',
    
    plugins: [
      'anchor', 'autolink', 'autoresize', 'autosave', 'charmap', 'code',
      'directionality', 'emoticons', 'fullscreen', 'help', 'image',
      'insertdatetime', 'link', 'lists', 'media', 'preview', 'quickbars',
      'save', 'searchreplace', 'table', 'visualblocks', 'visualchars', 'wordcount'
    ].join(' '),
    
    toolbar: [
      'undo redo | styles | bold italic underline | fontfamily fontsize',
      'forecolor backcolor | alignleft aligncenter alignright alignjustify | ltr rtl',
      'bullist numlist outdent indent | link image table | code preview fullscreen | saveCalculator'
    ].join(' | '),
    
    menubar: 'edit view insert format tools table help',
    
    // إعدادات عربية محسنة
    directionality: 'rtl',
    language: 'ar',
    language_url: false, // لتجنب مشاكل التحميل
    
    height: 400,
    min_height: 250,
    resize: 'vertical',
    
    branding: false,
    promotion: false,
    
    // حفظ تلقائي محسن
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_retention: '30m',
    
    // إعدادات المحتوى
    content_css: false,
    content_style: `
      body {
        font-family: 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.6;
        direction: rtl;
        text-align: right;
        color: #333;
        background: #fff;
        margin: 10px;
      }
      .calculator-note {
        background: #e3f2fd;
        border-right: 4px solid #2196f3;
        padding: 15px;
        margin: 10px 0;
        border-radius: 4px;
      }
      .highlight {
        background: #fff3cd;
        padding: 2px 4px;
        border-radius: 3px;
      }
      h1, h2, h3, h4, h5, h6 {
        color: #2c3e50;
        font-weight: bold;
      }
    `,
    
    style_formats: [
      {
        title: 'أنماط الحاسبة',
        items: [
          { title: 'ملاحظة حاسبة', block: 'div', classes: 'calculator-note' },
          { title: 'نص مميز', inline: 'span', classes: 'highlight' },
          { title: 'عنوان مهم', block: 'h3', styles: { color: '#1976d2' } }
        ]
      }
    ],
    
    // معالج التهيئة
    init_instance_callback: function(editor) {
      console.log('✅ محرر الحاسبة جاهز:', editor.id);
      
      // إظهار رسالة نجاح
      setTimeout(() => {
        const notification = document.createElement('div');
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(45deg, #2196f3, #1976d2);
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
          z-index: 10000;
          font-weight: bold;
        `;
        notification.textContent = '✅ محرر حاسبة الإعلانات جاهز! 📊';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.style.opacity = '0';
          notification.style.transition = 'opacity 0.5s ease';
          setTimeout(() => notification.remove(), 500);
        }, 3000);
      }, 500);
    },
    
    setup: function(editor) {
      // زر حفظ للحاسبة
      editor.ui.registry.addButton('saveCalculator', {
        text: '💾 حفظ',
        tooltip: 'حفظ محتوى الحاسبة',
        onAction: function() {
          const content = editor.getContent();
          const blob = new Blob([`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>محتوى من حاسبة الإعلانات</title>
    <style>
        body {
            font-family: 'Cairo', Arial, sans-serif;
            direction: rtl;
            text-align: right;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        .calculator-note {
            background: #e3f2fd;
            border-right: 4px solid #2196f3;
            padding: 15px;
            margin: 10px 0;
            border-radius: 4px;
        }
        .highlight {
            background: #fff3cd;
            padding: 2px 4px;
            border-radius: 3px;
        }
        h1, h2, h3 { color: #2c3e50; }
    </style>
</head>
<body>
    ${content}
    <hr style="margin-top: 40px;">
    <p style="text-align: center; color: #7f8c8d; font-size: 12px;">
        تم إنشاؤه بواسطة موقع حاسبة الإعلانات العربية<br>
        https://sherow1982.github.io/arabic-ads-calculator-tools/
    </p>
</body>
</html>`], { type: 'text/html' });
          
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `calculator-content-${Date.now()}.html`;
          link.click();
          URL.revokeObjectURL(url);
          
          editor.notificationManager.open({
            text: 'تم حفظ محتوى الحاسبة بنجاح! 📊',
            type: 'success',
            timeout: 3000
          });
        }
      });
      
      // زر إضافة قالب نتيجة
      editor.ui.registry.addButton('addResult', {
        text: '📊 نتيجة',
        tooltip: 'إضافة قالب نتيجة حاسبة',
        onAction: function() {
          const template = `
            <div class="calculator-note">
              <h3>📊 نتيجة الحاسبة</h3>
              <p><strong>الأداة:</strong> [اسم الحاسبة]</p>
              <p><strong>النتيجة:</strong> <span class="highlight">[النتيجة هنا]</span></p>
              <p><strong>التاريخ:</strong> ${new Date().toLocaleDateString('ar')}</p>
            </div>
          `;
          editor.insertContent(template);
        }
      });
    }
  };
  
  // تهيئة مع معالجة الأخطاء
  try {
    tinymce.init(config);
    console.log('🔄 جاري تهيئة محرر الحاسبة...');
  } catch (error) {
    console.error('❌ خطأ في تهيئة محرر الحاسبة:', error);
  }
}

// تهيئة تلقائية مع إعادة المحاولة
let retryCount = 0;
const maxRetries = 3;

function initWithRetry() {
  console.log('🚀 بدء تهيئة محرر حاسبة الإعلانات...');
  
  loadTinyMCE()
    .then(() => {
      // انتظار قصير لتهيئة المكتبة
      setTimeout(() => {
        initCalculatorTinyMCE();
        console.log('✅ تم تهيئة محرر حاسبة الإعلانات بنجاح');
      }, 500);
    })
    .catch(error => {
      console.error(`❌ محاولة ${retryCount + 1}: خطأ في التحميل:`, error);
      
      if (retryCount < maxRetries) {
        retryCount++;
        console.log(`🔄 إعادة المحاولة ${retryCount}/${maxRetries} بعد 2 ثواني...`);
        setTimeout(initWithRetry, 2000);
      } else {
        console.error('❌ فشل نهائي في تحميل المحرر');
        showErrorMessage();
      }
    });
}

// عرض رسالة خطأ
function showErrorMessage() {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #e74c3c;
    color: white;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(231, 76, 60, 0.3);
    z-index: 10000;
    text-align: center;
    max-width: 400px;
  `;
  errorDiv.innerHTML = `
    <h3>⚠️ مشكلة في تحميل المحرر</h3>
    <p>يرجى إعادة تحميل الصفحة أو التحقق من الإنترنت</p>
    <button onclick="this.parentElement.remove(); location.reload();" 
            style="background: white; color: #e74c3c; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px; font-weight: bold;">
      🔄 إعادة تحميل
    </button>
  `;
  document.body.appendChild(errorDiv);
}

// تهيئة تلقائية محسنة
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 المستند جاهز - بدء تحميل المحرر');
    initWithRetry();
  });
} else {
  console.log('📄 المستند محمل مسبقاً - بدء المحرر');
  initWithRetry();
}

// تصدير الوظائف
window.CalculatorTinyMCE = {
  loadTinyMCE,
  initCalculatorTinyMCE,
  initWithRetry
};

console.log('📦 تم تحميل ملف محرر حاسبة الإعلانات (مُصلَح)');

// وظائف إضافية للحاسبة
window.CalculatorHelpers = {
  // إدراج قالب نتيجة
  insertResultTemplate: function(editorId) {
    const editor = tinymce.get(editorId);
    if (editor) {
      const template = `
        <div class="calculator-note">
          <h3>📊 نتيجة الحاسبة</h3>
          <p><strong>الأداة:</strong> [اسم الحاسبة]</p>
          <p><strong>النتيجة:</strong> <span class="highlight">[النتيجة]</span></p>
          <p><strong>التوصية:</strong> [التوصية]</p>
          <p><strong>التاريخ:</strong> ${new Date().toLocaleDateString('ar')}</p>
        </div>
      `;
      editor.insertContent(template);
    }
  }
};