window.BOOK_CONFIG={
  interval:5200,
  beats:[
    {title:'اسلامپ و رده S1 تا S4',body:'رده‌بندی اسلامپ باید همراه با مشخصات سفارش خوانده شود؛ عدد اندازه‌گیری‌شده ابتدا در محدوده رده قرار می‌گیرد و سپس نسبت به نیاز سفارش تفسیر می‌شود.',spokenText:'بذار از اسلامپ شروع کنیم. عدد اسلامپ رو می‌گیریم، بعد می‌بینیم تو کدوم رده S قرار می‌گیره و با مشخصات سفارش می‌سنجیم.',sourceRef:'فصل ۱۰، بند ۱۰-۱ و جدول‌های مربوط'},
    {title:'بتن خودتراکم و SF',body:'در بتن خودتراکم، جریان اسلامپ و پارامترهای عملکردی مانند J-ring، L-box، V-funnel و پایداری در موارد مرتبط بررسی می‌شوند.',spokenText:'برای بتن خودتراکم فقط یک عدد کافی نیست. اسلامپ‌فلو رو می‌بینیم و بسته به نیاز، J-ring و L-box و V-funnel و پایداری رو هم بررسی می‌کنیم.',sourceRef:'فصل ۱۰، بند ۱۰-۲'},
    {title:'هوای بتن',body:'مقدار هوای بتن باید همراه با روش آزمون و مشخصات موردنیاز تفسیر شود؛ خودِ عدد بدون دانستن معیار، تصمیم کامل نمی‌سازد.',spokenText:'برای هوا، اول روش آزمون و معیار پروژه رو مشخص می‌کنیم. خود عدد هوا به‌تنهایی جواب قبولی یا رد نمی‌ده.',sourceRef:'فصل ۱۰، بند ۱۰-۳'},
    {title:'دمای بتن تازه',body:'دمای بتن تازه با روش آزمون مرجع کنترل می‌شود و نتیجه باید به زمان، محل و محموله قابل ردیابی باشد.',spokenText:'دما رو با روش آزمون مرجع می‌گیریم و نتیجه باید معلوم کنه مربوط به کدوم محموله، چه زمان و چه محل تحویله.',sourceRef:'فصل ۱۰، بند ۱۰-۴'},
    {title:'چگالی بتن تازه',body:'چگالی طبق ISIRI 3203-6 اندازه‌گیری می‌شود و اختلاف با مقدار مشخص‌شده/درج‌شده در برگه تحویل نباید از 25 kg/m³ بیشتر باشد.',spokenText:'چگالی رو طبق روش مرجع می‌گیریم. اختلافش با مقدار مشخص‌شده نباید بیشتر از ۲۵ کیلوگرم بر مترمکعب باشه.',sourceRef:'فصل ۱۰، بند ۱۰-۵'},
    {title:'تصمیم QC',body:'سه سؤال را هم‌زمان بپرس: چه خاصیتی؟ با چه روش آزمونی؟ نسبت به چه مشخصات یا رده‌ای؟ سپس نتیجه را در سابقه محموله ثبت کن.',spokenText:'برای تصمیم QC سه چیز رو کنار هم بذار: چه خاصیتی رو می‌گیریم، با چه آزمونی، و نسبت به چه معیار یا مشخصاتی. بعد نتیجه رو ثبت کن.',sourceRef:'فصل ۱۰، بندهای ۱۰-۱ تا ۱۰-۵'}
  ],
  scene:{root:'.stage',steps:[
    {className:'slump',focus:{x:16,y:44},progress:.16,show:['measurement']},
    {className:'flow',focus:{x:33,y:44},progress:.33,show:['measurement','scc']},
    {className:'air',focus:{x:50,y:44},progress:.50,show:['scc','air']},
    {className:'temperature',focus:{x:67,y:44},progress:.66,show:['air','temperature']},
    {className:'density',focus:{x:82,y:44},progress:.83,show:['temperature','density']},
    {className:'decision',focus:{x:58,y:62},progress:1,show:['density','decision']}
  ]},
  quiz:{correct:'درست — خاصیت، روش آزمون و معیار باید یک زنجیره واحد باشند.',incorrect:'کافی نیست — عدد بدون خاصیت، روش و معیار قابل تفسیر کامل نیست.'},
  onRender:function(index,b){
    const q=document.getElementById('q'),sub=document.getElementById('sub');
    if(q)q.textContent=b.title||'';
    if(sub)sub.textContent='خاصیت → روش آزمون → معیار → ثبت';
    document.querySelectorAll('[data-stage-beat]').forEach((el,i)=>{
      const active=i===index;
      el.classList.toggle('is-active',active);
      el.setAttribute('aria-current',active?'step':'false');
    });
  }
};

(function(){
 const out=document.getElementById('fresh-sim-output'),btn=document.getElementById('run-fresh-sim'); if(!out||!btn)return;
 btn.addEventListener('click',function(){
  const slump=Number(document.getElementById('slump-input').value),flow=Number(document.getElementById('flow-input').value),measured=Number(document.getElementById('density-measured').value),specified=Number(document.getElementById('density-specified').value);
  const s=window.SimulationEngine.ch10.classifySlump(slump),fl=window.SimulationEngine.ch10.classifyFlow(flow),d=window.SimulationEngine.ch10.density(measured,specified);
  if(!Number.isFinite(slump)||!Number.isFinite(flow)||!d.valid){out.textContent='ورودی‌ها را کامل و معتبر وارد کنید.';out.className='sim-result bad';return;}
  out.innerHTML='<strong>نتیجه سناریو</strong><br>اسلامپ: '+(s||'خارج از دامنه رده‌های تعریف‌شده')+'<br>اسلامپ‌فلو: '+(fl||'خارج از دامنه رده‌های تعریف‌شده')+'<br>اختلاف چگالی: '+d.difference.toFixed(0)+' kg/m³ — '+(d.pass?'در محدوده 25 kg/m³':'بیش از 25 kg/m³');
  out.className='sim-result '+(d.pass?'good':'bad');
 });
})();