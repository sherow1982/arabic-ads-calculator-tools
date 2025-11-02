// Arabic Marketing Chatbot - Enhanced Intelligence v2.0
// البوت الذكي للحاسبات العربية - نسخة محسّنة مع ذكاء متقدم

class EnhancedArabicMarketingBot {
    constructor() {
        this.responses = {
            // التحيات المتنوعة
            greetings: {
                egyptian: ['أهلاً وسهلاً! 😊 إزيك؟ عايز مساعدة في إيه النهارده؟', 'أهلاً بيك! 👋 عامل إيه؟ قولي محتاج أي حاسبة', 'السلام عليكم! 🌟 أهلاً بيك في أدواتنا المجانية'],
                gulf: ['هلا وغلا! 👋 شلونك؟ وش تحتاج من أدواتنا؟', 'حياك الله! 😊 كيف الحال؟ أي أداة تبيها اليوم؟', 'أهلاً وسهلاً! 🌟 مرحبا بك'],
                levantine: ['أهلاً فيك! 😊 كيفك؟ شو بدك تحسب اليوم؟', 'مرحبا! 👋 كيف الحال؟ أي أداة بتحتاج؟', 'السلام عليكم! 🌟 أهلاً وسهلاً'],
                moroccan: ['أهلاً وسهلاً! 👋 كيداير؟ أش كاين من الأدوات؟', 'مرحبا بيك! 😊 واش باغي تحسب اليوم؟', 'السلام عليكم! 🌟 أهلاً وسهلاً'],
                standard: ['أهلاً وسهلاً بك! 👋 كيف يمكنني مساعدتك اليوم؟', 'السلام عليكم ورحمة الله وبركاته! 😊', 'مرحباً! 🌟 أي من أدواتنا المجانية تحتاج؟']
            },
            
            // إجابات الأدوات المفصلة
            tools: {
                cpc: {
                    main: 'حاسبة CPC - الأداة الأكثر استخداماً! 💰',
                    details: ['تحسب تكلفة النقرة الواحدة على جميع المنصات', 'تعطيك مقارنة مع معايير الصناعة', 'نصائح لخفض التكلفة وزيادة الكفاءة', 'تتبع دقيق للنتائج مع تحليلات مفصلة'],
                    url: 'cpc-calculator.html',
                    icon: '💰',
                    tips: 'نصيحة: معدل CPC الجيد في السوق العربي أقل من 0.5 ريال للنقرة 🎯'
                },
                
                roi: {
                    main: 'حاسبة ROI - لقياس عائد الاستثمار بدقة! 📈',
                    details: ['قياس دقيق لربحية حملاتك', 'مقارنة مع معايير السوق العربي', 'تحليل مفصل للأرباح والخسائر', 'توصيات لتحسين العائد'],
                    url: 'roi-calculator.html',
                    icon: '📈',
                    tips: 'نصيحة: ROI أكبر من 200% يعتبر ممتاز في السوق العربي! 🚀'
                },
                
                roas: {
                    main: 'حاسبة ROAS الجديدة - عائد الإنفاق الإعلاني! 🔥',
                    details: ['تحسب عائد كل ريال تنفقه على الإعلانات', 'مقارنة مع معايير صناعتك المحددة', 'تحليل صافي الربح ونقطة التعادل', 'نصائح مخصصة لتحسين الأداء حسب المنطقة'],
                    url: 'roas-calculator.html',
                    icon: '🔥',
                    tips: 'جديد! ROAS أكبر من 4.0 ممتاز للتجارة الإلكترونية 🎯'
                },
                
                keywords: {
                    main: 'مولد الكلمات المفتاحية العربي - أحدث أدواتنا! 🔑',
                    details: ['يولد مئات الكلمات المفتاحية العربية مجاناً', 'دعم جميع اللهجات المحلية', 'تصنيف ذكي: مترابطة، أسئلة، طويلة الذيل، تجارية، محلية', 'تصدير CSV مباشر وربط مع مقدر المزايدة'],
                    url: 'keyword-generator.html',
                    icon: '🔑',
                    tips: 'جديد! يدعم الكلمات المحلية لكل منطقة عربية 🌍'
                },
                
                budget: {
                    main: 'مخطط الميزانية الذكي - وزع فلوسك بذكاء! 📊',
                    details: ['توزيع ذكي للميزانية على المنصات المختلفة', 'حسابات دقيقة حسب أهدافك التسويقية', 'مقارنة تكاليف المنصات في السوق العربي', 'توصيات محسوبة بناءً على صناعتك'],
                    url: 'budget-planner.html',
                    icon: '📊',
                    tips: 'نصيحة: ابدأ بـ 70% Google Ads و30% Meta Ads للاختبار 💡'
                },
                
                competition: {
                    main: 'محلل المنافسة - شوف وين واقف في السوق! 🔍',
                    details: ['تحليل شامل لأداء منافسيك', 'مقارنة معدلاتك مع معايير السوق', 'اكتشاف نقاط القوة والضعف', 'استراتيجيات للتفوق على المنافسين'],
                    url: 'competition-analyzer.html', 
                    icon: '🔍',
                    tips: 'نصيحة: راقب منافسيك كل أسبوع لتحافظ على تقدمك 📈'
                },
                
                utm: {
                    main: 'مولد UTM - اتتبع مصادر زياراتك بدقة! 🔗',
                    details: ['إنشاء روابط UTM احترافية', 'تتبع دقيق لكل حملة ومصدر', 'تصنيف تلقائي للمصادر والوسائط', 'دعم جميع منصات التحليل'],
                    url: 'utm-generator.html',
                    icon: '🔗',
                    tips: 'نصيحة: استخدم UTM لكل رابط تنشره عشان تعرف أي مصدر يجيبلك عملاء 📊'
                },
                
                whatsapp: {
                    main: 'مولد واتساب - رسائل احترافية جاهزة! 💬', 
                    details: ['قوالب رسائل احترافية لكل المناسبات', 'رسائل تسويقية مؤثرة', 'رسائل خدمة عملاء جاهزة', 'دعم الرموز التعبيرية والتنسيق'],
                    url: 'whatsapp-generator.html',
                    icon: '💬',
                    tips: 'نصيحة: الرسائل الشخصية تحقق معدل رد 300% أعلى من الرسائل العامة 📱'
                }
            },
            
            // أسئلة شائعة وإجاباتها
            faqs: {
                'ما الفرق بين roi و roas': 'سؤال ممتاز! 🤔\n\n📈 **ROI** = (الربح - الاستثمار) ÷ الاستثمار × 100\n📊 **ROAS** = الإيرادات ÷ الإنفاق الإعلاني\n\n🎯 **ROI** يقيس الربح الصافي\n💰 **ROAS** يقيس إجمالي الإيرادات\n\nمثال: لو أنفقت 1000 ريال وحققت 5000 ريال إيرادات بتكلفة إنتاج 2000:\n• ROAS = 5.0 (ممتاز!)\n• ROI = 200% (ممتاز أيضاً!)\n\n<a href="roi-calculator.html">احسب ROI</a> | <a href="roas-calculator.html">احسب ROAS</a>',
                
                'أي منصة أفضل للإعلان': 'يعتمد على هدفك وجمهورك! 🎯\n\n🇸🇦 **الخليج**: Google Ads (بحث) + Snapchat (شباب)\n🇪🇬 **مصر**: Facebook + Instagram (الأكثر استخداماً)\n🇯🇴 **الشام**: Facebook + TikTok (نمو سريع)\n🇲🇦 **المغرب**: Facebook + YouTube\n\n💡 **نصيحة**: ابدأ باختبار 3 منصات بميزانية صغيرة ثم ركز على الأفضل\n\n<a href="budget-planner.html">خطط ميزانيتك</a> | <a href="competition-analyzer.html">حلل السوق</a>',
                
                'كيف أحسن ctr': 'CTR منخفض؟ إليك الحلول! ⚡\n\n✅ **العنوان**: استخدم أرقام وأسئلة ("كيف تربح 5000 ريال؟")\n✅ **الصورة**: وجوه بشرية تحقق CTR أعلى بـ 40%\n✅ **CTA**: "اشترِ الآن" بدلاً من "تعرف أكثر"\n✅ **التوقيت**: 8-10 ص و7-9 م أفضل أوقات\n✅ **الاستهداف**: كلما ضيقت الجمهور كلما زاد CTR\n\n🎯 **معايير جيدة**:\n• Google: 2-5%\n• Facebook: 1-2%\n• Instagram: 0.5-1%\n\n<a href="ctr-calculator.html">احسب CTR الحالي</a>',
                
                'ميزانية كم أحتاج': 'الميزانية تختلف حسب هدفك! 💰\n\n🏪 **متجر إلكتروني صغير**: 2000-5000 ريال/شهر\n🏢 **خدمات مهنية**: 1500-3000 ريال/شهر\n🏘️ **عقارات**: 3000-8000 ريال/شهر\n💊 **صحة وتجميل**: 2500-6000 ريال/شهر\n🎓 **تعليم**: 1000-2500 ريال/شهر\n\n📊 **توزيع مقترح**:\n• 60% Google Ads (بحث)\n• 30% Meta (Facebook + Instagram)\n• 10% تجربة منصات جديدة\n\n<a href="budget-planner.html">خطط ميزانيتك الآن</a>',
                
                'كلمات مفتاحية لمطعم': 'كلمات ممتازة لمطعمك! 🍽️\n\n🔥 **كلمات أساسية**:\n• مطعم + [اسم المدينة]\n• طعام + [نوع المأكولات] + توصيل\n• أفضل مطعم + [المنطقة]\n• وجبات سريعة قريب مني\n\n❓ **أسئلة شائعة**:\n• أين أقرب مطعم؟\n• ما أفضل مطعم في [المدينة]؟\n• مطاعم توصيل مجاني\n\n🏷️ **كلمات محلية**:\n• مطعم الرياض\n• توصيل طعام الدمام\n• مطاعم دبي مول\n\n<a href="keyword-generator.html">ولّد المزيد من الكلمات</a>',
                
                'كيف أزيد المبيعات': 'استراتيجيات مضمونة لزيادة المبيعات! 🚀\n\n🎯 **حسن الاستهداف**:\n• استخدم Lookalike Audiences\n• استهدف العملاء السابقين (Retargeting)\n• اضبط الوقت والموقع بدقة\n\n💡 **حسن الإعلان**:\n• استخدم الأرقام ("خصم 50%")\n• إضافة مراجعات العملاء\n• صور منتجات عالية الجودة\n• CTA واضح وقوي\n\n📊 **اختبر وقس**:\n• A/B Test للعناوين والصور\n• راقب معدلات التحويل\n• حلل بيانات GA4\n\n<a href="campaign-optimizer.html">احصل على نصائح مخصصة</a>',
                
                'أفضل وقت للإعلان': 'التوقيت مهم جداً! ⏰\n\n🇸🇦 **السعودية والخليج**:\n• الصباح: 8:00-11:00 ص\n• المساء: 7:00-10:00 م\n• الجمعة والسبت الأفضل\n\n🇪🇬 **مصر**:\n• بعد المغرب: 6:00-9:00 م\n• الصباح: 9:00-12:00 ص\n• تجنب أوقات الذروة المرورية\n\n📱 **حسب المنصة**:\n• Facebook: 1:00-4:00 م\n• Instagram: 8:00-9:00 ص\n• TikTok: 6:00-10:00 م\n• LinkedIn: 10:00-12:00 ص\n\n💡 **نصيحة**: اختبر أوقات مختلفة لمدة أسبوع وشوف أي وقت يجيب نتائج أفضل'
            },
            
            // ردود الأخطاء والمشاكل الشائعة
            troubleshooting: {
                'إعلاني ما يشتغل': 'لا تقلق! هذه مشاكل شائعة وحلولها سهلة 🔧\n\n❌ **مشاكل شائعة**:\n\n🎯 **الاستهداف واسع جداً**\n✅ الحل: ضيق الجمهور لـ 50-200 ألف شخص\n\n💰 **الميزانية قليلة**\n✅ الحل: على الأقل 50 ريال يومياً لنتائج واضحة\n\n📱 **الإعلان مو جذاب**\n✅ الحل: استخدم وجوه بشرية وألوان زاهية\n\n⏰ **التوقيت غلط**\n✅ الحل: إعلن وقت 7-10 مساءً\n\n<a href="campaign-optimizer.html">شخص مشكلتك</a>',
                
                'النتائج ضعيفة': 'النتائج الضعيفة لها أسباب محددة! 📊\n\n🔍 **احتمالات السبب**:\n\n1️⃣ **الاستهداف غير دقيق** (70% من المشاكل)\n   ▶️ ضيق الجمهور أكثر\n   ▶️ استخدم Interests أكثر تحديداً\n\n2️⃣ **الإبداع ضعيف** (20%)\n   ▶️ غير الصور والعناوين\n   ▶️ جرب فيديوهات قصيرة\n\n3️⃣ **صفحة الهبوط سيئة** (10%)\n   ▶️ تأكد من سرعة التحميل\n   ▶️ حسن تجربة المستخدم\n\n🎯 **خطة إصلاح فورية**:\n<a href="competition-analyzer.html">1. حلل منافسيك</a>\n<a href="keyword-generator.html">2. جدد كلماتك</a>\n<a href="budget-planner.html">3. أعد توزيع الميزانية</a>'
            },
            
            // نصائح متقدمة
            advanced: {
                'كيف أحسن التحويل': 'تحسين التحويل فن وعلم! 🎨🧪\n\n🎯 **صفحة الهبوط**:\n• تطابق رسالة الإعلان 100%\n• CTA واضح وبارز (أخضر أو برتقالي)\n• تحميل أقل من 3 ثواني\n• نموذج بسيط (3-5 حقول كحد أقصى)\n\n💬 **الثقة والأمان**:\n• شهادات العملاء مع صور حقيقية\n• أرقام هواتف وعناوين واضحة\n• شهادات أمان SSL\n• ضمان استرداد الأموال\n\n📱 **التجربة المحمولة**:\n• تصميم متجاوب\n• أزرار كبيرة للمس\n• تحميل سريع\n\n<a href="cvr-calculator.html">احسب معدل التحويل الحالي</a>',
                
                'ازاي أوفر في الإعلانات': 'توفير الفلوس مع نفس النتائج! 💡\n\n💰 **استراتيجيات الحفظ**:\n\n🎯 **الاستهداف الذكي**:\n• Lookalike 1% بدلاً من 10%\n• استهداف العملاء السابقين (أرخص بـ 70%)\n• استبعاد المحولين\n\n⏰ **التوقيت المناسب**:\n• تجنب المواسم عالية المنافسة\n• إعلن في أيام الأسبوع (أرخص من الويك إند)\n\n📱 **المنصة المناسبة**:\n• TikTok: الأرخص للشباب\n• Google: الأغلى لكن الأكثر دقة\n• Facebook: متوسط السعر والدقة\n\n<a href="budget-planner.html">خطط ميزانية محكمة</a>'
            },
            
            // عبارات التشجيع والدعم
            encouragement: [
                'أنت على الطريق الصحيح! 💪 المسوقين الناجحين يسألون كتير',
                'سؤال ذكي! 🧠 هذا النوع من التفكير يخليك تتقدم على منافسيك',
                'ما شاء الله عليك! 🌟 واضح إنك مسوق طموح ومجتهد',
                'برافو! 👏 هذا السؤال يدل على فهم عميق للتسويق',
                'تسلم! 🙌 أسئلة زي دي تخلي النتائج أحسن بكتير'
            ],
            
            // ردود المساعدة العامة
            help: {
                general: 'أكيد هساعدك! 🤝 عندنا 19 أداة مجانية:\n\n💰 **حاسبات الأداء**: CPC، ROI، ROAS، CPA، CTR، CVR، هامش الربح\n📊 **أدوات التخطيط**: الميزانية، الجمهور، المحتوى، الانطباعات\n🔑 **أدوات التوليد**: الكلمات المفتاحية، UTM، واتساب\n🔍 **أدوات التحليل**: المنافسة، تحسين الحملات، التكرار، مزايدة الكلمات\n🚨 **الخدمات الذكية**: التنبيهات، البوت الذكي\n\nقولي محتاج أي حاجة محددة؟ 🎯',
                
                tools_list: '🛠️ **قائمة كاملة بأدواتنا الـ 19**:\n\n**📊 حاسبات الأداء (7)**:\n• <a href="cpc-calculator.html">CPC</a> - تكلفة النقرة\n• <a href="roi-calculator.html">ROI</a> - عائد الاستثمار\n• <a href="roas-calculator.html">ROAS</a> - عائد الإنفاق\n• <a href="cpa-calculator.html">CPA</a> - تكلفة العميل\n• <a href="ctr-calculator.html">CTR</a> - معدل النقر\n• <a href="cvr-calculator.html">CVR</a> - معدل التحويل\n• <a href="profit-margin-calculator.html">هامش الربح</a>\n\n**🔑 أدوات التوليد (3)**:\n• <a href="keyword-generator.html">مولد الكلمات</a> 🆕\n• <a href="utm-generator.html">مولد UTM</a>\n• <a href="whatsapp-generator.html">مولد واتساب</a>\n\n**📈 باقي الأدوات**: <a href="all-tools.html">شوف الكل</a>'
            }
        };
        
        this.dialectPatterns = {
            egyptian: ['عايز', 'عاوز', 'ايه', 'اللي', 'انت', 'دي', 'دا', 'ازاي', 'فين', 'امتى'],
            gulf: ['ودي', 'وش', 'شلون', 'وين', 'متى', 'زين', 'يالله', 'حق', 'مال'],
            levantine: ['بدي', 'شو', 'كيف', 'وين', 'ايمتى', 'هيك', 'معك', 'هون'],
            moroccan: ['بغيت', 'شنو', 'كيفاش', 'فين', 'فوقاش', 'هادي', 'هادا'],
            standard: ['أريد', 'ماذا', 'كيف', 'أين', 'متى', 'هذه', 'هذا']
        };
        
        this.currentConversation = [];
        this.userPreferences = {
            preferredDialect: null,
            favoriteTools: [],
            lastUsedTool: null
        };
    }
    
