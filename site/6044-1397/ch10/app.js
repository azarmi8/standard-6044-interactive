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
    const root=document.getElementById('cards'); if(!root)return;
    const items=[
      ['measurement','اسلامپ','S1 → S4','25 / 70 / 125 / 185 mm'],
      ['scc','SCC / SF','SF0 → SF3','500 / 600 / 700 / 800 mm'],
      ['air','هوا','روش آزمون + معیار','کنترل درصد هوا'],
      ['temperature','دما','ASTM C1064/C1064M','زمان + محل + محموله'],
      ['density','چگالی','ISIRI 3203-6','اختلاف ≤ 25 kg/m³'],
      ['decision','تصمیم QC','خاصیت → آزمون → معیار','نتیجه + ردیابی']
    ];
    const icons=[
      '<path d="M52 88L82 88 75 158 59 158Z" fill="#93aaa4"/><path d="M49 88H85M55 101H79M57 122H77M59 143H75" stroke="#2bf2ad" stroke-width="5" fill="none"/><line x1="95" y1="88" x2="95" y2="162" stroke="#e8f4f0" stroke-width="6"/><line x1="88" y1="162" x2="102" y2="162" stroke="#2bf2ad" stroke-width="6"/>',
      '<circle cx="80" cy="125" r="55" fill="none" stroke="#2bf2ad" stroke-width="5"/><circle cx="80" cy="125" r="34" fill="none" stroke="#27c5de" stroke-width="3" stroke-dasharray="8 7"/><path d="M25 125H135M80 70V180" stroke="#6f9188" stroke-width="2"/>',
      '<circle cx="80" cy="125" r="56" fill="none" stroke="#2bf2ad" stroke-width="6"/><path d="M80 125L115 97" stroke="#27c5de" stroke-width="8" stroke-linecap="round"/><text x="80" y="136" text-anchor="middle" fill="#eaf7f3" font-size="25" font-weight="900">AIR</text>',
      '<path d="M80 78v86" stroke="#27c5de" stroke-width="12" stroke-linecap="round"/><circle cx="80" cy="172" r="22" fill="#2bf2ad"/><path d="M80 95V58" stroke="#8ea9a1" stroke-width="4"/><path d="M63 58h34" stroke="#8ea9a1" stroke-width="4"/>',
      '<path d="M43 98Q80 78 117 98V163Q80 184 43 163Z" fill="#647a74" stroke="#2bf2ad" stroke-width="5"/><path d="M50 104Q80 120 110 104" fill="none" stroke="#d9e8e3" stroke-width="4"/><path d="M57 135H103" stroke="#27c5de" stroke-width="4"/>',
      '<rect x="28" y="83" width="104" height="84" rx="12" fill="#10242b" stroke="#2bf2ad" stroke-width="5"/><path d="M45 105h70M45 125h48M45 145h62" stroke="#7eaaa0" stroke-width="5" stroke-linecap="round"/><circle cx="109" cy="126" r="11" fill="#2bf2ad"/>'
    ];
    root.innerHTML=items.map((v,k)=>{
      const x=45+k*250,active=k===index;
      return '<g class="scene-object fresh-card" data-scene-role="'+v[0]+'" data-beat="'+(k+1)+'" transform="translate('+x+' 0)">'+
        '<rect x="0" y="195" width="215" height="330" rx="24" fill="#101f27" stroke="#28505a" stroke-width="2"/>'+
        '<rect x="0" y="195" width="215" height="6" rx="3" fill="'+(active?'#2bf2ad':'#21424a')+'"/>'+
        '<circle cx="31" cy="235" r="16" fill="'+(active?'#2bf2ad':'#19373b')+'"/>'+
        '<text x="31" y="241" text-anchor="middle" fill="'+(active?'#062018':'#9eb7af')+'" font-size="13" font-weight="900">'+(k+1)+'</text>'+
        '<g transform="translate(67 255)" '+(active?'filter="url(#'+((document.querySelector(".stage svg defs[data-tech-defs]")||{}).dataset?.prefix||"tech")+'-glowfx)"':'')+'>'+v[4]+'</g>'+
        '<text x="107" y="430" text-anchor="middle" fill="#edf7f3" font-size="22" font-weight="900">'+v[1]+'</text>'+
        '<text x="107" y="463" text-anchor="middle" fill="#8fa9a2" font-size="15">'+v[2]+'</text>'+
        '<text x="107" y="495" text-anchor="middle" fill="'+(active?'#2bf2ad':'#9bb0aa')+'" font-size="14" font-weight="'+(active?'800':'600')+'">'+v[3]+'</text>'+
      '</g>';
    }).join('');
    const q=document.getElementById('q'),sub=document.getElementById('sub');
    if(q)q.textContent=b.title;
    if(sub)sub.textContent='خاصیت → روش آزمون → معیار → ثبت';
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