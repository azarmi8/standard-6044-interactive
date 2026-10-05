window.BOOK_CONFIG = {
  interval: 5000,
  beats: [
    {title:'مسئولیت تولیدکننده',body:'کنترل تولید فقط کار آزمایشگاه نیست؛ فصل مسئولیت تولیدکننده را در چارچوب یک سیستم کنترل تولید مطرح می‌کند.',spokenText:'کنترل تولید فقط کار آزمایشگاه نیست. مسئولیتش با تولیدکننده‌ست و باید به شکل یک سیستم کامل اجرا بشه.'},
    {title:'سیستم کنترل تولید',body:'سیستم کنترل تولید باید روش‌ها و کنترل‌های لازم برای تولید را دربرگیرد و شواهد اجرای آن‌ها قابل ثبت و بازیابی باشد.',spokenText:'سیستم کنترل تولید یعنی روش داشته باشیم، کنترل انجام بدیم و بعد بتونیم مدرک و سابقه‌اش رو پیدا کنیم.'},
    {title:'مواد و تجهیزات',body:'مواد اولیه و تجهیزات تولید باید کنترل شوند. ارتباط این کنترل با فصل ۴ و فصل ۱۳ باعث می‌شود زنجیره از ورودی تا تولید قطع نشود.',spokenText:'مواد اولیه و تجهیزات رو از زنجیره جدا نمی‌کنیم. کنترلشون باید به فصل مصالح و الزامات تأسیسات وصل باشه.'},
    {title:'آزمون اولیه و طرح اختلاط',body:'آزمون اولیه و طرح اختلاط بخشی از شواهد توانایی تولید بتن مطابق مشخصات موردنظر هستند؛ تغییرات مواد یا شرایط باید در سیستم دیده شوند.',spokenText:'آزمون اولیه و طرح اختلاط باید نشون بدن که این خط تولید واقعاً می‌تونه بتن موردنظر رو بسازه. تغییر مواد یا شرایط هم باید وارد سیستم کنترل بشه.'},
    {title:'صلاحیت کارکنان',body:'صلاحیت و توانایی کارکنان در اجرای فعالیت‌های مرتبط با تولید و کنترل باید در سیستم کنترل تولید دیده شود.',spokenText:'نیروی انسانی هم بخشی از کنترل تولیده. باید معلوم باشه چه کسی برای چه کاری صلاحیت و توانایی لازم رو داره.'},
    {title:'سوابق و ردیابی',body:'سوابق آزمون، تولید، مواد، تجهیزات و تصمیم‌ها باید قابل ردیابی باشند. یک سیستم خوب باید بتواند نشان دهد «چه چیزی، چه زمانی، توسط چه کسی و با چه شواهدی» کنترل شده است.',spokenText:'آخر کار باید بتونیم جواب بدیم چی کنترل شده، کی کنترلش کرده، چه زمانی و با چه مدرکی. این یعنی ردیابی واقعی.'}
  ],
  quiz:{correct:'درست — فصل ۱۴ یک سیستم است، نه یک برگه آزمایش.',incorrect:'کافی نیست — ارزیابی کنترل تولید به شواهد و سوابق سیستم نیاز دارد.'},
  onRender(index,beat) {
    const q=document.getElementById('q'),sub=document.getElementById('sub'),cards=document.getElementById('cards');
    if(q)q.textContent=beat.title||'';
    if(sub)sub.textContent='CONTROL ROOM / INPUTS → PROCESS → EVIDENCE';
    if(!cards)return;
    const items=[
      ['مسئولیت','OWNER','MFG'],
      ['روش‌ها','PROCESS','SOP'],
      ['مواد و تجهیزات','INPUT','ASSET'],
      ['آزمون اولیه','VALIDATE','MIX'],
      ['صلاحیت','PEOPLE','SKILL'],
      ['سوابق','TRACE','EVIDENCE']
    ];
    cards.innerHTML=items.map((v,k)=>{
      const active=k===index,x=35+k*248;
      return '<g class="scene-object control-pod" data-beat="'+(k+1)+'" transform="translate('+x+' 0)">'+
       '<rect x="0" y="190" width="215" height="330" rx="24" fill="#101f27" stroke="'+(active?'#2bf2ad':'#28505a')+'" stroke-width="'+(active?'3':'2')+'"/>'+
       '<rect x="0" y="190" width="215" height="7" rx="3" fill="'+(active?'#2bf2ad':'#21424a')+'"/>'+
       '<circle cx="29" cy="229" r="15" fill="'+(active?'#2bf2ad':'#19373b')+'"/><text x="29" y="234" text-anchor="middle" fill="'+(active?'#062018':'#9eb7af')+'" font-size="12" font-weight="900">'+(k+1)+'</text>'+
       '<rect x="42" y="270" width="130" height="90" rx="16" fill="#0b171d" stroke="#2b4f57" stroke-width="2"/>'+
       '<path d="M58 292h96M58 316h72M58 340h84" stroke="'+(active?'#2bf2ad':'#5c7c75')+'" stroke-width="6" stroke-linecap="round"/>'+
       '<circle cx="150" cy="316" r="10" fill="'+(active?'#27c5de':'#33524f')+'"/>'+
       '<text x="107" y="405" text-anchor="middle" fill="#edf7f3" font-size="20" font-weight="900">'+v[0]+'</text>'+
       '<text x="107" y="443" text-anchor="middle" fill="#91aaa2" font-size="14">'+v[1]+' / '+v[2]+'</text>'+
       '<text x="107" y="480" text-anchor="middle" fill="'+(active?'#2bf2ad':'#8fa9a2')+'" font-size="13" font-weight="800">'+(active?'ACTIVE CONTROL':'REQUIRED EVIDENCE')+'</text>'+
      '</g>';
    }).join('');
  }
};