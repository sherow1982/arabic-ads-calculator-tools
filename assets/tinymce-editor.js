/**
 * TinyMCE عربي لمشروع أدوات حاسبة الإعلانات
 * محرر عربي متقدم للمحتوى والمقالات
 */

// تحميل TinyMCE من CDN
function loadTinyMCE() {
  return new Promise((resolve, reject) => {
    if (window.tinymce) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tinymce@7/tinymce.min.js';
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'origin';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load TinyMCE'));
    document.head.appendChild(script);
  });
}

// إعداد TinyMCE لمشروع
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
      'bullist numlist outdent indent | link image table | code preview fullscreen'
    ].join(' | '),
    
    menubar: 'edit view insert format tools table help',
    
    // إعدادات عربية
    directionality: 'rtl',
    language: 'ar',
    
    height: 400,
    min_height: 250,
    resize: 'vertical',
    
    branding: false,
    promotion: false,
    
    // حفظ تلقائي
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_retention: '30m',
    
    content_style: `
      body {
        font-family: 'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.6;
        direction: rtl;
        text-align: right;
        color: #333;
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
    
    setup: function(editor) {
      // زر حفظ للحاسبة
      editor.ui.registry.addButton('saveCalculator', {
        text: '💾 حفظ',
        tooltip: 'حفظ محتوى الحاسبة',
        onAction: function() {
          const content = editor.getContent();
          const blob = new Blob([content], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `calculator-content-${Date.now()}.html`;
          link.click();
          URL.revokeObjectURL(url);
          
          editor.notificationManager.open({
            text: 'تم حفظ محتوى الحاسبة!',
            type: 'success'
          });
        }
      });
      
      // إضافة الزر للشريط
      editor.on('init', function() {
        const toolbar = editor.theme.panel.find('toolbar');
        if (toolbar && toolbar.length > 0) {
          toolbar[0].append('saveCalculator');
        }
      });
    }
  };
  
  tinymce.init(config);
}

// تهيئة تلقائية
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadTinyMCE().then(initCalculatorTinyMCE).catch(console.error);
  });
} else {
  loadTinyMCE().then(initCalculatorTinyMCE).catch(console.error);
}

// تصدير الوظائف
window.CalculatorTinyMCE = {
  loadTinyMCE,
  initCalculatorTinyMCE
};