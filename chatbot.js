// Arabic Multi-Dialect Marketing Assistant Chatbot
class ArabicMarketingBot {
    constructor() {
        this.responses = {
            // Greeting responses for different dialects
            greetings: {
                formal: 'أهلاً وسهلاً! 👋 كيف يمكنني مساعدتك في التسويق اليوم؟',
                gulf: 'هلا وغلا! 👋 شلونك؟ أقدر أساعدك بأدوات التسويق!',
                egyptian: 'أهلاً وسهلاً! 😊 عامل إيه؟ عايز أساعدك في إعلاناتك ازاي؟',
                levantine: 'مرحبا! 👋 كيفك وشلونك؟ بدك مساعدة بالتسويق؟',
                moroccan: 'أهلا بيك! 😊 كيفاش راك؟ بغيت معونة ف الإشهار؟'
            },
            
            // Tool recommendations
            tools: {
                adGenerator: {
                    title: '🎨 مولد الإعلانات بالذكاء الاصطناعي',
                    url: './tools/ai-ad-generator.html',
                    description: 'هيعمل لك إعلانات رائعة لجميع المنصات!',
                    keywords: ['إعلان', 'اعلان', 'عايز إعلان', 'بدي إعلان', 'عاوز', 'بغيت']
                },
                keywords: {
                    title: '🔑 مولد الكلمات المفتاحية',
                    url: './tools/arabic-keywords.html',
                    description: 'هيديك كلمات محلية وترندي!',
                    keywords: ['كلمات', 'كلمة', 'بحث', 'seo', 'كيورد']
                },
                roi: {
                    title: '💰 حاسبة العائد على الاستثمار',
                    url: './tools/roi-calculator.html',
                    description: 'اعرف لو حملتك مربحة ولا لأ!',
                    keywords: ['roi', 'عائد', 'ربح', 'خسارة', 'فلوس', 'مال']
                },
                ramadan: {
                    title: '🌙 مخطط الحملات الرمضانية',
                    url: './tools/ramadan-planner.html',
                    description: 'استعد لرمضان باستراتيجية محكمة!',
                    keywords: ['رمضان', 'الشهر الكريم', 'إفطار', 'سحور']
                },
                hashtags: {
                    title: '📱 مولد الهاشتاجات التريندية',
                    url: './tools/trending-hashtags.html',
                    description: 'هاشتاجات عربية رايجة حالياً!',
                    keywords: ['هاشتاج', 'hashtag', '#', 'تاج', 'هاش']
                },
                speed: {
                    title: '⚡ محلل سرعة صفحات الهبوط',
                    url: './tools/landing-speed.html',
                    description: 'علشان موقعك يبقى أسرع!',
                    keywords: ['سرعة', 'بطء', 'تحميل', 'موقع']
                },
                competitor: {
                    title: '🔍 محلل الإعلانات التنافسية',
                    url: './tools/competitor-ads.html',
                    description: 'اعرف إيه اللي بيعمله منافسينك!',
                    keywords: ['منافس', 'منافسين', 'competitor', 'منافسه']
                },
                shipping: {
                    title: '🚚 حاسبة الشحن المُحسنة',
                    url: './tools/shipping-calculator.html',
                    description: 'حسابات شحن دقيقة للخليج!',
                    keywords: ['شحن', 'توصيل', 'shipping', 'توصيلة']
                },
                pricing: {
                    title: '🏷️ مُحسن الأسعار التنافسية',
                    url: './tools/price-optimizer.html',
                    description: 'أحسن أسعار تنافسية!',
                    keywords: ['أسعار', 'اسعار', 'تسعير', 'price', 'ثمن']
                },
                dashboard: {
                    title: '📊 لوحة التحكم الشاملة',
                    url: './tools/dashboard.html',
                    description: 'شوف كل حملاتك في مكان واحد!',
                    keywords: ['لوحة', 'dashboard', 'تحكم', 'إحصائيات']
                },
                personas: {
                    title: '🧠 مولد شخصيات العملاء',
                    url: './tools/buyer-personas.html', 
                    description: 'اعرف عملائك بالتفصيل!',
                    keywords: ['عملاء', 'جمهور', 'شخصيات', 'personas', 'عميل']
                },
                clv: {
                    title: '📊 حاسبة قيمة العميل',
                    url: './tools/clv-calculator.html',
                    description: 'اعرف قيمة عملائك الحقيقية!',
                    keywords: ['clv', 'قيمة العميل', 'عمر العميل']
                }
            },
            
            // Common responses for different dialects
            dialectResponses: {
                help_gulf: 'زين أقدر أساعدك! 😊',
                help_egyptian: 'أكيد هساعدك فوراً! 🚀',
                help_levantine: 'أكيد منعونك! بشو بدك مساعدة? 🤝',
                help_moroccan: 'بطبيعة غنعاونك! أشنو بغيتي? 👍'
            }
        };
        
        this.conversationHistory = this.loadConversationHistory();
        this.lastDialectDetected = 'formal';
    }
    
    detectDialect(message) {
        const msg = message.toLowerCase();
        
        // Gulf dialect indicators
        if (msg.includes('هلا') || msg.includes('شلون') || msg.includes('وين') || msg.includes('عادي') || msg.includes('زين')) {
            return 'gulf';
        }
        
        // Egyptian dialect indicators  
        if (msg.includes('عايز') || msg.includes('عامل إيه') || msg.includes('ازاي') || msg.includes('ليه') || msg.includes('هيه')) {
            return 'egyptian';
        }
        
        // Levantine dialect indicators
        if (msg.includes('بدك') || msg.includes('كيفك') || msg.includes('شلونك') || msg.includes('منيح') || msg.includes('بشو')) {
            return 'levantine';
        }
        
        // Moroccan dialect indicators
        if (msg.includes('بغيت') || msg.includes('كيفاش') || msg.includes('راك') || msg.includes('بغيتي') || msg.includes('فين')) {
            return 'moroccan';
        }
        
        return this.lastDialectDetected || 'formal';
    }
    
