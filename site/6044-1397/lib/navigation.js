/* 6044 Study Command Drawer — dependency-free navigation */
(function(){
  const root=document.documentElement;
  const script=document.currentScript;
  const scriptUrl=new URL(script?.getAttribute('src')||'lib/navigation.js',location.href);
  const libBase=new URL('../',scriptUrl).href;
  const siteBase=new URL('../',libBase).href;
  const units=[
    ['01','هدف و دامنه کاربرد'],['02','مراجع الزامی'],['03','اصطلاحات و تعاریف'],['04','مصالح'],
    ['05','مبنای سفارش و خرید بتن'],['06','اطلاعات سفارش'],['07','اختلاط و تحویل'],
    ['08','حمل بتن با استفاده از دستگاه مخلوط‌کن'],['09','نمونه‌برداری از بتن تازه'],['10','الزامات بتن تازه'],
    ['11','الزامات بتن سخت‌شده'],['12','به‌کارگیری کنترل بتن آماده'],['13','الزامات تأسیسات تولید بتن آماده'],
    ['14','کنترل تولید و بازرسی واحد تولیدی'],['15','ارزیابی انطباق'],['16','پیوست الف — الزامات یکنواختی بتن'],
    ['17','پیوست ب — محاسبه مقاومت فشاری هدف'],['18','پیوست ج — درصد هوا و شرایط رویارویی'],
    ['19','پیوست د — سامانه کنترل تولید'],['20','پیوست هـ — مقررات تکمیلی برای بتن پرمقاومت'],
    ['21','پیوست و — ارزیابی، نظارت و گواهی کنترل تولید'],['22','پیوست ز — تغییرات اعمال‌شده در استاندارد نسبت به مرجع'],
    ['23','کتاب‌نامه — منابع استاندارد و مراجع']
  ];
  const fa=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
  const current=(location.pathname.match(/\/ch(\d{2})(?:\/|$)/)||[])[1]||'';
  function ensureStyles(){
    const href=new URL('lib/navigation.css',siteBase).href;
    if(!document.querySelector('link[data-6044-navigation-css]')){
      const l=document.createElement('link');l.rel='stylesheet';l.href=href;l.dataset['6044NavigationCss']='true';document.head.appendChild(l);
    }
  }
  function readProgress(){
    try{return JSON.parse(localStorage.getItem('standard6044-book-progress-v1')||'{}')}catch(e){return {}}
  }
  function makeUrl(path){return new URL(path,siteBase).href}
  function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function render(){
    ensureStyles();
    if(document.querySelector('[data-study-drawer]')) return;
    const p=readProgress();
    const started=units.filter(([n])=>p[n]).length;
    const bookmarks=Object.keys(p.bookmark||{}).length;
    const curIndex=units.findIndex(u=>u[0]===current);
    const curTitle=curIndex>=0?units[curIndex][1]:'صفحه آغازین کتاب';
    const curBeat=curIndex>=0&&p[current]?Math.min((Number(p[current].index)||0)+1,Number(p[current].total)||1):null;
    const prev=curIndex>0?units[curIndex-1]:null, next=curIndex>=0&&curIndex<units.length-1?units[curIndex+1]:null;
    const chapterLinks=units.map(([n,title])=>{
      const cls=n===current?' is-current':'';
      const marker=(p[n]?'<small>شروع‌شده</small>':'');
      return '<a class="study-drawer-link'+cls+'" href="'+makeUrl('ch'+n+'/')+'"><span class="study-drawer-chapter"><span class="study-drawer-chapter-num">'+fa(n)+'</span><span>'+esc(title)+'</span></span>'+marker+'</a>';
    }).join('');
    const currentMeta=curIndex>=0
      ? '<small>اکنون در کتاب</small><strong>فصل / پیوست '+fa(current)+' — '+esc(curTitle)+'</strong>'+(curBeat?'<span>گام '+fa(curBeat)+' از '+fa(p[current].total||curBeat)+'</span>':'')
      : '<small>مسیر مطالعه</small><strong>استاندارد ملی ایران ۶۰۴۴:۱۳۹۷</strong><span>منبع → فهم → کاربرد → تمرین → تصمیم</span>';
    const html=
      '<button class="study-drawer-launch" type="button" data-study-open aria-controls="study-command-drawer" aria-expanded="false"><span class="launch-mark" aria-hidden="true">☰</span><span>مرکز مطالعه</span></button>'+
      '<div class="study-drawer-backdrop" data-study-backdrop></div>'+
      '<aside class="study-drawer" id="study-command-drawer" data-study-drawer aria-label="مرکز مطالعه">'+
        '<div class="study-drawer-head"><div><div class="study-drawer-eyebrow">6044 / STUDY NAVIGATION</div><div class="study-drawer-title">مرکز مطالعه</div></div><button class="study-drawer-close" type="button" data-study-close aria-label="بستن مرکز مطالعه">×</button></div>'+
        '<div class="study-drawer-current">'+currentMeta+'</div>'+
        '<section class="study-drawer-section"><h3>دسترسی سریع</h3><div class="study-drawer-links">'+
          '<a class="study-drawer-link" href="'+makeUrl('index.html')+'"><span>صفحه اصلی کتاب</span><small>خانه</small></a>'+
          '<a class="study-drawer-link" href="'+makeUrl('search.html')+'"><span>جست‌وجوی استاندارد</span><small>مطالب و بندها</small></a>'+
          '<a class="study-drawer-link" href="'+makeUrl('assessment.html')+'"><span>ارزیابی یادگیری</span><small>تمرین و مرور</small></a>'+
          (prev?'<a class="study-drawer-link" href="'+makeUrl('ch'+prev[0]+'/')+'"><span>← فصل قبلی</span><small>'+fa(prev[0])+'</small></a>':'')+
          (next?'<a class="study-drawer-link" href="'+makeUrl('ch'+next[0]+'/')+'"><span>فصل بعدی →</span><small>'+fa(next[0])+'</small></a>':'')+
        '</div></section>'+
        '<section class="study-drawer-section"><h3>وضعیت مطالعه</h3><div class="study-drawer-stats"><div class="study-drawer-stat"><strong>'+fa(started)+'</strong><span>بخش آغازشده</span></div><div class="study-drawer-stat"><strong>'+fa(units.length)+'</strong><span>بخش کتاب</span></div><div class="study-drawer-stat"><strong>'+fa(bookmarks)+'</strong><span>نشانک</span></div></div><div class="study-drawer-progress"><i style="width:'+Math.round(started/units.length*100)+'%"></i></div><div class="study-drawer-note">پیشرفت و نشانک‌ها فقط روی همین دستگاه ذخیره می‌شوند.</div></section>'+
        '<section class="study-drawer-section"><h3>فهرست ۲۳ بخش</h3><div class="study-drawer-links study-drawer-chapters">'+chapterLinks+'</div></section>'+
      '</aside>';
    const wrap=document.createElement('div');wrap.innerHTML=html;document.body.append(...wrap.children);
    const open=document.querySelector('[data-study-open]'),drawer=document.querySelector('[data-study-drawer]'),back=document.querySelector('[data-study-backdrop]'),close=document.querySelector('[data-study-close]');
    let lastFocus=null;
    const focusables=()=>drawer.querySelectorAll('a[href],button:not([disabled])');
    function setOpen(v){
      drawer.classList.toggle('is-open',v);back.classList.toggle('is-open',v);document.body.classList.toggle('study-drawer-open',v);open.setAttribute('aria-expanded',String(v));
      if(v){lastFocus=document.activeElement;close.focus()} else if(lastFocus){lastFocus.focus()}
    }
    open.addEventListener('click',()=>setOpen(true));close.addEventListener('click',()=>setOpen(false));back.addEventListener('click',()=>setOpen(false));
    document.addEventListener('keydown',e=>{
      if(!drawer.classList.contains('is-open')) return;
      if(e.key==='Escape'){e.preventDefault();setOpen(false);return}
      if(e.key==='Tab'){
        const f=[...focusables()];if(!f.length)return;
        const first=f[0],last=f[f.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
      }
    });
    root.classList.add('study-navigation-ready');
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render,{once:true}); else render();
})();