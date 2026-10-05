window.BOOK_CONFIG={
  interval:5000,
  beats:[
    {title:'اسلامپ و S1 تا S4',body:'رده‌های اسلامپ در فصل ۱۰: S1 میانگین 25 mm با دامنه 10–40؛ S2 میانگین 70 با دامنه 50–90؛ S3 میانگین 125 با دامنه 100–150؛ S4 میانگین 185 با دامنه 160–210 mm. نتیجه باید در چارچوب رده و مشخصات سفارش تفسیر شود.'},
    {title:'بتن خودتراکم',body:'برای SCC، رده‌های جریان اسلامپ SF0 تا SF3 مطرح‌اند: SF0 میانگین 500 با دامنه 450–550؛ SF1 میانگین 600 با دامنه 560–650؛ SF2 میانگین 700 با دامنه 660–750؛ SF3 میانگین 800 با دامنه 760–850 mm. پارامترهای J-ring، L-box، V-funnel و پایداری نیز در موارد مربوط بررسی می‌شوند.'},
    {title:'هوای بتن',body:'مقدار هوای بتن و حدود/تلرانس آن باید در ارتباط با مشخصات موردنیاز کنترل شود؛ روش آزمون و شرایط نمونه نیز بخشی از زنجیره اندازه‌گیری است.'},
    {title:'دمای بتن',body:'دمای بتن تازه طبق ASTM C1064/C1064M در محتوای این فصل مطرح شده است. زمان و شرایط آزمون باید در سوابق قابل ردیابی باشد.'},
    {title:'چگالی',body:'چگالی بتن تازه طبق ISIRI 3203-6 اندازه‌گیری می‌شود. چگالی اندازه‌گیری‌شده در محل تحویل نباید بیش از 25 kg/m³ با مقدار مشخص‌شده/درج‌شده در برگه تحویل اختلاف داشته باشد.'},
    {title:'تصمیم QC',body:'یک نتیجه تازه باید با سه پرسش خوانده شود: چه خاصیتی؟ با چه روش آزمونی؟ نسبت به چه مشخصات/رده‌ای؟ سپس نتیجه در سابقه محموله ثبت شود.'}
  ],
  quiz:{correct:'درست — خاصیت، روش آزمون و معیار باید با هم دیده شوند.',incorrect:'کافی نیست — عدد بدون زمینه، برای تصمیم انطباق کافی نیست.'},
  onRender:function(index,b){
    const root=document.getElementById('cards'); if(!root)return;
    root.innerHTML=BOOK_CONFIG.beats.map((v,k)=>'<g><rect x="'+(110+k*245)+'" y="220" width="215" height="275" rx="22" fill="'+(k===index?'#173c2a':'#dce9df')+'"/><text x="'+(217+k*245)+'" y="285" font-size="19" font-weight="700" text-anchor="middle" fill="'+(k===index?'#fff':'#173c2a')+'">'+(k+1)+'</text><text x="'+(217+k*245)+'" y="345" font-size="17" text-anchor="middle" fill="'+(k===index?'#fff':'#173c2a')+'">'+v.title+'</text></g>').join('');
    const q=document.getElementById('q'),s=document.getElementById('sub');if(q)q.textContent=b.title;if(s)s.textContent='خاصیت → روش آزمون → معیار → ثبت';
  }
};

(function(){
 const out=document.getElementById('fresh-sim-output');
 const btn=document.getElementById('run-fresh-sim');
 if(!out||!btn)return;
 btn.addEventListener('click',function(){
   const slump=Number(document.getElementById('slump-input').value);
   const flow=Number(document.getElementById('flow-input').value);
   const measured=Number(document.getElementById('density-measured').value);
   const specified=Number(document.getElementById('density-specified').value);
   const s=window.SimulationEngine.ch10.classifySlump(slump);
   const fl=window.SimulationEngine.ch10.classifyFlow(flow);
   const d=window.SimulationEngine.ch10.density(measured,specified);
   if(!Number.isFinite(slump)||!Number.isFinite(flow)||!d.valid){
     out.textContent='ورودی‌ها را کامل و معتبر وارد کنید.';
     out.className='sim-result bad';
     return;
   }
   out.innerHTML='<strong>نتیجه سناریو</strong><br>اسلامپ: '+(s||'خارج از دامنه رده‌های تعریف‌شده')+
     '<br>اسلامپ‌فلو: '+(fl||'خارج از دامنه رده‌های تعریف‌شده')+
     '<br>اختلاف چگالی: '+d.difference.toFixed(0)+' kg/m³ — '+(d.pass?'در محدوده 25 kg/m³':'بیش از 25 kg/m³');
   out.className='sim-result '+(d.pass?'good':'bad');
 });
})();