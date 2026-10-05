window.BOOK_CONFIG = {
  interval: 5000,
  beats: [
    {title:'کلیات',body:'مصالح تشکیل‌دهنده بتن آماده باید با استانداردهای ملی مرتبط منطبق باشند. اگر برای ماده موردنظر استاندارد ملی مشخصی وجود نداشته باشد، استاندارد معتبر خارجی یا منطقه‌ای و مدارک انطباق یا آزمون مطرح می‌شود.',spokenText:'از همین اول، ماده‌ای که وارد کارخانه می‌شه باید استاندارد مربوط خودش رو داشته باشه. اگر استاندارد ملی مشخصی نداشت، باید سراغ مرجع معتبر و شواهد انطباق بریم.'},
    {title:'مواد سیمانی',body:'سیمان هیدرولیکی و مواد مکمل سیمانی باید مطابق استاندارد مربوط کنترل شوند؛ از جمله موادی مانند دوده سیلیسی، پوزولان طبیعی و سرباره دانه‌ای کوره‌آهن‌گدازی، حسب مورد.',spokenText:'سیمان و مواد مکمل سیمانی رو جداگانه و طبق استاندارد مربوط کنترل می‌کنیم؛ بسته به ماده، ممکنه دوده سیلیسی، پوزولان یا سرباره هم داشته باشیم.'},
    {title:'سنگدانه',body:'سنگدانه‌های معمولی، سبک و سنگین باید بر اساس استانداردهای مربوط به گروه خود کنترل شوند. مشخصات ماده اولیه باید به‌گونه‌ای ثبت شود که به محموله و طرح اختلاط قابل ردیابی باشد.',spokenText:'سنگدانه رو بر اساس نوعش کنترل می‌کنیم؛ معمولی، سبک یا سنگین. مهمه مشخصات محموله و رابطه‌اش با طرح اختلاط هم قابل ردیابی باشه.'},
    {title:'افزودنی‌های شیمیایی',body:'افزودنی‌هایی مانند کاهنده آب، حباب‌زا، دیرگیر یا زودگیر باید با الزامات مربوط سازگار باشند. مقدار مصرف فقط یک عدد ثابت نیست؛ باید در ارتباط با عملکرد موردنیاز و کنترل تولید دیده شود.',spokenText:'افزودنی شیمیایی فقط اسم و مقدار مصرف نیست. باید ببینیم چه عملکردی می‌خوایم، محصول با چه الزامی تأیید شده و مصرفش چطور در تولید کنترل می‌شه.'},
    {title:'آب',body:'آب مصرفی بتن باید الزامات استاندارد ملی ۱۴۷۴۸ را برآورده کند. در کنترل QC، منبع آب، وضعیت انطباق و سوابق مرتبط باید قابل پیگیری باشد.',spokenText:'آب مصرفی هم باید طبق ۱۴۷۴۸ کنترل بشه. منبع آب و سابقه انطباقش باید مشخص و قابل پیگیری باشه.'},
    {title:'تصمیم QC',body:'ورودی صحیح فصل ۴ یک «ماده» نیست؛ یک زنجیره است: ماده مشخص → استاندارد مربوط → شواهد انطباق یا آزمون → ثبت → ارتباط با تولید و طرح اختلاط.',spokenText:'برای QC، ماده وقتی قابل قبول و قابل استفاده‌ست که خود ماده، استانداردش، شواهد انطباق، ثبت سوابق و ارتباطش با تولید مشخص باشه.'}
  ],
  quiz:{correct:'درست — کنترل مصالح باید قابل ردیابی و مبتنی بر الزامات مربوط باشد.',incorrect:'کافی نیست — فصل ۴ فقط فهرست مواد نیست؛ انطباق و شواهد آن هم مهم است.'},
  onRender(index,beat){
    const q=document.getElementById('q'),sub=document.getElementById('sub'),cards=document.getElementById('cards');
    if(q)q.textContent=beat.title||'';
    if(sub)sub.textContent='MATERIAL → STANDARD → EVIDENCE → TRACEABILITY';
    if(!cards)return;
    const icons=[
      '<rect x="42" y="78" width="92" height="108" rx="8" fill="#647a74" stroke="#2bf2ad" stroke-width="5"/><path d="M55 104h66M55 129h56M55 154h70" stroke="#d8e8e3" stroke-width="6" stroke-linecap="round"/><path d="M52 78h72l-8-22H60z" fill="#8fa39c"/>',
      '<path d="M72 65h56v126H72z" fill="#728882" stroke="#2bf2ad" stroke-width="5"/><path d="M72 92h56M72 125h56M72 158h56" stroke="#b6c9c2" stroke-width="5"/><path d="M58 65h84M86 45h28" stroke="#2a5a50" stroke-width="10" stroke-linecap="round"/>',
      '<path d="M40 150L70 75h70l30 75z" fill="#7d8f89" stroke="#2bf2ad" stroke-width="5"/><circle cx="75" cy="130" r="12" fill="#c5d2ce"/><circle cx="112" cy="112" r="9" fill="#9eaaa6"/><circle cx="140" cy="138" r="13" fill="#b8c6c1"/>',
      '<rect x="45" y="82" width="120" height="92" rx="18" fill="#14282e" stroke="#27c5de" stroke-width="5"/><circle cx="82" cy="128" r="22" fill="none" stroke="#2bf2ad" stroke-width="5"/><path d="M82 128l18-12M115 108h33M115 128h39M115 148h28" stroke="#9bb5ad" stroke-width="5" stroke-linecap="round"/>',
      '<path d="M76 68h48v24h18v94H58V92h18z" fill="#667d77" stroke="#2bf2ad" stroke-width="5"/><path d="M72 115h56M72 145h56M72 175h45" stroke="#c7d6d1" stroke-width="5"/><path d="M88 58h24" stroke="#27c5de" stroke-width="7"/>',
      '<rect x="34" y="77" width="132" height="105" rx="18" fill="#0f2829" stroke="#2bf2ad" stroke-width="5"/><path d="M55 106h90M55 133h64M55 160h80" stroke="#85aaa0" stroke-width="6" stroke-linecap="round"/><circle cx="141" cy="133" r="13" fill="#2bf2ad"/>'
    ];
    cards.innerHTML=window.BOOK_CONFIG.beats.map((item,k)=>{
      const active=k===index,x=35+k*248;
      return '<g class="scene-object material-pod" data-beat="'+(k+1)+'" transform="translate('+x+' 0)">'+
        '<rect x="0" y="190" width="215" height="330" rx="24" fill="#101f27" stroke="'+(active?'#2bf2ad':'#28505a')+'" stroke-width="'+(active?'3':'2')+'"/>'+
        '<rect x="0" y="190" width="215" height="7" rx="3" fill="'+(active?'#2bf2ad':'#21424a')+'"/>'+
        '<circle cx="29" cy="229" r="15" fill="'+(active?'#2bf2ad':'#19373b')+'"/><text x="29" y="234" text-anchor="middle" fill="'+(active?'#062018':'#9eb7af')+'" font-size="12" font-weight="900">'+(k+1)+'</text>'+
        '<g transform="translate(38 245)">'+icons[k]+'</g>'+
        '<text x="107" y="440" text-anchor="middle" fill="#edf7f3" font-size="20" font-weight="900">'+item.title+'</text>'+
        '<text x="107" y="475" text-anchor="middle" fill="#91aaa2" font-size="14">استاندارد مربوط + شاهد</text>'+
        '<text x="107" y="503" text-anchor="middle" fill="'+(active?'#2bf2ad':'#8fa9a2')+'" font-size="13" font-weight="800">'+(active?'ACTIVE QC PATH':'TRACEABLE INPUT')+'</text>'+
      '</g>';
    }).join('');
  }
};