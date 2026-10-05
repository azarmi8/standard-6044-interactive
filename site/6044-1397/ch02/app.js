window.BOOK_CONFIG={
  interval:5000,
  beats:[
    {title:'منطق ارجاع',body:'مراجع الزامی بخشی از متن الزام‌آور استاندارد هستند. اگر در متن به مرجعی بدون تاریخ انتشار ارجاع شده باشد، آخرین ویرایش و اصلاحیه‌های بعدی آن ملاک است؛ ارجاع تاریخ‌دار، همان نسخه مشخص‌شده را دنبال می‌کند.'},
    {title:'مراجع ملی',body:'فهرست استانداردهای ملی مورد استفاده شامل روش‌های آزمون و الزامات بتن، مصالح، افزودنی‌ها، آب، سنگدانه، کنترل کیفیت و تجهیزات است.'},
    {title:'مراجع ASTM',body:'استاندارد به مجموعه‌ای از مراجع ASTM از جمله C125، C138/C138M، C173/C173M، C231/C231M، C330/C330M، C1064/C1064M، C1077، C1116، C1240، C1611/C1611M و C1797 و نیز ACI 214R ارجاع می‌دهد.'},
    {title:'اصل کنترل نسخه',body:'در یک سیستم حرفه‌ای QC، شماره استاندارد و نسخه مرجع باید در سوابق قابل ردیابی باشد؛ این کتاب نیز مراجع را به‌عنوان لایه مرجع فصل‌ها نمایش می‌دهد.'}
  ],
  quiz:{correct:'درست — استاندارد باید در یک زنجیره قابل ردیابی استفاده شود.',incorrect:'این پاسخ دامنه کنترل را بیش از حد محدود می‌کند.'},
  onRender:function(index,b){
    const root=document.getElementById('cards'); if(!root)return;
    root.innerHTML=BOOK_CONFIG.beats.map((v,k)=>'<g><rect x="'+(180+k*300)+'" y="230" width="260" height="220" rx="24" fill="'+(k===index?'#173c2a':'#dce9df')+'"/><text x="'+(310+k*300)+'" y="290" font-size="24" font-weight="700" text-anchor="middle" fill="'+(k===index?'#fff':'#173c2a')+'">'+(k+1)+'</text><text x="'+(310+k*300)+'" y="350" font-size="19" text-anchor="middle" fill="'+(k===index?'#fff':'#173c2a')+'">'+v.title+'</text></g>').join('');
    const t=document.getElementById('svgt'),s=document.getElementById('svgsub'); if(t)t.textContent=b.title;if(s)s.textContent='مرجع → نسخه → کاربرد → ردیابی';
  }
};