    detectDialect(text) {
        const lowerText = text.toLowerCase();
        let dialectScores = {};
        
        // Score each dialect
        for (const [dialect, patterns] of Object.entries(this.dialectPatterns)) {
            dialectScores[dialect] = patterns.filter(pattern => lowerText.includes(pattern)).length;
        }
        
        // Return dialect with highest score
        const topDialect = Object.entries(dialectScores).reduce((a, b) => 
            dialectScores[a[0]] > dialectScores[b[0]] ? a : b
        )[0];
        
        return dialectScores[topDialect] > 0 ? topDialect : 'standard';
    }
    
    generateIntelligentResponse(userMessage) {
        const dialect = this.detectDialect(userMessage);
        const lowerMsg = userMessage.toLowerCase();
        
        // Store user preferences
        if (!this.userPreferences.preferredDialect) {
            this.userPreferences.preferredDialect = dialect;
        }
        
        this.currentConversation.push({user: userMessage, dialect: dialect, timestamp: Date.now()});
        
        // Complex pattern matching
        const response = this.matchComplexPatterns(lowerMsg, dialect);
        if (response) return response;
        
        // Tool-specific requests
        const toolResponse = this.matchToolRequests(lowerMsg, dialect);
        if (toolResponse) return toolResponse;
        
        // FAQ matching
        const faqResponse = this.matchFAQs(lowerMsg, dialect);
        if (faqResponse) return faqResponse;
        
        // Greeting detection
        if (this.isGreeting(lowerMsg)) {
            return this.getRandomResponse(this.responses.greetings[dialect]) + 
                   '\n\n🎯 جرب تكتب حاجة زي:\n• "عايز أحسب ROI"\n• "كيف أحسن إعلاناتي"\n• "محتاج كلمات لمطعمي"';
        }
        
        // Help requests
        if (this.isHelpRequest(lowerMsg)) {
            return this.responses.help.general;
        }
        
        // Default intelligent response
        return this.getContextualDefaultResponse(lowerMsg, dialect);
    }
    
