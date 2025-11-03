<!— PATCH: sort by popularity + enforce 20–50 keywords —>
<script>
// تقدير شيوع الكلمة (Heuristics محلية قابلة للتوسيع لاحقاً بمصدر خارجي)
function popularityScore(kw){
  let score = 0;
  // إشارات نية قوية
  if(/اسعار|تكلفة|سعر/.test(kw)) score += 9;
  if(/افضل|أفضل|احسن/.test(kw)) score += 8;
  if(/قريب مني|في\s+\S+/.test(kw)) score += 7;
  if(/حجز|طلب|رقم|اتصال/.test(kw)) score += 7;
  if(/24\s*ساعة|اليوم|فوري/.test(kw)) score += 6;
  if(/عروض|خصومات/.test(kw)) score += 5;
  if(/مع\s+التأمين|تغليف|فك وتركيب|رافعة|تخزين/.test(kw)) score += 4;
  // طول العبارة: 2-4 كلمات شائع
  const wc = kw.trim().split(/\s+/).length; 
  if(wc>=2 && wc<=4) score += 2; else if(wc>6) score -= 1;
  return score;
}

// فرز حسب الأكثر شيوعاً
function sortByPopularity(keywords){
  return [...keywords].sort((a,b)=>popularityScore(b)-popularityScore(a));
}

// ضمان الحد الأدنى والأقصى 20–50 كلمة
function enforceCount(keywords){
  const MIN=20, MAX=50;
  const uniq=[...new Set(keywords)];
  // لو أقل من 20 نكرر قوالب من الأعلى شيوعاً بإضافات بسيطة جغرافية/خدمية
  if(uniq.length<MIN){
    const boosters=['قريب مني','اليوم','24 ساعة','افضل','رخيص'];
    let i=0;
    while(uniq.length<MIN && i<keywords.length){
      const base=keywords[i%keywords.length].replace(/\s+\(.*\)$/,'');
      boosters.forEach(b=>{ if(uniq.length<MIN) uniq.push(base+" "+b); });
      i++;
    }
  }
  // لو أكثر من 50 نقتطع مع الحفاظ على الأعلى شيوعاً
  if(uniq.length>MAX){
    return sortByPopularity(uniq).slice(0,MAX);
  }
  return sortByPopularity(uniq);
}

// نقاط التكامل مع الصفحة الحالية
// 1) عند توليد currentKeywords استبدل:
// currentKeywords = enforceCount(generateSmartKeywords(...));
// 2) بعد كل توليد، أعد عرض الكلمات بنفس الترتيب الجديد.
</script>
