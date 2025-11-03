// Platform Classification Engine
(function(){
  // قواعد تصنيف المنصات
  const PLATFORM_RULES = {
    'Google Ads': {
      patterns: [/اسعار|تكلفة|سعر/, /افضل|احسن|أفضل/, /قريب مني|في \S+/, /حجز|رقم|اتصال/, /عاجل|طوارئ|فوري/],
      priority: 9,
      reason: 'نية بحث عالية'
    },
    'Facebook': {
      patterns: [/عروض|خصومات/, /مجاني التقدير/, /خدمات?, صور|قبل وبعد/, /24 ساعة/, /مضمون/, /جودة عالية/],
      priority: 7,
      reason: 'بناء ثقة وانتشار'
    },
    'Instagram': {
      patterns: [/تصميم|ديكور/, /صور|فيديو/, /قبل وبعد/, /احترافي/, /فني/, /بصري|جمالي/, /ترند|موضة/],
      priority: 6,
      reason: 'محتوى بصري جذاب'
    },
    'TikTok': {
      patterns: [/سريع|فوري/, /اليوم|الان/, /قصير/, /ترند|موضة/, /شباب|جديد/, /تحدي|منافسة/],
      priority: 5,
      reason: 'محتوى سريع تفاعلي'
    },
    'YouTube': {
      patterns: [/شرح|طريقة/, /كيف|كيفية/, /افضل طريقة/, /مقارنة|مقارن/, /دليل|guide/, /تعليم|شرح/],
      priority: 4,
      reason: 'محتوى تعليمي'
    },
    'LinkedIn': {
      patterns: [/وكالة|شركة/, /مدير|خبير/, /استشار|consultant/, /B2B/, /مهني|احترافي/, /توظيف|وظائف/],
      priority: 3,
      reason: 'استهداف مهني'
    },
    'Snapchat': {
      patterns: [/قريب مني/, /24 ساعة/, /عاجل|فوري/, /محلي/, /جغرافي/, /سريع/],
      priority: 2,
      reason: 'استهداف جغرافي سريع'
    }
  };

  // تصنيف كلمة واحدة
  function classifyKeyword(keyword) {
    const scores = {};
    
    Object.entries(PLATFORM_RULES).forEach(([platform, rule]) => {
      let score = 0;
      rule.patterns.forEach(pattern => {
        if (pattern.test(keyword)) score += rule.priority;
      });
      if (score > 0) scores[platform] = { score, reason: rule.reason };
    });

    // ترتيب حسب النتيجة وإرجاع أفضل منصتين
    const sorted = Object.entries(scores)
      .sort(([,a], [,b]) => b.score - a.score)
      .slice(0, 2);
    
    return sorted.length > 0 ? sorted : [['Google Ads', { score: 1, reason: 'افتراضي' }]];
  }

  // تطبيق التصنيف على مجموعة كلمات
  function classifyKeywords(keywords) {
    return keywords.map(kw => ({
      keyword: kw,
      platforms: classifyKeyword(kw)
    }));
  }

  // ربط مع النظام الحالي
  if (typeof displayKeywords === 'function') {
    const _origDisplay = displayKeywords;
    window.displayKeywords = function(keywords, matchType) {
      const classified = classifyKeywords(keywords);
      window.currentClassified = classified; // حفظ للتصدير
      
      const keywordsDiv = document.getElementById('keywordsContent');
      keywordsDiv.innerHTML = '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center"></div>';
      const container = keywordsDiv.firstElementChild;

      classified.forEach(({keyword, platforms}, i) => {
        const pill = document.createElement('span');
        pill.innerHTML = `${keyword} <small style="opacity:0.7">[${platforms.map(([p]) => p).join('/')}]</small>`;
        pill.className = i < 20 ? 'pill pill-ai' : i < 40 ? 'pill pill-expert' : 'pill pill-premium';
        container.appendChild(pill);
      });

      document.getElementById('keywordStats').innerHTML = `
        🔑 <strong>${keywords.length}</strong> كلمة ذكية مصنفة • 
        🎯 نوع المطابقة: <strong>${matchType === 'mixed' ? 'مزيج' : matchType === 'phrase' ? 'عبارة' : matchType === 'broad' ? 'واسعة' : 'تامة'}</strong> • 
        📱 مصنفة تلقائياً لكل منصة
      `;
    };
  }

  // تطوير تصدير XLSX ليتضمن التصنيف
  if (typeof exportXLSX === 'function') {
    const _origExport = exportXLSX;
    window.exportXLSX = function() {
      if (!window.XLSX || typeof XLSX.writeFile !== 'function') {
        exportCSV();
        return;
      }

      try {
        const wb = XLSX.utils.book_new();
        const now = new Date();
        const countryData = BENCHMARKS[currentData.country] || BENCHMARKS['السعودية'];

        // ورقة الملخص
        const summaryData = [
          ['🎯 ملخص الحملة المصنفة', ''],
          ['', ''],
          ['المجال', currentData.field],
          ['الدولة', currentData.country],
          ['العملة', countryData.currency],
          ['اللهجة', currentData.dialect === 'classical' ? 'العربية الفصحى' : `لهجة ${currentData.country}`],
          ['الميزانية الإجمالية', `${currentData.budget} ${countryData.currency}`],
          ['نوع المطابقة', currentData.matchType],
          ['مستوى التوسع', currentData.expansion],
          ['المنصات المختارة', currentData.platforms.join(' • ')],
          ['تاريخ التوليد', now.toLocaleDateString('ar-SA')],
          ['وقت التوليد', now.toLocaleTimeString('ar-SA')],
          ['', ''],
          ['إجمالي الكلمات', currentKeywords.length],
          ['إجمالي السلبية', currentNegatives.length],
          ['طريقة التوليد', 'تحكم يدوي + ذكاء اصطناعي + تصنيف منصات']
        ];

        const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(wb, wsSummary, 'ملخص الحملة');

        // ورقة الكلمات المصنفة
        const keywordRows = [['الكلمة', 'نوع المطابقة', 'الأولوية', 'المنصات المناسبة', 'سبب التصنيف']];
        
        if (window.currentClassified) {
          window.currentClassified.forEach(({keyword, platforms}, i) => {
            const priority = i < 20 ? 'عالية' : i < 40 ? 'متوسطة' : 'منخفضة';
            const platformList = platforms.map(([p]) => p).join(' / ');
            const reason = platforms[0] ? platforms[0][1].reason : 'عام';
            keywordRows.push([keyword, currentData.matchType, priority, platformList, reason]);
          });
        } else {
          currentKeywords.forEach((kw, i) => {
            const priority = i < 20 ? 'عالية' : 'متوسطة';
            keywordRows.push([kw, currentData.matchType, priority, 'Google Ads', 'افتراضي']);
          });
        }

        const wsKeywords = XLSX.utils.aoa_to_sheet(keywordRows);
        XLSX.utils.book_append_sheet(wb, wsKeywords, 'الكلمات المصنفة');

        // ورقة السلبية
        const negativeRows = [['الكلمة السلبية', 'السبب', 'الأولوية']];
        currentNegatives.forEach(neg => {
          negativeRows.push([neg, 'تقليل الهدر', 'عالية']);
        });

        const wsNegatives = XLSX.utils.aoa_to_sheet(negativeRows);
        XLSX.utils.book_append_sheet(wb, wsNegatives, 'الكلمات السلبية');

        // ورقة الاستراتيجية المحسنة
        const strategyRows = [['المنصة', 'نوع الإعلان المقترح', 'الهدف', 'الميزانية المخصصة', 'CPM المتوقع', 'عدد الكلمات المناسبة']];
        const budgetPerPlatform = currentData.budget / currentData.platforms.length;

        currentData.platforms.forEach(platform => {
          const cpm = countryData.cmp[platform] || 2;
          let adType = 'إعلان عام', goal = 'زيادة الوعي';
          
          if (platform === 'Google Ads') {
            adType = 'بحث محلي + خرائط';
            goal = 'تحويلات مباشرة';
          } else if (platform === 'Facebook') {
            adType = 'Lead Generation + Carousel';
            goal = 'توليد عملاء محتملين';
          } else if (platform === 'Instagram') {
            adType = 'Reels + Stories';
            goal = 'زيادة الوعي والتفاعل';
          } else if (platform === 'TikTok') {
            adType = 'Short Video Ads';
            goal = 'الوصول للجيل الجديد';
          } else if (platform === 'YouTube') {
            adType = 'In-Stream + Discovery';
            goal = 'شرح وتوعية';
          } else if (platform === 'LinkedIn') {
            adType = 'Sponsored Content';
            goal = 'استهداف مهني B2B';
          } else if (platform === 'Snapchat') {
            adType = 'Geo Filters';
            goal = 'استهداف جغرافي سريع';
          }

          // حساب عدد الكلمات المناسبة لهذه المنصة
          const suitableCount = window.currentClassified ? 
            window.currentClassified.filter(({platforms}) => 
              platforms.some(([p]) => p === platform)
            ).length : 0;

          strategyRows.push([platform, adType, goal, `${Math.round(budgetPerPlatform)} ${countryData.currency}`, `$${cpm.toFixed(2)}`, suitableCount || 'كلمات عامة']);
        });

        const wsStrategy = XLSX.utils.aoa_to_sheet(strategyRows);
        XLSX.utils.book_append_sheet(wb, wsStrategy, 'استراتيجية مصنفة');

        const fileName = `Classified-${currentData.field.replace(/\\s+/g,'-')}-${Date.now()}.xlsx`;
        XLSX.writeFile(wb, fileName);

        alert('✅ تم تنزيل ملف XLSX مع تصنيف المنصات!');

      } catch (error) {
        console.error('خطأ XLSX:', error);
        exportCSV();
      }
    };
  }

  console.log('✅ تم تفعيل محرك تصنيف المنصات');
})();