    matchComplexPatterns(message, dialect) {
        // Budget questions
        if (this.containsAny(message, ['ميزانية', 'budget', 'فلوس', 'مصاري', 'كام', 'كم', 'تكلفة'])) {
            if (this.containsAny(message, ['مطعم', 'مطاعم', 'restaurant'])) {
                return this.responses.faqs['ميزانية كم أحتاج'].replace('متجر إلكتروني', 'مطعم') + 
                       '\n\n🍽️ **خاص للمطاعم**: ركز على Google Maps والإعلانات المحلية';
            }
            return this.responses.faqs['ميزانية كم أحتاج'];
        }
        
        // Performance improvement questions
        if (this.containsAny(message, ['تحسين', 'أحسن', 'زيادة', 'رفع', 'improve', 'increase'])) {
            if (this.containsAny(message, ['ctr', 'نقر', 'كليك'])) {
                return this.responses.faqs['كيف أحسن ctr'];
            }
            if (this.containsAny(message, ['مبيعات', 'sales', 'تحويل', 'conversion'])) {
                return this.responses.faqs['كيف أزيد المبيعات'];
            }
        }
        
        // Timing questions
        if (this.containsAny(message, ['وقت', 'متى', 'timing', 'schedule', 'توقيت'])) {
            return this.responses.faqs['أفضل وقت للإعلان'];
        }
        
        // Comparison questions
        if (this.containsAny(message, ['فرق', 'مقارنة', 'difference', 'compare']) && 
            this.containsAny(message, ['roi', 'roas'])) {
            return this.responses.faqs['ما الفرق بين roi و roas'];
        }
        
        // Platform questions
        if (this.containsAny(message, ['منصة', 'platform', 'أفضل', 'أحسن']) && 
            this.containsAny(message, ['فيسبوك', 'google', 'تيك توك', 'سناب'])) {
            return this.responses.faqs['أي منصة أفضل للإعلان'];
        }
        
        return null;
    }
    
