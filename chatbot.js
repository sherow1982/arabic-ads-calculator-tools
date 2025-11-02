// Arabic Marketing Chatbot with Multi-Dialect Support
// مساعد الحاسبات العربي - يدعم جميع اللهجات العربية

class ArabicMarketingBot {
    constructor() {
        this.dialects = {
            egyptian: ['عايز', 'عاوز', 'ايه', 'اللي', 'انت', 'دي', 'دا'],
            gulf: ['ودي', 'وش', 'شلون', 'هاي', 'زين', 'يالله'],
            levantine: ['بدي', 'شو', 'كيف', 'هيك', 'معك', 'هون'],
            moroccan: ['بغيت', 'شنو', 'كيفاش', 'هادي', 'هادا', 'فين'],
            standard: ['أريد', 'ماذا', 'كيف', 'هذه', 'هذا', 'أين']
        };
        
        this.toolMappings = {
            cpc: {
                keywords: ['cpc', 'تكلفة النقرة', 'نقرة', 'كليك'],
                url: 'cpc-calculator.html',
                name: 'حاسبة CPC',
                icon: '💰'
            },
            roi: {
                keywords: ['roi', 'عائد', 'ربح', 'استثمار', 'خسارة'],
                url: 'roi-calculator.html', 
                name: 'حاسبة ROI',
                icon: '📈'
            },
            cpa: {
                keywords: ['cpa', 'تكلفة الاكتساب', 'عميل', 'اكتساب'],
                url: 'cpa-calculator.html',
                name: 'حاسبة CPA', 
                icon: '🎯'
            },
            budget: {
                keywords: ['ميزانية', 'budget', 'توزيع', 'فلوس', 'مصاري'],
                url: 'budget-planner.html',
                name: 'مخطط الميزانية',
                icon: '📊'
            },
            utm: {
                keywords: ['utm', 'تتبع', 'رابط', 'tracking'],
                url: 'utm-generator.html',
                name: 'مولد UTM',
                icon: '🔗'
            },
            whatsapp: {
                keywords: ['واتساب', 'whatsapp', 'رسائل', 'رسالة'],
                url: 'whatsapp-generator.html',
                name: 'مولد واتساب',
                icon: '💬'
            }
        };
    }
    
    detectDialect(text) {
        const lowerText = text.toLowerCase();
        
        for (const [dialect, words] of Object.entries(this.dialects)) {
            if (words.some(word => lowerText.includes(word))) {
                return dialect;
            }
        }
        
        return 'standard';
    }
    
    generateResponse(userMessage) {
        const dialect = this.detectDialect(userMessage);
        const lowerMsg = userMessage.toLowerCase();
        
        // Check for tool-specific requests
        for (const [tool, config] of Object.entries(this.toolMappings)) {
            if (config.keywords.some(keyword => lowerMsg.includes(keyword))) {
                return this.getToolResponse(tool, config, dialect);
            }
        }
        
        // Greetings
        if (this.isGreeting(lowerMsg)) {
            return this.getGreetingResponse(dialect);
        }
        
        // Help requests
        if (this.isHelpRequest(lowerMsg)) {
            return this.getHelpResponse(dialect);
        }
        
        // Default response
        return this.getDefaultResponse(dialect);
    }
    
    isGreeting(text) {
        const greetings = ['سلام', 'أهلا', 'مرحب', 'هاي', 'هلا', 'اهلين'];
        return greetings.some(greeting => text.includes(greeting));
    }
    
    isHelpRequest(text) {
        const helpWords = ['مساعد', 'ساعد', 'help', 'أدوات', 'شرح'];
        return helpWords.some(word => text.includes(word));
    }
    
    getToolResponse(tool, config, dialect) {
        const responses = {
            egyptian: `${config.icon} زي ما تحب! دي من أفضل أدواتنا`,
            gulf: `${config.icon} زين! هذي أداة ممتازة`,
            levantine: `${config.icon} تمام! هاي أداة كتير منيحة`,
            moroccan: `${config.icon} واخا! هادي أداة زوينة`,
            standard: `${config.icon} ممتاز! هذه أداة رائعة`
        };
        
        return `${responses[dialect] || responses.standard}<br><br><a href="${config.url}" target="_blank" style="background:#667eea;color:white;padding:8px 16px;border-radius:20px;text-decoration:none;">${config.name} →</a>`;
    }
    
    getGreetingResponse(dialect) {
        const greetings = {
            egyptian: 'أهلاً وسهلاً! 😊 عاملين إيه؟ عايز مساعدة في أي حاسبة؟',
            gulf: 'هلا وغلا! 👋 شلونك؟ ودك مساعدة بأي أداة؟',
            levantine: 'أهلاً فيك! 😊 كيفك؟ بدك مساعدة بشي أداة؟',
            moroccan: 'أهلاً وسهلاً! 👋 كيداير؟ بغيتي مساعدة في شي أداة؟',
            standard: 'أهلاً وسهلاً! 👋 كيف يمكنني مساعدتك في حاسبات الإعلانات؟'
        };
        
        return greetings[dialect] || greetings.standard;
    }
    
    getHelpResponse(dialect) {
        const responses = {
            egyptian: '🤝 اكيد هساعدك! عندنا 12 أداة مجانية:\n\n📊 حاسبات: CPC, ROI, CPA, CTR\n📈 مخططات: الميزانية والمحتوى\n🔗 مولدات: UTM وواتساب\n\nقولني عايز إيه!',
            gulf: '🤝 أكيد بساعدك! عندنا 12 أداة مجانية:\n\n📊 حاسبات: CPC, ROI, CPA\n📈 مخططات ذكية\n🔗 مولدات الروابط\n\nقول وش تبي!',
            standard: '🤝 بالطبع! عندنا 12 أداة مجانية لتحسين إعلاناتك:\n\n📊 الحاسبات الأساسية\n📈 أدوات التخطيط\n🔗 مولدات الروابط\n\nما الذي تحتاجه؟'
        };
        
        return responses[dialect] || responses.standard;
    }
    
    getDefaultResponse(dialect) {
        const responses = {
            egyptian: 'مش فاهم السؤال كده 😅 بس عندنا أدوات كتير مفيدة!\n\n<a href="all-tools.html">شوف كل الأدوات →</a>',
            gulf: 'ما فهمت السؤال زين 😅 بس عندنا أدوات وايد حلوة!\n\n<a href="all-tools.html">شوف كل الأدوات →</a>',
            standard: 'لم أفهم السؤال تماماً 😅 لكن يمكنك تصفح جميع أدواتنا!\n\n<a href="all-tools.html">عرض كل الأدوات →</a>'
        };
        
        return responses[dialect] || responses.standard;
    }
}

// Initialize global bot instance
if (typeof window !== 'undefined') {
    window.ArabicMarketingBot = new ArabicMarketingBot();
    
    // Auto-greet after 3 seconds if chatbot is opened
    setTimeout(() => {
        const chatWindow = document.getElementById('chatbotWindow') || document.getElementById('miniChatWindow');
        if (chatWindow && chatWindow.style.display === 'block') {
            // Auto-greeting logic here if needed
        }
    }, 3000);
}

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArabicMarketingBot;
}