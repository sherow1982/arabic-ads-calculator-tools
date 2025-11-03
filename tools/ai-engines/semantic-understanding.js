// Advanced Semantic Understanding Engine - Business Context Recognition
(function() {
  
  // قاعدة بيانات شاملة للمجالات والخدمات + كلماتها الفعلية
  const COMPREHENSIVE_BUSINESS_DATABASE = {
    // خدمات فنية منزلية
    'كهربائي': {
      category: 'خدمة فنية',
      real_keywords: {
        'Google Ads': [
          'كهربائي قريب مني طوارئ',
          'فني كهرباء منازل {مدينة}', 
          'رقم كهربائي 24 ساعة',
          'أسعار فني الكهرباء {مدينة}',
          'تصليح كهرباء فوري',
          'كهربائي معتمد {مدينة}',
          'اعطال كهرباء منزلية',
          'كشف تسريب كهرباء',
          'تمديد كهرباء جديد',
          'صيانة لوحة كهرباء'
        ],
        'Instagram': [
          'قبل وبعد تصليح لوحة الكهرباء',
          'فيديو فحص قاطع كهربائي معطل', 
          'طريقة تركيب مفاتيح آمنة',
          'أعمال تمديدات كهربائية مرتبة',
          'فحص لوحة كهرباء بالأجهزة',
          'تركيب قواطع حماية حديثة',
          'إصلاح عطل شورت كهربائي',
          'معدات فحص كهرباء متطورة'
        ],
        'Facebook': [
          'خدمات كهرباء منزلية شاملة',
          'فني كهرباء معتمد وموثوق',
          'صيانة كهرباء بضمان الجودة',
          'تركيب لوحات توزيع كهربائية',
          'إصلاح أعطال كهربائية معقدة',
          'كهربائي متخصص تمديدات'
        ],
        'Snapchat': [
          'كهربائي طوارئ قريب مني الآن',
          'فني كهرباء سريع اليوم',
          'تصليح كهرباء فوري 24 ساعة',
          'كهربائي محلي متاح'
        ]
      },
      forbidden_words: ['جميل', 'جذاب', 'تصميم', 'ديكور', 'موضة', 'أنيق', 'عصري', 'رائع', 'مميز بصرياً', 'جمالي'],
      related_terms: ['فني كهرباء', 'تصليح', 'طوارئ', 'قاطع', 'لوحة', 'تمديد', 'شورت', 'كشف أعطال']
    },

    'وايت صحي': {
      category: 'خدمة صحية طوارئ',
      real_keywords: {
        'Google Ads': [
          'شفط مجاري طوارئ {مدينة}',
          'رقم شفاط مجاري قريب مني',
          'أسعار تسليك المجاري {مدينة}',
          'شركة شفط بيارات مضمونة',
          'تسليك مجاري فوري',
          'وايت صحي 24 ساعة {مدينة}',
          'شفط صرف صحي متخصص',
          'تنظيف خزانات صرف'
        ],
        'Instagram': [
          'قبل وبعد تسليك المجاري المسدودة',
          'معدات شفط مجاري حديثة ومتطورة',
          'فيديو عملية تنظيف البيارة',
          'طريقة تسليك المجاري بالضغط',
          'نتائج تنظيف مجاري احترافي',
          'معدات وايت صحي متطورة',
          'عمليات شفط وتعقيم شاملة',
          'فريق متخصص صيانة مجاري'
        ],
        'Facebook': [
          'خدمات شفط مجاري شاملة',
          'شركة تنظيف مجاري موثوقة',
          'عروض شفط وتسليك البيارات', 
          'خدمة طوارئ مجاري 24/7',
          'تنظيف مجاري بضمان الجودة',
          'فريق متخصص شفط صرف'
        ],
        'Snapchat': [
          'شفط مجاري قريب مني الآن',
          'طوارئ وايت صحي فوري',
          'تسليك مجاري سريع اليوم',
          'شفط بيارة محلي 24 ساعة'
        ]
      },
      forbidden_words: ['جميل', 'جذاب', 'تصميم', 'ديكور', 'أنيق', 'رائع', 'عصري', 'موضة', 'جمالي'],
      related_terms: ['شفط', 'تسليك', 'بيارة', 'صرف', 'مجاري', 'تنظيف', 'شفاط', 'وايت']
    },

    'سباك': {
      category: 'خدمة فنية منزلية',
      real_keywords: {
        'Google Ads': [
          'سباك قريب مني فوري',
          'فني سباكة {مدينة} طوارئ',
          'رقم سباك 24 ساعة',
          'تصليح تسريب مياه',
          'سباك معتمد {مدينة}',
          'كشف تسريب مياه خفي',
          'إصلاح مواسير مكسورة'
        ],
        'Instagram': [
          'قبل وبعد إصلاح السباكة',
          'معدات كشف التسريب المتطورة',
          'فيديو تصليح تسريب خفي',
          'أعمال سباكة احترافية مرتبة',
          'تركيب مواسير وصنابير حديثة'
        ],
        'Facebook': [
          'خدمات سباكة منزلية شاملة',
          'سباك متخصص موثوق',
          'صيانة سباكة بضمان'
        ]
      },
      forbidden_words: ['جميل', 'جذاب', 'تصميم', 'ديكور', 'أنيق', 'عصري', 'موضة'],
      related_terms: ['مواسير', 'تسريب', 'صنابير', 'تصليح', 'طوارئ', 'فني']
    }
  };

  // محرك الكشف الذكي للسياق
  function detectBusinessContext(input) {
    const inputLower = input.toLowerCase().trim();
    
    // البحث المباشر في قاعدة البيانات
    for (const [businessKey, businessData] of Object.entries(COMPREHENSIVE_BUSINESS_DATABASE)) {
      if (inputLower.includes(businessKey.toLowerCase())) {
        console.log(`🎯 تم التعرف على المجال: ${businessKey} - الفئة: ${businessData.category}`);
        return businessData;
      }
      
      // فحص المصطلحات المرتبطة
      if (businessData.related_terms.some(term => inputLower.includes(term))) {
        console.log(`🔍 تم التعرف من خلال المصطلح المرتبط: ${businessKey}`);
        return businessData;
      }
    }
    
    // إذا لم يُعثر على مطابقة، استخدم الاستنتاج الذكي
    return inferBusinessFromContext(inputLower);
  }

  // محرك الاستنتاج الذكي
  function inferBusinessFromContext(input) {
    const contextPatterns = {
      'خدمة_فنية': /تصليح|إصلاح|صيانة|فني|كشف|طوارئ|تركيب/,
      'خدمة_طبية': /دكتور|طبيب|عيادة|فحص|علاج|طوارئ|مستشفى/,
      'خدمة_تجارية': /شركة|مؤسسة|بيع|شراء|عروض|أسعار|متجر/,
      'خدمة_تعليمية': /دورة|تدريب|تعليم|كورس|معهد|جامعة/,
      'خدمة_تقنية': /موقع|تطبيق|برمجة|تطوير|تصميم_مواقع|سيو/
    };

    let category = 'خدمة_عامة';
    Object.entries(contextPatterns).forEach(([cat, pattern]) => {
      if (pattern.test(input)) category = cat;
    });

    return {
      category,
      real_keywords: generateSmartKeywordsByCategory(input, category),
      forbidden_words: ['جميل', 'جذاب', 'رائع', 'أنيق', 'عصري', 'موضة'],
      related_terms: extractKeyTerms(input)
    };
  }

  // توليد كلمات ذكية حسب الفئة
  function generateSmartKeywordsByCategory(input, category) {
    const templates = {
      'خدمة_فنية': {
        'Google Ads': [
          `${input} قريب مني طوارئ`,
          `فني ${input} {مدينة}`,
          `رقم ${input} 24 ساعة`,
          `تصليح ${input} فوري`,
          `أسعار ${input}`,
          `صيانة ${input} متخصص`
        ],
        'Instagram': [
          `أعمال ${input} احترافية`,
          `قبل وبعد إصلاح ${input}`,
          `فيديو صيانة ${input}`,
          `معدات ${input} حديثة`,
          `خدمات ${input} متطورة`
        ],
        'Facebook': [
          `خدمات ${input} شاملة`,
          `${input} معتمد وموثوق`,
          `صيانة ${input} بضمان`,
          `فريق ${input} متخصص`
        ]
      },
      'خدمة_طبية': {
        'Google Ads': [
          `أفضل ${input} قريب مني`,
          `حجز موعد ${input}`,
          `أسعار ${input}`,
          `${input} متخصص`,
          `عيادة ${input} {مدينة}`
        ],
        'Instagram': [
          `${input} متخصص وخبير`,
          `عيادة ${input} حديثة`,
          `خدمات ${input} شاملة`
        ]
      },
      'خدمة_تجارية': {
        'Google Ads': [
          `أفضل ${input}`,
          `عروض ${input}`,
          `أسعار ${input}`,
          `${input} جودة عالية`
        ],
        'Instagram': [
          `منتجات ${input} مميزة`,
          `عروض ${input}`,
          `${input} احترافي`
        ]
      }
    };

    const categoryTemplates = templates[category] || templates['خدمة_فنية'];
    const result = {};
    
    Object.entries(categoryTemplates).forEach(([platform, platformKeywords]) => {
      result[platform] = platformKeywords;
    });
    
    return result;
  }

  // استخراج المصطلحات الأساسية
  function extractKeyTerms(input) {
    const words = input.split(/\s+/);
    return words.filter(word => word.length > 2);
  }

  // تطبيق فلترة الكلمات المحظورة
  function applyForbiddenFilter(keywords, forbiddenWords) {
    return keywords.filter(kw => {
      return !forbiddenWords.some(forbidden => 
        kw.toLowerCase().includes(forbidden.toLowerCase())
      );
    });
  }

  // إضافة كلمات مرتبطة ذكياً
  function addRelatedSearchTerms(baseKeywords, businessContext, selectedPlatforms) {
    const related = [];
    
    // كلمات مرتبطة بناء على طبيعة الخدمة
    if (businessContext.category === 'خدمة فنية') {
      selectedPlatforms.forEach(platform => {
        if (platform === 'Google Ads') {
          related.push('صيانة دورية', 'كشف أعطال', 'طوارئ', 'خدمة سريعة');
        } else if (platform === 'Instagram') {
          related.push('أعمال متقنة', 'خبرة طويلة', 'نتائج مضمونة', 'فريق محترف');
        }
      });
    }
    
    return [...baseKeywords, ...related];
  }

  // الدالة الرئيسية للتحليل الدلالي المتقدم
  window.smartSemanticAnalysis = function(field, country, selectedPlatforms, expansion) {
    console.log(`🧠 تحليل دلالي متقدم لـ: "${field}" في ${country}`);
    
    // كشف السياق التجاري
    const businessContext = detectBusinessContext(field);
    
    // توليد كلمات أساسية من قاعدة البيانات
    let keywords = [];
    
    selectedPlatforms.forEach(platform => {
      if (businessContext.real_keywords && businessContext.real_keywords[platform]) {
        const platformKeywords = businessContext.real_keywords[platform];
        
        // استبدال متغيرات المدينة
        const cityMapping = {
          'السعودية': ['الرياض', 'جدة', 'الدمام'],
          'الإمارات': ['دبي', 'أبوظبي', 'الشارقة'],
          'مصر': ['القاهرة', 'الإسكندرية', 'الجيزة'],
          'الكويت': ['الكويت', 'حولي', 'الأحمدي']
        };
        
        platformKeywords.forEach(template => {
          if (template.includes('{مدينة}') && cityMapping[country]) {
            cityMapping[country].slice(0, 2).forEach(city => {
              keywords.push(template.replace('{مدينة}', city));
            });
          } else {
            keywords.push(template);
          }
        });
      }
    });
    
    // إضافة كلمات مرتبطة
    keywords = addRelatedSearchTerms(keywords, businessContext, selectedPlatforms);
    
    // تطبيق فلترة الكلمات المحظورة
    keywords = applyForbiddenFilter(keywords, businessContext.forbidden_words);
    
    // إزالة التكرار وترتيب
    const unique = [...new Set(keywords)];
    const sorted = unique.sort((a, b) => calculateBusinessSearchVolume(b) - calculateBusinessSearchVolume(a));
    
    // ضمان العدد المطلوب
    const targetCount = expansion === 'conservative' ? 25 : expansion === 'moderate' ? 40 : 50;
    
    console.log(`✅ تم توليد ${sorted.length} كلمة بدون كلمات جمالية`);
    
    return sorted.slice(0, targetCount);
  };

  // حساب توقع حجم البحث للأعمال
  function calculateBusinessSearchVolume(keyword) {
    let score = 0;
    
    // إشارات النية العالية للخدمات
    if (/أسعار|تكلفة|سعر|رقم|اتصال/.test(keyword)) score += 10;
    if (/قريب مني|في \S+/.test(keyword)) score += 9;
    if (/طوارئ|فوري|سريع|24 ساعة/.test(keyword)) score += 8;
    if (/أفضل|احسن|متخصص/.test(keyword)) score += 7;
    if (/تصليح|إصلاح|كشف|حل/.test(keyword)) score += 6;
    if (/خدمات|شركة|فني/.test(keyword)) score += 5;
    
    // تقليل نقاط الكلمات الجمالية (للأمان)
    if (/جميل|جذاب|رائع|أنيق|تصميم|ديكور/.test(keyword)) score -= 20;
    
    // تفضيل الطول المثالي للكلمات المفتاحية
    const wordCount = keyword.trim().split(/\s+/).length;
    if (wordCount >= 2 && wordCount <= 4) score += 2;
    
    return score;
  }

  // ربط مع النظام الحالي
  if (typeof generateSmartKeywords === 'function') {
    const _original = generateSmartKeywords;
    window.generateSmartKeywords = function(field, country, dialect, expansion, platforms) {
      console.log('🔄 استخدام المحرك الدلالي المتقدم...');
      
      // استخدام التحليل الدلالي الذكي
      const smartResults = window.smartSemanticAnalysis(field, country, platforms, expansion);
      
      if (smartResults && smartResults.length >= 15) {
        console.log(`✅ تم توليد ${smartResults.length} كلمة ذكية بدون كلمات جمالية`);
        return smartResults;
      } else {
        console.log('⚠️ العودة للنظام الاحتياطي');
        return _original.apply(this, arguments);
      }
    };
  }

  // تحديث توليد السلبيات
  if (typeof generateSmartNegatives === 'function') {
    const _originalNeg = generateSmartNegatives;
    window.generateSmartNegatives = function(field) {
      const businessContext = detectBusinessContext(field);
      
      if (businessContext && businessContext.forbidden_words) {
        // دمج السلبيات العامة مع المحظورات الخاصة بالمجال
        const generalNegatives = ['وظائف', 'مجاني', 'تعليم', 'دورات', 'صور', 'فيديو'];
        const combinedNegatives = [...generalNegatives, ...businessContext.forbidden_words];
        
        console.log(`🚫 تم إضافة ${businessContext.forbidden_words.length} كلمة محظورة للمجال`);
        
        return [...new Set(combinedNegatives)];
      } else {
        return _originalNeg.apply(this, arguments);
      }
    };
  }

  console.log('🧠 تم تفعيل المحرك الدلالي المتقدم للأعمال');
  console.log('📊 قاعدة البيانات تشمل:', Object.keys(COMPREHENSIVE_BUSINESS_DATABASE).length, 'مجال');
  console.log('🚫 فلترة الكلمات الجمالية: مفعّلة');
  console.log('🎯 كشف السياق التجاري: مفعّل');
})();