    matchToolRequests(message, dialect) {
        // Exact tool matches
        const toolPatterns = {
            cpc: ['cpc', 'تكلفة النقرة', 'نقرة', 'كليك', 'click'],
            roi: ['roi', 'عائد', 'return', 'استثمار', 'ربح'],
            roas: ['roas', 'عائد الإنفاق', 'return on ad spend'],
            cpa: ['cpa', 'تكلفة', 'عميل', 'اكتساب', 'acquisition'],
            keywords: ['كلمات', 'keywords', 'مفتاحية', 'بحث', 'keyword'],
            budget: ['ميزانية', 'budget', 'توزيع', 'تخطيط', 'planning'],
            competition: ['منافسة', 'مقارنة', 'competition', 'competitor'],
            utm: ['utm', 'تتبع', 'tracking', 'رابط', 'link'],
            whatsapp: ['واتساب', 'whatsapp', 'رسائل', 'messages']
        };
        
        for (const [tool, patterns] of Object.entries(toolPatterns)) {
            if (patterns.some(pattern => message.includes(pattern))) {
                const toolData = this.responses.tools[tool];
                if (toolData) {
                    const encouragement = this.getRandomResponse(this.responses.encouragement);
                    return `${encouragement}\n\n${toolData.icon} **${toolData.main}**\n\n${toolData.details.map((detail, index) => `${index + 1}. ${detail}`).join('\n')}\n\n💡 ${toolData.tips}\n\n<a href="${toolData.url}" style="background:#667eea;color:white;padding:10px 20px;border-radius:20px;text-decoration:none;display:inline-block;margin:10px 0;">✨ جرب الأداة الآن</a>`;
                }
            }
        }
        
        return null;
    }
    
