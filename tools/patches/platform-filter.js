// Platform-Specific Keyword Filter
(function(){
  // فلترة الكلمات حسب المنصات المختارة فقط
  function filterKeywordsByPlatforms(keywords, selectedPlatforms) {
    const platformPatterns = {
      'Instagram': [/تصميم|ديكور|صور|فيديو|قبل وبعد|احترافي|فني|بصري|جمالي|ترند|موضة|ريلز|قصص/],
      'Facebook': [/عروض|خصومات|مجاني التقدير|خدمات|صور|قبل وبعد|24 ساعة|مضمون|جودة عالية/],
      'TikTok': [/سريع|فوري|اليوم|الان|قصير|ترند|موضة|شباب|جديد|تحدي|منافسة|فيديو/],
      'Google Ads': [/اسعار|تكلفة|سعر|افضل|احسن|قريب مني|حجز|رقم|اتصال|عاجل|طوارئ|فوري|في \S+/],
      'YouTube': [/شرح|طريقة|كيف|كيفية|افضل طريقة|مقارنة|مقارن|دليل|تعليم|شرح/],
      'LinkedIn': [/وكالة|شركة|مدير|خبير|استشاري|B2B|مهني|احترافي|توظيف|وظائف|consultant/],
      'Snapchat': [/قريب مني|24 ساعة|عاجل|فوري|محلي|جغرافي|سريع|الان|اليوم/]
    };

    // إزالة الكلمات التي تحتوي على أسماء منصات غير مختارة
    const unwantedPlatformTerms = [];
    Object.keys(platformPatterns).forEach(platform => {
      if (!selectedPlatforms.includes(platform)) {
        // إضافة اسم المنصة كمصطلح مستبعد
        if (platform === 'Google Ads') unwantedPlatformTerms.push(/Google|جوجل|Ads|ادس/);
        if (platform === 'Facebook') unwantedPlatformTerms.push(/Facebook|فيسبوك|FB/);
        if (platform === 'Instagram') unwantedPlatformTerms.push(/Instagram|انستجرام|انستا/);
        if (platform === 'TikTok') unwantedPlatformTerms.push(/TikTok|تيك توك|تيكتوك/);
        if (platform === 'YouTube') unwantedPlatformTerms.push(/YouTube|يوتيوب/);
        if (platform === 'LinkedIn') unwantedPlatformTerms.push(/LinkedIn|لينكدان/);
        if (platform === 'Snapchat') unwantedPlatformTerms.push(/Snapchat|سناب شات|سناب/);
      }
    });

    // فلترة أولى: إزالة الكلمات التي تحتوي على منصات غير مختارة
    let filtered = keywords.filter(kw => {
      return !unwantedPlatformTerms.some(pattern => pattern.test(kw));
    });

    // فلترة ثانية: الاحتفاظ فقط بالكلمات المناسبة للمنصات المختارة
    if (selectedPlatforms.length > 0) {
      const relevantPatterns = [];
      selectedPlatforms.forEach(platform => {
        if (platformPatterns[platform]) {
          relevantPatterns.push(...platformPatterns[platform]);
        }
      });

      // إذا كانت Instagram فقط، التركيز على الكلمات البصرية والتفاعلية
      if (selectedPlatforms.length === 1 && selectedPlatforms[0] === 'Instagram') {
        filtered = filtered.filter(kw => {
          // إزالة الكلمات الخاصة بالبحث المباشر (Google) والتركيز على البصرية
          const isSearchIntent = /اسعار|تكلفة|سعر|رقم|اتصال|حجز/.test(kw);
          const isVisualIntent = /تصميم|ديكور|صور|احترافي|جودة|عروض|خدمات/.test(kw);
          return !isSearchIntent || isVisualIntent;
        });
      }

      // إضافة كلمات إضافية مخصصة للمنصات المختارة فقط
      if (selectedPlatforms.includes('Instagram')) {
        const instagramBoost = [
          'تصاميم احترافية',
          'محتوى بصري جذاب', 
          'صور قبل وبعد',
          'عروض حصرية',
          'قصص انستجرام',
          'ريلز ترند'
        ];
        filtered.push(...instagramBoost);
      }
    }

    // إزالة التكرار وإرجاع النتيجة
    return [...new Set(filtered)];
  }

  // ربط مع النظام الحالي
  if (typeof generateSmartKeywords === 'function') {
    const _origGen = generateSmartKeywords;
    window.generateSmartKeywords = function(field, country, dialect, expansion) {
      const baseKeywords = _origGen.apply(this, arguments);
      // تطبيق الفلترة حسب المنصات المختارة
      const filtered = filterKeywordsByPlatforms(baseKeywords, selectedPlatforms || ['Instagram']);
      
      // ضمان العدد المطلوب (20-50)
      if (filtered.length < 20) {
        // إضافة كلمات عامة مناسبة للمنصات المختارة
        const fieldName = field || 'الخدمة';
        const generalBoost = [
          `افضل ${fieldName}`,
          `${fieldName} احترافي`,
          `${fieldName} مضمون`,
          `عروض ${fieldName}`,
          `خدمات ${fieldName}`,
          `${fieldName} جودة عالية`
        ];
        filtered.push(...generalBoost);
      }
      
      return [...new Set(filtered)].slice(0, Math.min(50, Math.max(20, filtered.length)));
    };
  }

  console.log('✅ تم تفعيل فلتر المنصات - الكلمات ستكون مخصصة للمنصات المختارة فقط');
})();