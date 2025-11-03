// Semantic Understanding & Dialect Recognition Engine
(function() {
  
  // قاعدة بيانات اللهجات والمرادفات الذكية
  const DIALECT_DICTIONARY = {
    // مجالات الخدمات المنزلية
    'وايت صحي': {
      meaning: 'شفط وتنظيف مجاري',
      dialects: {
        'السعودية': ['شفاط مجاري', 'سحب مجاري', 'تسليك مجاري', 'وايت صحي'],
        'الإمارات': ['شفط مجاري', 'شركة تسليك', 'تنظيف بيارات'],
        'مصر': ['شفط بيارة', 'تسليك مجاري', 'سحب مياه صرف', 'عامل بيارة'],
        'الكويت': ['شفط مجاري', 'تنظيف خزانات', 'وايت صحي'],
        'الأردن': ['شفط مجاري', 'تنظيف جور', 'سحب صرف']
      },
      services: ['شفط', 'تسليك', 'تنظيف', 'صيانة', 'طوارئ', 'فحص', 'تعقيم'],
      platforms: {
        'Google Ads': [
          'شفط مجاري طوارئ {مدينة}',
          'رقم شفاط مجاري قريب مني',
          'اسعار تسليك المجاري {مدينة}',
          'شركة شفط بيارات مضمونة',
          'تسليك مجاري 24 ساعة',
          'وايت صحي فوري {مدينة}',
          'شفط صرف صحي متخصص',
          'افضل شركة تنظيف مجاري'
        ],
        'Instagram': [
          'قبل وبعد تسليك المجاري',
          'معدات شفط مجاري حديثة',
          'فيديو عملية تنظيف البيارات',
          'طريقة تسليك المجاري بالضغط',
          'نتائج تنظيف مجاري احترافي',
          'معدات وايت صحي متطورة',
          'قصص طوارئ شفط المجاري',
          'تعقيم وتنظيف شامل للبيارات'
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
          'شفط مجاري قريب مني الان',
          'طوارئ وايت صحي فوري',
          'تسليك مجاري سريع اليوم',
          'شفط بيارة محلي 24 ساعة'
        ]
      }
    },

    // إضافة مجالات أخرى
    'سباك': {
      meaning: 'خدمات السباكة والصرف',
      dialects: {
        'السعودية': ['سباك', 'فني صحي', 'مصلح مواسير'],
        'الإمارات': ['سباك', 'فني سباكة', 'مصلح أنابيب'],
        'مصر': ['سباك', 'برامبر', 'فني صحي'],
        'الكويت': ['سباك', 'فني مواسير'],
        'الأردن': ['سباك', 'معلم صحي']
      },
      services: ['إصلاح', 'تركيب', 'صيانة', 'كشف تسريب', 'تمديد'],
      platforms: {
        'Google Ads': [
          'سباك قريب مني فوري',
          'اسعار السباك {مدينة}',
          'رقم سباك طوارئ',
          'كشف تسريب مياه',
          'تصليح مواسير مكسورة'
        ],
        'Instagram': [
          'نتائج إصلاح السباكة',
          'معدات كشف التسريب',
          'قبل وبعد إصلاح المواسير'
        ]
      }
    },

    'كهربائي': {
      meaning: 'خدمات الكهرباء والصيانة',
      dialects: {
        'السعودية': ['كهربائي', 'كهربجي', 'فني كهرباء'],
        'الإمارات': ['كهربائي', 'فني كهرباء'],
        'مصر': ['كهربائي', 'كهربجي', 'فني كهرباء'],
        'الكويت': ['كهربائي', 'معلم كهرباء'],
        'الأردن': ['كهربائي', 'معلم كهرباء']
      },
      services: ['تصليح', 'تمديد', 'صيانة', 'تركيب', 'طوارئ'],
      platforms: {
        'Google Ads': [
          'كهربائي قريب مني طوارئ',
          'فني كهرباء {مدينة}',
          'تصليح كهرباء فوري',
          'رقم كهربائي 24 ساعة'
        ],
        'Instagram': [
          'أعمال كهرباء احترافية',
          'تمديدات كهربائية حديثة',
          'صيانة كهرباء آمنة'
        ]
      }
    }
  };\n\n  // محرك الفهم الدلالي\n  function analyzeSemanticMeaning(input, country, selectedPlatforms) {\n    const inputLower = input.toLowerCase().trim();\n    \n    // البحث في قاعدة البيانات\n    for (const [key, data] of Object.entries(DIALECT_DICTIONARY)) {\n      // فحص التطابق المباشر\n      if (inputLower.includes(key.toLowerCase())) {\n        return generateContextualKeywords(data, country, selectedPlatforms);\n      }\n      \n      // فحص المرادفات اللهجية\n      const dialectTerms = data.dialects[country] || [];\n      for (const term of dialectTerms) {\n        if (inputLower.includes(term.toLowerCase())) {\n          return generateContextualKeywords(data, country, selectedPlatforms);\n        }\n      }\n      \n      // فحص الخدمات ذات الصلة\n      if (data.services.some(service => inputLower.includes(service))) {\n        return generateContextualKeywords(data, country, selectedPlatforms, input);\n      }\n    }\n    \n    // إذا لم يُعثر على تطابق، استخدم الذكاء الاصطناعي لاستنتاج المعنى\n    return intelligentInference(inputLower, country, selectedPlatforms);\n  }\n\n  function generateContextualKeywords(fieldData, country, selectedPlatforms, originalInput = null) {\n    let keywords = [];\n    const cityMapping = {\n      'السعودية': ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'],\n      'الإمارات': ['دبي', 'أبوظبي', 'الشارقة', 'عجمان'],\n      'مصر': ['القاهرة', 'الإسكندرية', 'الجيزة', 'شبرا الخيمة'],\n      'الكويت': ['الكويت', 'حولي', 'الأحمدي', 'الفروانية'],\n      'قطر': ['الدوحة', 'الوكرة', 'الخور'],\n      'البحرين': ['المنامة', 'المحرق', 'الرفاع'],\n      'عُمان': ['مسقط', 'صلالة', 'نزوى'],\n      'الأردن': ['عمان', 'إربد', 'الزرقاء'],\n      'لبنان': ['بيروت', 'طرابلس', 'صيدا'],\n      'المغرب': ['الرباط', 'الدار البيضاء', 'فاس'],\n      'تونس': ['تونس', 'صفاقس', 'سوسة'],\n      'الجزائر': ['الجزائر', 'وهران', 'قسنطينة']\n    };\n\n    selectedPlatforms.forEach(platform => {\n      if (fieldData.platforms[platform]) {\n        fieldData.platforms[platform].forEach(template => {\n          // استبدال المتغيرات\n          if (template.includes('{مدينة}') && cityMapping[country]) {\n            cityMapping[country].slice(0, 3).forEach(city => {\n              keywords.push(template.replace('{مدينة}', city));\n            });\n          } else {\n            keywords.push(template);\n          }\n        });\n      }\n    });\n\n    // إضافة مرادفات لهجية محلية\n    if (fieldData.dialects[country]) {\n      fieldData.dialects[country].forEach(dialectTerm => {\n        selectedPlatforms.forEach(platform => {\n          if (platform === 'Google Ads') {\n            keywords.push(`${dialectTerm} قريب مني`);\n            keywords.push(`رقم ${dialectTerm}`);\n            keywords.push(`افضل ${dialectTerm}`);\n          } else if (platform === 'Instagram') {\n            keywords.push(`خدمات ${dialectTerm} احترافية`);\n            keywords.push(`${dialectTerm} متخصص`);\n          }\n        });\n      });\n    }\n\n    return [...new Set(keywords)];\n  }\n\n  // محرك الاستنتاج الذكي للمجالات غير المعروفة\n  function intelligentInference(input, country, selectedPlatforms) {\n    let keywords = [];\n    let inferredCategory = 'خدمة عامة';\n    \n    // تحليل السياق لتحديد نوع الخدمة/المنتج\n    const contextClues = {\n      'طبي': /دكتور|طبيب|عيادة|مستشفى|علاج|فحص|تحليل/,\n      'تقني': /تصليح|إصلاح|برمجة|تطوير|موقع|تطبيق|كمبيوتر/,\n      'خدمي': /تنظيف|صيانة|نقل|توصيل|خدمة|شركة/,\n      'تجاري': /بيع|شراء|متجر|محل|منتج|سعر|عرض/,\n      'تعليمي': /تدريب|دورة|تعليم|معهد|مدرسة|كورس/,\n      'غذائي': /مطعم|طبخ|أكل|وجبة|حلويات|قهوة/\n    };\n\n    // تحديد الفئة\n    Object.entries(contextClues).forEach(([category, pattern]) => {\n      if (pattern.test(input)) {\n        inferredCategory = category;\n      }\n    });\n\n    // توليد كلمات ذكية حسب الفئة المستنتجة\n    const baseKeywords = generateByCategory(input, inferredCategory, country);\n    \n    // تخصيص حسب المنصة\n    selectedPlatforms.forEach(platform => {\n      const platformSpecific = customizeForPlatform(baseKeywords, platform, inferredCategory);\n      keywords.push(...platformSpecific);\n    });\n\n    return [...new Set(keywords)];\n  }\n\n  function generateByCategory(input, category, country) {\n    const templates = {\n      'طبي': [\n        `افضل ${input} قريب مني`,\n        `حجز موعد ${input}`,\n        `اسعار ${input}`,\n        `${input} متخصص`,\n        `عيادة ${input} مضمونة`,\n        `${input} بالتأمين`\n      ],\n      'خدمي': [\n        `شركة ${input} مضمونة`,\n        `${input} قريب مني`,\n        `اسعار ${input}`,\n        `${input} طوارئ 24 ساعة`,\n        `افضل ${input}`,\n        `${input} فوري`\n      ],\n      'تقني': [\n        `خدمات ${input} احترافية`,\n        `${input} متخصص`,\n        `شركة ${input} موثوقة`,\n        `${input} سريع ومضمون`,\n        `فني ${input} خبير`\n      ],\n      'تجاري': [\n        `افضل ${input}`,\n        `عروض ${input}`,\n        `اسعار ${input}`,\n        `${input} جودة عالية`,\n        `متجر ${input}`\n      ],\n      'تعليمي': [\n        `دورة ${input}`,\n        `تعلم ${input}`,\n        `كورس ${input}`,\n        `تدريب ${input}`\n      ],\n      'غذائي': [\n        `افضل ${input}`,\n        `${input} قريب مني`,\n        `توصيل ${input}`,\n        `منيو ${input}`,\n        `${input} لذيذ`\n      ]\n    };\n    \n    return templates[category] || templates['خدمي'];\n  }\n\n  function customizeForPlatform(baseKeywords, platform, category) {\n    const platformModifiers = {\n      'Google Ads': {\n        prefixes: ['افضل', 'اسعار', 'رقم', 'قريب مني'],\n        suffixes: ['فوري', 'طوارئ', 'مضمون', '24 ساعة']\n      },\n      'Instagram': {\n        prefixes: ['صور', 'فيديو', 'قبل وبعد'],\n        suffixes: ['احترافي', 'جميل', 'حديث', 'متطور', 'مميز']\n      },\n      'Facebook': {\n        prefixes: ['خدمات', 'شركة', 'عروض'],\n        suffixes: ['شاملة', 'موثوقة', 'مضمونة', 'متكاملة']\n      },\n      'TikTok': {\n        prefixes: ['طريقة', 'كيف'],\n        suffixes: ['سريع', 'سهل', 'عصري', 'ترندي']\n      }\n    };\n\n    const modifiers = platformModifiers[platform] || platformModifiers['Google Ads'];\n    const customized = [...baseKeywords];\n    \n    // إضافة تنويعات منصة-خاصة\n    baseKeywords.forEach(kw => {\n      modifiers.prefixes.forEach(prefix => {\n        customized.push(`${prefix} ${kw}`);\n      });\n      modifiers.suffixes.forEach(suffix => {\n        customized.push(`${kw} ${suffix}`);\n      });\n    });\n\n    return customized;\n  }\n\n  // كشف نوع الخدمة من السياق\n  function detectServiceType(input) {\n    const servicePatterns = {\n      'طوارئ': /طوارئ|عاجل|فوري|سريع|24 ساعة/,\n      'محلي': /قريب مني|في المنطقة|محلي|الحي/,\n      'متخصص': /متخصص|خبير|احترافي|مضمون/,\n      'رخيص': /رخيص|اقل سعر|ارخص|اسعار مناسبة/\n    };\n\n    const detected = [];\n    Object.entries(servicePatterns).forEach(([type, pattern]) => {\n      if (pattern.test(input)) detected.push(type);\n    });\n    \n    return detected;\n  }\n\n  // توليد سلبيات ذكية حسب المعنى\n  function generateSmartNegatives(meaning, category) {\n    const negativePatterns = {\n      'شفط وتنظيف مجاري': [\n        'جميل', 'تصميم', 'ديكور', 'جمالي', 'مكياج', 'موضة',\n        'وظائف', 'تعليم', 'دورات', 'مجاني', 'صور جميلة'\n      ],\n      'خدمات طبية': [\n        'وظائف طب', 'دراسة طب', 'كتب طبية', 'جامعة طب',\n        'مجاني', 'تعليم', 'دورات'\n      ],\n      'خدمات تقنية': [\n        'تعليم مجاني', 'دورات', 'وظائف', 'العاب', 'تحميل مجاني'\n      ]\n    };\n    \n    return negativePatterns[meaning] || [\n      'وظائف', 'مجاني', 'تعليم', 'دورات', 'العاب'\n    ];\n  }\n\n  // الدالة الرئيسية للتكامل مع النظام\n  window.semanticAnalysis = function(field, country, selectedPlatforms, expansion) {\n    console.log(`🧠 تحليل دلالي لـ: \"${field}\" في ${country} للمنصات:`, selectedPlatforms);\n    \n    // التحليل الدلالي\n    const analysis = analyzeSemanticMeaning(field, country, selectedPlatforms);\n    \n    // ضمان العدد المطلوب\n    const targetCount = expansion === 'conservative' ? 25 : \n                       expansion === 'moderate' ? 40 : 50;\n    \n    // إضافة مرادفات إذا كان العدد قليل\n    if (analysis.length < 20) {\n      const extraKeywords = generateGenericBoost(field, country, selectedPlatforms);\n      analysis.push(...extraKeywords);\n    }\n    \n    // إزالة التكرار وترتيب\n    const unique = [...new Set(analysis)];\n    const sorted = unique.sort((a, b) => calculateSearchVolume(b) - calculateSearchVolume(a));\n    \n    return sorted.slice(0, targetCount);\n  };\n\n  // حساب توقع حجم البحث (محلي)\n  function calculateSearchVolume(keyword) {\n    let score = 0;\n    \n    // إشارات حجم البحث العالي\n    if (/اسعار|تكلفة|سعر/.test(keyword)) score += 10;\n    if (/افضل|احسن|أفضل/.test(keyword)) score += 9;\n    if (/قريب مني|في \\S+/.test(keyword)) score += 8;\n    if (/رقم|حجز|اتصال/.test(keyword)) score += 8;\n    if (/طوارئ|فوري|24 ساعة/.test(keyword)) score += 7;\n    if (/شركة|خدمات|متخصص/.test(keyword)) score += 6;\n    if (/عروض|خصومات/.test(keyword)) score += 5;\n    \n    // طول مثالي للكلمات المفتاحية\n    const wordCount = keyword.trim().split(/\\s+/).length;\n    if (wordCount >= 2 && wordCount <= 4) score += 3;\n    else if (wordCount > 6) score -= 2;\n    \n    return score;\n  }\n\n  function generateGenericBoost(field, country, selectedPlatforms) {\n    const boostKeywords = [];\n    \n    selectedPlatforms.forEach(platform => {\n      if (platform === 'Instagram') {\n        boostKeywords.push(\n          `خدمات ${field} احترافية`,\n          `${field} متخصص وموثوق`,\n          `أعمال ${field} مميزة`,\n          `فريق ${field} خبير`\n        );\n      } else if (platform === 'Google Ads') {\n        boostKeywords.push(\n          `${field} ${country}`,\n          `شركة ${field} مضمونة`,\n          `${field} سريع وموثوق`,\n          `خدمة ${field} طوارئ`\n        );\n      } else if (platform === 'Facebook') {\n        boostKeywords.push(\n          `${field} جودة عالية`,\n          `عروض ${field}`,\n          `${field} بضمان الجودة`\n        );\n      }\n    });\n    \n    return boostKeywords;\n  }\n\n  // ربط مع النظام الحالي\n  if (typeof generateSmartKeywords === 'function') {\n    const _original = generateSmartKeywords;\n    window.generateSmartKeywords = function(field, country, dialect, expansion, platforms) {\n      // استخدام المحرك الدلالي الجديد\n      const semanticKeywords = window.semanticAnalysis(field, country, platforms, expansion);\n      \n      if (semanticKeywords.length >= 20) {\n        console.log('✅ تم استخدام المحرك الدلالي:', semanticKeywords.length, 'كلمة');\n        return semanticKeywords;\n      } else {\n        // العودة للنظام القديم كبديل\n        console.log('⚠️ العودة للنظام التقليدي');\n        return _original.apply(this, arguments);\n      }\n    };\n  }\n\n  // تحديث توليد السلبيات\n  if (typeof generateSmartNegatives === 'function') {\n    const _originalNeg = generateSmartNegatives;\n    window.generateSmartNegatives = function(field) {\n      // البحث في المعاني المعروفة\n      for (const [key, data] of Object.entries(DIALECT_DICTIONARY)) {\n        if (field.toLowerCase().includes(key.toLowerCase()) || \n            (data.dialects && Object.values(data.dialects).flat()\n              .some(term => field.toLowerCase().includes(term.toLowerCase())))) {\n          const meaningBased = generateSmartNegatives(data.meaning, 'contextual');\n          return meaningBased;\n        }\n      }\n      \n      // العودة للنظام التقليدي\n      return _originalNeg.apply(this, arguments);\n    };\n  }\n\n  console.log('🧠 تم تفعيل محرك الفهم الدلالي والذكاء الاصطناعي للهجات');\n  console.log('📊 قاعدة البيانات تشمل:', Object.keys(DIALECT_DICTIONARY).length, 'مجال رئيسي');\n})();