    matchFAQs(message, dialect) {
        // Check against stored FAQs
        for (const [question, answer] of Object.entries(this.responses.faqs)) {
            if (this.messageMatches(message, question)) {
                return answer;
            }
        }
        
        // Troubleshooting
        if (this.containsAny(message, ['مو شغال', 'ما يشتغل', 'not working', 'مشكلة', 'خربان'])) {
            return this.responses.troubleshooting['إعلاني ما يشتغل'];
        }
        
        if (this.containsAny(message, ['ضعيف', 'سيء', 'مو كويس', 'bad', 'poor', 'weak'])) {
            return this.responses.troubleshooting['النتائج ضعيفة'];
        }
        
        return null;
    }
    
    getContextualDefaultResponse(message, dialect) {
        // Provide contextual help based on current page
        const currentTool = this.detectCurrentTool();
        
        const contextResponses = {
            'cpc-calculator': `أنت في حاسبة CPC! 💰\n\n🎯 **استخدمها لـ**:\n• حساب تكلفة النقرة الواحدة\n• مقارنة أداءك مع السوق\n• تحسين حملاتك\n\n💡 **نصيحة سريعة**: CPC أقل من 0.5 ريال ممتاز في السوق العربي\n\n<a href="roi-calculator.html">جرب حاسبة ROI</a> | <a href="budget-planner.html">خطط ميزانيتك</a>`,
            
            'roi-calculator': `أنت في حاسبة ROI! 📈\n\n🎯 **فايدتها**:\n• تعرف إذا كانت حملاتك مربحة\n• تقارن بين الحملات المختلفة\n• تاخد قرارات مبنية على بيانات\n\n🎪 **معايير النجاح**:\n• ROI أكبر من 100% = مربح\n• ROI أكبر من 200% = ممتاز\n• ROI أكبر من 400% = استثنائي\n\n<a href="roas-calculator.html">جرب ROAS الجديد</a>`,
            
            'default': this.getSmartDefaultResponse(message, dialect)
        };
        
        return contextResponses[currentTool] || contextResponses['default'];
    }
    
