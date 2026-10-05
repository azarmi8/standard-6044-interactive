// Shared deterministic assessment engine for Standard 6044 v1.
window.AssessmentEngine = (() => {
  const KEY = 'standard6044-assessment-v1';
  const questions = [
    {id:'q01',unit:'06',type:'mcq',difficulty:'L2',source:'فصل ۶، بندهای 6-1 تا 6-5',prompt:'کدام مورد برای سفارش بتن، بخشی از اطلاعات فنی موردنیاز است؟',options:['مشخصات فنی/ترکیب بتن و رده مقاومت','رنگ کامیون','نام راننده به‌تنهایی','ساعت ناهار آزمایشگاه'],answer:0,explanation:'سفارش باید بر مبنای مشخصات فنی یا ترکیب و اطلاعات لازم برای تولید و تحویل قابل ردیابی باشد.'},
    {id:'q02',unit:'07',type:'truefalse',difficulty:'L2',source:'فصل ۷، بند 7-12، جدول ۱',prompt:'حداکثر دمای تحویل بتن در این استاندارد ۳۲ درجه سلسیوس است.',answer:true,explanation:'در فصل ۷ و جدول مربوط به دمای تحویل، حداکثر دمای تحویل ۳۲ درجه سلسیوس ذکر شده است.'},
    {id:'q03',unit:'08',type:'sequence',difficulty:'L3',source:'فصل ۸، بند 8-3',prompt:'ترتیب درست کنترل نمونه‌برداری از تخلیه بتن را انتخاب کنید.',options:['نمونه اول → نمونه دوم → بررسی فاصله زمانی','بررسی فاصله زمانی → نمونه دوم → نمونه اول','نمونه دوم → نمونه اول → صدور گواهی'],answer:['first','second','interval'],labels:{first:'نمونه‌برداری در حدود ۱۵٪ تخلیه',second:'نمونه‌برداری در حدود ۸۵٪ تخلیه',interval:'کنترل فاصله حداکثر ۱۵ دقیقه'},explanation:'دو نمونه در حدود ۱۵٪ و ۸۵٪ تخلیه گرفته می‌شوند و فاصله زمانی بین دو نمونه نباید بیش از ۱۵ دقیقه باشد.'},
    {id:'q04',unit:'10',type:'numeric',difficulty:'L3',source:'فصل ۱۰، بند 10-5',prompt:'اگر چگالی مشخص‌شده ۲۴۲۰ kg/m³ و چگالی اندازه‌گیری‌شده ۲۴۰۰ kg/m³ باشد، اختلاف چند kg/m³ است و آیا در حد ۲۵ kg/m³ قرار می‌گیرد؟',answer:20,tolerance:0,explanation:'اختلاف قدرمطلق ۲۰ kg/m³ است و از حد ۲۵ kg/m³ بیشتر نیست.'},
    {id:'q05',unit:'11',type:'mcq',difficulty:'L4',source:'فصل ۱۱، بند 11-2',prompt:'برای سه نتیجه متوالی، کدام ترکیب شرط انطباق مقاومت فشاری صحیح است؟',options:['میانگین سه نتیجه حداقل fc و هیچ نتیجه منفرد کمتر از 0.9fc نباشد','فقط بیشترین نتیجه از fc بیشتر باشد','فقط یک نتیجه برابر fc باشد','همه نتایج باید دقیقاً برابر fc باشند'],answer:0,explanation:'هر دو شرط باید برقرار باشند: میانگین سه نتیجه متوالی کمتر از مقاومت مشخصه نباشد و هیچ نتیجه منفرد کمتر از ۰٫۹ مقاومت مشخصه نباشد.'},
    {id:'q06',unit:'14',type:'scenario',difficulty:'L4',source:'فصل ۱۴، بندهای 14-1 و 14-2',prompt:'در بازرسی واحد تولیدی، مواد و طرح اختلاط کنترل می‌شوند اما صلاحیت کارکنان و سوابق کنترل ناقص‌اند. تصمیم آموزشی درست چیست؟',options:['سیستم کنترل تولید کامل است','سیستم کنترل تولید هنوز شواهد کامل ندارد','بدون بررسی بیشتر گواهی قطعی صادر شود'],answer:1,explanation:'این تمرین بر کامل بودن شواهد کنترل تولید تمرکز دارد؛ نتیجه آن گواهی رسمی نیست.'},
    {id:'q07',unit:'15',type:'scenario',difficulty:'L4',source:'فصل ۱۵ و پیوست F',prompt:'شواهد آزمون، کنترل تولید و سوابق کامل‌اند، اما در سناریو فرض شده ارزیابی نهاد ذی‌صلاح لازم است و هنوز انجام نشده. نتیجه چیست؟',options:['زنجیره برای ارزیابی کامل است','یک بخش از زنجیره ارزیابی هنوز انجام نشده','یک نتیجه آزمایش منفرد جایگزین ارزیابی می‌شود'],answer:1,explanation:'وقتی ارزیابی نهاد ذی‌صلاح در سناریو لازم فرض شده، نبود آن یعنی زنجیره ارزیابی هنوز کامل نیست.'},
    {id:'q08',unit:'17',type:'numeric',difficulty:'L4',source:'پیوست ب، بند B-2',prompt:'برای مقاومت مشخصه fc=30 MPa و انحراف معیار s=4 MPa، با رابطه fcm = fc + 1.34s مقاومت فشاری هدف چقدر است؟',answer:35.36,tolerance:0.001,explanation:'۳۰ + ۱٫۳۴×۴ = ۳۵٫۳۶ مگاپاسکال. این یک محاسبه آموزشی مستقیماً بر مبنای رابطه پیوست ب است.'}
  ];
  function getState(){ try{return JSON.parse(localStorage.getItem(KEY))||{answers:{},scores:{},completed:0};}catch{return {answers:{},scores:{},completed:0};} }
  function save(s){localStorage.setItem(KEY,JSON.stringify(s));}
  function grade(q,value){
    if(q.type==='numeric') return Math.abs(Number(value)-q.answer)<=q.tolerance;
    if(q.type==='sequence') return JSON.stringify(value)===JSON.stringify(q.answer);
    return value===q.answer;
  }
  function submit(id,value){
    const q=questions.find(x=>x.id===id); if(!q) return null;
    const s=getState(), correct=grade(q,value);
    s.answers[id]={value,correct}; save(s); return {correct,explanation:q.explanation};
  }
  function summary(){
    const s=getState(), results=questions.map(q=>({q, ...(s.answers[q.id]||{answered:false,correct:false})}));
    const answered=results.filter(x=>x.answered!==false && x.value!==undefined).length;
    const correct=results.filter(x=>x.correct).length;
    const byUnit={};
    results.forEach(x=>{byUnit[x.q.unit]??={correct:0,total:0}; byUnit[x.q.unit].total++; if(x.correct)byUnit[x.q.unit].correct++;});
    const weak=Object.entries(byUnit).filter(([,v])=>v.correct<v.total).sort((a,b)=>(a[1].correct/a[1].total)-(b[1].correct/b[1].total)).map(([unit])=>unit);
    return {total:questions.length,answered,correct,percent:Math.round(correct/questions.length*100),byUnit,weak,recommendations:weak.map(u=>'مرور فصل/واحد '+u)};
  }
  function reset(){localStorage.removeItem(KEY);}
  return {questions,grade,submit,summary,getState,reset};
})();