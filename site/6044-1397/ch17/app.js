window.BOOK_CONFIG={interval:4800,beats:[
 {title:'هدف مقاومت فشاری',body:'پیوست ب روش‌های محاسبه مقاومت فشاری هدف را برای برآورد الزامات مقاومت فشاری بیان می‌کند.',spokenText:'اینجا هدفمون اینه که با استفاده از داده‌های مقاومت و انحراف معیار، مقاومت فشاری هدف برای طرح اختلاط رو حساب کنیم.',sourceRef:'پیوست ب، صفحه ۵۰'},
 {title:'رابطه اول',body:'fcm = fc + 1.34s',spokenText:'یک مسیر محاسبه اینه: اف‌سی‌ام برابر اف‌سی به اضافه یک ممیز سی‌وچهار اس. اگر وضعیت داده با این مسیر جور باشه، از همین رابطه استفاده می‌کنیم.',sourceRef:'پیوست ب، جدول ب-۱، صفحه ۵۰'},
 {title:'رابطه دوم',body:'fcm = 0.9fc + 2.33s',spokenText:'مسیر دوم با نه دهم اف‌سی به اضافه دو ممیز سی‌وسه اس حساب می‌شه. اینجا هم انتخاب رابطه رو باید با وضعیت داده چک کنیم.',sourceRef:'پیوست ب، جدول ب-۱، صفحه ۵۰'},
 {title:'مخلوط جدید',body:'برای مخلوط جدید یا زمانی که سابقه آماری کافی وجود ندارد: fcm = 1.1fc + 5',spokenText:'وقتی برای مخلوط جدید سابقه آماری کافی نداریم، طبق این حالت اف‌سی‌ام برابر یک ممیز یک اف‌سی به اضافه پنج می‌شه.',sourceRef:'پیوست ب، بند ب-۲-۱، صفحه ۵۰'},
 {title:'کاربرد QC',body:'انتخاب رابطه باید همراه با وضعیت داده آماری، مشخصات پروژه و سوابق محاسبه قابل ردیابی باشد.',spokenText:'برای QC فقط عدد آخر مهم نیست. باید بدونیم چه داده‌ای داشتیم، کدوم رابطه رو انتخاب کردیم و سابقه محاسبه کجاست.',sourceRef:'پیوست ب، بند ب-۱ و ب-۲'},
 {title:'تصمیم',body:'در تمرین واقعی، ابتدا fc و s و وضعیت سابقه آماری را مشخص کن؛ سپس رابطه مناسب پیوست ب را انتخاب کن.',spokenText:'اول اف‌سی و اس و وضعیت سابقه آماری رو مشخص کن؛ بعد رابطه مناسب پیوست ب رو انتخاب کن و محاسبه رو ثبت کن.',sourceRef:'پیوست ب، جدول ب-۱ و بند ب-۲-۱'}
],scene:{root:'.stage',steps:[
 {className:'target',focus:{x:50,y:40},progress:.16,show:['target']},
 {className:'formula-one',focus:{x:50,y:48},progress:.33,show:['formula1']},
 {className:'formula-two',focus:{x:50,y:48},progress:.50,show:['formula2']},
 {className:'new-mix',focus:{x:50,y:48},progress:.66,show:['newmix']},
 {className:'application',focus:{x:55,y:58},progress:.83,show:['newmix','qc']},
 {className:'decision',focus:{x:55,y:55},progress:1,show:['qc','decision']}
]},quiz:{correct:'درست — انتخاب رابطه باید بر مبنای وضعیت داده و سابقه آماری انجام شود.',incorrect:'کافی نیست — یک فرمول بدون تشخیص وضعیت داده، تصمیم کامل نیست.'},
onRender(index,beat){const s=document.getElementById('sourceRef');if(s)s.textContent=beat.sourceRef||'';}};

(function(){
 const btn=document.getElementById('run-target-strength'),out=document.getElementById('target-strength-output'),svg=document.getElementById('svg-result');
 if(!btn||!out)return;
 btn.addEventListener('click',function(){
   const fc=Number(document.getElementById('fc').value),sd=Number(document.getElementById('s').value),choice=document.getElementById('formula-choice').value;
   if(!Number.isFinite(fc)||!Number.isFinite(sd)||fc<=0||sd<0){out.textContent='fc و s را با مقادیر معتبر وارد کنید.';out.className='sim-result bad';return;}
   let value,label;
   if(choice==='f1'){value=fc+1.34*sd;label='fcm = fc + 1.34s';}
   else if(choice==='f2'){value=0.9*fc+2.33*sd;label='fcm = 0.9fc + 2.33s';}
   else{value=1.1*fc+5;label='fcm = 1.1fc + 5';}
   const formatted=value.toFixed(2);
   out.innerHTML='<strong>'+label+'</strong><br>fcm = <strong>'+formatted+' MPa</strong><br><small>محاسبه آموزشی است؛ انتخاب رابطه باید از وضعیت داده و الزامات پیوست ب تبعیت کند.</small>';
   out.className='sim-result good';
   if(svg)svg.textContent='fcm = '+formatted;
 });
})();