    getSmartDefaultResponse(message, dialect) {
        const responses = {
            egyptian: [
                'مش فاهم السؤال بالظبط 🤔 بس عندنا أدوات كتير مفيدة!\n\n🔥 **الأكثر استخداماً**:\n• <a href="cpc-calculator.html">حاسبة CPC</a>\n• <a href="roi-calculator.html">حاسبة ROI</a>\n• <a href="keyword-generator.html">مولد الكلمات الجديد</a>\n\nقولي محتاج أي حاجة محددة؟',
                'ممكن توضحلي أكتر؟ 🤨 عشان أقدر أساعدك صح\n\n💡 **جرب تقول**:\n• "عايز أحسب CPC"\n• "محتاج كلمات لشركتي"\n• "عايز أعرف ROI"\n\n<a href="all-tools.html">أو شوف كل الأدوات</a>'
            ],
            gulf: [
                'وش قصدك بالضبط؟ 🤔 حاب أساعدك بأفضل طريقة\n\n🌟 **أدوات مشهورة**:\n• <a href="budget-planner.html">مخطط الميزانية</a>\n• <a href="competition-analyzer.html">محلل المنافسة</a>\n• <a href="keyword-generator.html">مولد الكلمات</a>\n\nوش رايك نجرب وحدة منها؟',
                'ما فهمت السؤال زين 😅 بس عندنا حلول واجد!\n\n💪 **أدوات قوية**:\n• حاسبات دقيقة\n• مخططات ذكية\n• مولدات احترافية\n\n<a href="all-tools.html">تعال شوف الكل</a>'
            ],
            standard: [
                'لم أفهم السؤال تماماً 🤔 هل يمكنك إعادة الصياغة؟\n\n💡 **أمثلة على الأسئلة**:\n• "أريد حساب ROI"\n• "كيف أحسن إعلاناتي"\n• "أحتاج كلمات مفتاحية"\n\n<a href="all-tools.html">أو تصفح جميع أدواتنا</a>',
                'يمكنني مساعدتك بشكل أفضل إذا حددت حاجتك 🎯\n\n🚀 **خدماتنا الرائجة**:\n• حاسبات الأداء والتكلفة\n• أدوات التخطيط الذكية\n• مولدات المحتوى\n\nما رأيك نبدأ بواحدة منها؟'
            ]
        };
        
        const dialectResponses = responses[dialect] || responses.standard;
        return this.getRandomResponse(dialectResponses);
    }
    