    generateResponse(userMessage) {
        const dialect = this.detectDialect(userMessage);
        this.lastDialectDetected = dialect;
        const msg = userMessage.toLowerCase();
        
        // Check for tool-specific queries
        for (const [toolKey, tool] of Object.entries(this.responses.tools)) {
            for (const keyword of tool.keywords) {
                if (msg.includes(keyword)) {
                    return this.formatToolResponse(tool, dialect);
                }
            }
        }
        
        // Greeting responses
        if (msg.includes('سلام') || msg.includes('أهلا') || msg.includes('مرحب') || msg.includes('هاي') || msg.includes('هلا')) {
            return this.responses.greetings[dialect] || this.responses.greetings.formal;
        }
        
        // Help requests
        if (msg.includes('مساعد') || msg.includes('ساعد') || msg.includes('help') || msg.includes('عايز') || msg.includes('بدي') || msg.includes('بغيت')) {
            return this.generateHelpResponse(dialect);
        }
        
        // Default response with tool suggestions
        return this.generateDefaultResponse(dialect);
    }
    
    formatToolResponse(tool, dialect) {
        const dialectGreetings = {
            gulf: 'زين! هذي من أفضل أدواتنا',
            egyptian: 'ممتاز! هادي أحسن أداة للحاجة دي',
            levantine: 'حلو! هاي إلها اللي بدك إياها',
            moroccan: 'زوين! هادي أحسن حاجة عندنا',
            formal: 'ممتاز! هذه من أفضل أدواتنا'
        };
        
        const greeting = dialectGreetings[dialect] || dialectGreetings.formal;
        
        return `${greeting}<br><br>
                <strong>${tool.title}</strong><br>
                ${tool.description}<br><br>
                <a href="${tool.url}" target="_blank" style="background: #2563eb; color: white; padding: 8px 16px; border-radius: 20px; text-decoration: none; display: inline-block;">
                    جرب الآن →
                </a>`;
    }
    
    generateHelpResponse(dialect) {
        const helpIntros = {
            gulf: 'زين والله! أقدر أساعدك بهالأدوات:',
            egyptian: 'أكيد هساعدك! عندنا أحسن الأدوات:',
            levantine: 'بطبيعة منعونك! عنا هاي الأدوات:',
            moroccan: 'بطبيعة غنعاونك! هادي الأدوات ديالنا:',
            formal: 'بكل سرور! هذه أهم أدواتنا:'
        };
        
        const intro = helpIntros[dialect] || helpIntros.formal;
        
        return `${intro}<br><br>
                • <a href="./tools/ai-ad-generator.html" target="_blank">مولد الإعلانات الذكي</a><br>
                • <a href="./tools/competitor-ads.html" target="_blank">محلل المنافسين</a><br>
                • <a href="./tools/roi-calculator.html" target="_blank">حاسبة ROI</a><br>
                • <a href="./tools/clv-calculator.html" target="_blank">حاسبة قيمة العميل</a><br>
                • <a href="./tools/ramadan-planner.html" target="_blank">مخطط رمضان</a><br><br>
                قول ايه اللي محتاجه بالضبط! 🎯`;
    }
    
    generateDefaultResponse(dialect) {
        const defaultIntros = {
            gulf: 'هلا وغلا فيك! 😊',
            egyptian: 'شكراً لسؤالك! 😊',
            levantine: 'منيح سؤالك! 😊',
            moroccan: 'مرحبا بيك! 😊',
            formal: 'شكراً لك! 😊'
        };
        
        const intro = defaultIntros[dialect] || defaultIntros.formal;
        
        return `${intro}<br><br>
                عندنا أكتر من 17 أداة مجانية:<br><br>
                🎯 <a href="./tools/buyer-personas.html" target="_blank">شخصيات العملاء</a><br>
                🚀 <a href="./tools/ai-ad-generator.html" target="_blank">مولد الإعلانات الذكي</a><br>
                📊 <a href="./tools/dashboard.html" target="_blank">لوحة التحكم</a><br>
                🌙 <a href="./tools/ramadan-planner.html" target="_blank">خطط رمضانية</a><br>
                🔑 <a href="./tools/arabic-keywords.html" target="_blank">كلمات مفتاحية</a><br><br>
                قولني ايه اللي محتاجه! 💪`;
    }
    
    saveConversationHistory() {
        localStorage.setItem('arabicMarketingBotHistory', JSON.stringify(this.conversationHistory));
    }
    
    loadConversationHistory() {
        const stored = localStorage.getItem('arabicMarketingBotHistory');
        return stored ? JSON.parse(stored) : [];
    }
    
    addToHistory(userMessage, botResponse, dialect) {
        this.conversationHistory.push({
            timestamp: Date.now(),
            user: userMessage,
            bot: botResponse,
            dialect: dialect
        });
        
        // Keep only last 10 conversations
        if (this.conversationHistory.length > 10) {
            this.conversationHistory = this.conversationHistory.slice(-10);
        }
        
        this.saveConversationHistory();
    }
}

// Initialize bot
const arabicBot = new ArabicMarketingBot();

// Export for global use
if (typeof window !== 'undefined') {
    window.ArabicMarketingBot = arabicBot;
}