    // Utility functions
    containsAny(text, words) {
        return words.some(word => text.includes(word));
    }
    
    messageMatches(message, pattern) {
        const messageWords = message.split(' ');
        const patternWords = pattern.split(' ');
        return patternWords.every(word => messageWords.includes(word));
    }
    
    isGreeting(text) {
        const greetings = ['سلام', 'أهلا', 'مرحب', 'هاي', 'هلا', 'اهلين', 'صباح', 'مساء', 'السلام عليكم'];
        return greetings.some(greeting => text.includes(greeting));
    }
    
    isHelpRequest(text) {
        const helpWords = ['مساعد', 'ساعد', 'help', 'أدوات', 'شرح', 'فهم', 'explain', 'قائمة', 'list'];
        return helpWords.some(word => text.includes(word));
    }
    
    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    detectCurrentTool() {
        const path = window.location.pathname;
        if (path.includes('cpc-calculator')) return 'cpc-calculator';
        if (path.includes('roi-calculator')) return 'roi-calculator';
        if (path.includes('roas-calculator')) return 'roas-calculator';
        if (path.includes('keyword-generator')) return 'keyword-generator';
        if (path.includes('budget-planner')) return 'budget-planner';
        return 'default';
    }
    
    // Public method to get response
    getResponse(userMessage) {
        if (!userMessage || userMessage.trim().length === 0) {
            return 'اكتب رسالة عشان أقدر أساعدك! 😊';
        }
        
        return this.generateIntelligentResponse(userMessage.trim());
    }
    
    // Get conversation suggestions
    getSuggestions() {
        const currentTool = this.detectCurrentTool();
        const suggestions = {
            'keyword-generator': [
                'كيف أستخدم مولد الكلمات؟',
                'أريد كلمات لمطعمي',
                'كلمات مفتاحية للعقارات'
            ],
            'cpc-calculator': [
                'كيف أقلل CPC؟',
                'ما هو CPC الجيد؟',
                'مقارنة CPC بين المنصات'
            ],
            'default': [
                'عايز أحسب ROI',
                'محتاج كلمات مفتاحية',
                'كيف أحسن إعلاناتي؟',
                'أي منصة أفضل؟'
            ]
        };
        
        return suggestions[currentTool] || suggestions.default;
    }
}

// Initialize enhanced bot
if (typeof window !== 'undefined') {
    window.EnhancedArabicBot = new EnhancedArabicMarketingBot();
    
    // Enhanced chat integration
    document.addEventListener('DOMContentLoaded', function() {
        const miniChatInput = document.getElementById('miniChatInput');
        const miniChatSend = document.getElementById('miniChatSend');
        const miniChatMessages = document.getElementById('miniChatMessages');
        
        if (miniChatInput && miniChatSend && miniChatMessages) {
            // Add suggestions on focus
            miniChatInput.addEventListener('focus', function() {
                if (this.value === '') {
                    const suggestions = window.EnhancedArabicBot.getSuggestions();
                    this.placeholder = `جرب: "${suggestions[0]}" أو "${suggestions[1]}"`;
                }
            });
            
            // Enhanced send function  
            function sendEnhancedMessage() {
                const message = miniChatInput.value.trim();
                if (!message) return;
                
                // Add user message
                addChatMessage(message, false);
                miniChatInput.value = '';
                
                // Show typing indicator
                const typingDiv = document.createElement('div');
                typingDiv.innerHTML = '<div style="background: #f3f4f6; padding: 8px 12px; border-radius: 10px; margin: 8px 0; font-size: 13px; color: #666;">🤖 يكتب...</div>';
                miniChatMessages.appendChild(typingDiv);
                miniChatMessages.scrollTop = miniChatMessages.scrollHeight;
                
                // Generate enhanced response
                setTimeout(() => {
                    miniChatMessages.removeChild(typingDiv);
                    const response = window.EnhancedArabicBot.getResponse(message);
                    addChatMessage(response, true);
                    
                    // Track enhanced chat
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'enhanced_chat_interaction', {
                            event_category: 'Enhanced Chatbot',
                            event_label: message.substring(0, 30),
                            tool_context: window.location.pathname
                        });
                    }
                }, Math.random() * 1000 + 800); // Realistic typing delay
            }
            
            function addChatMessage(text, isBot = false) {
                const msgDiv = document.createElement('div');
                const bgColor = isBot ? '#f3f4f6' : '#667eea';
                const textColor = isBot ? '#374151' : 'white';
                const align = isBot ? 'left' : 'right';
                const marginClass = isBot ? 'margin-right: 20px;' : 'margin-left: 20px;';
                
                msgDiv.innerHTML = `<div style="background: ${bgColor}; color: ${textColor}; padding: 10px 14px; border-radius: 15px; margin: 10px 0; font-size: 14px; line-height: 1.5; text-align: ${align}; ${marginClass} word-wrap: break-word;">${text}</div>`;
                miniChatMessages.appendChild(msgDiv);
                miniChatMessages.scrollTop = miniChatMessages.scrollHeight;
            }
            
            miniChatSend.addEventListener('click', sendEnhancedMessage);
            miniChatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendEnhancedMessage();
            });
        }
    });
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedArabicMarketingBot;
}