window.BOOK_CONFIG={
 interval:5000,
 beats:[
  {title:'ورود کامیون',body:'محموله باید با اطلاعات سفارش و مشخصات مورد ارزیابی قابل ردیابی باشد.',spokenText:'اول کامیون رو با سفارش تطبیق می‌دیم و مطمئن می‌شیم محموله از همین اول قابل ردیابیه.'},
  {title:'نمونه‌برداری',body:'نمونه‌برداری باید طبق الزامات فصل ۹ انجام شود و نمونه نماینده محموله باشد.',spokenText:'نمونه‌برداری رو طبق فصل ۹ انجام می‌دیم؛ نمونه باید واقعاً نماینده همین محموله باشه.'},
  {title:'ساخت نمونه',body:'ساخت نمونه‌های آزمون باید طبق ISIRI 1608-2 انجام شود.',spokenText:'نمونه‌های آزمون رو طبق ISIRI 1608-2 می‌سازیم تا خود نمونه هم از نظر روش آماده‌سازی قابل اتکا باشه.'},
  {title:'آزمون مقاومت',body:'آزمون مقاومت فشاری طبق ISIRI 1608-3 انجام می‌شود و نتیجه باید به نمونه و محموله متصل بماند.',spokenText:'آزمون مقاومت فشاری طبق ISIRI 1608-3 انجام می‌شه و نتیجه باید به نمونه و محموله وصل بمونه.'},
  {title:'تناوب و معیار',body:'حداقل یک نمونه‌برداری در هر 50 m³ و پس از آن در هر 150 m³ یا هر دو ساعت، هرکدام که نمونه بیشتری ایجاد کند؛ هر نوبت حداقل دو نمونه استاندارد. میانگین سه نتیجه متوالی نباید کمتر از fc باشد و هیچ نتیجه منفردی نباید کمتر از 0.9fc باشد.',spokenText:'تناوب نمونه‌برداری رو دقیق رعایت می‌کنیم: حداقل یک نمونه در هر ۵۰ مترمکعب، بعد طبق شرط ۱۵۰ مترمکعب یا دو ساعت، هرکدوم که نمونه بیشتری بده. هر نوبت هم حداقل دو نمونه استاندارده. برای انطباق، میانگین سه نتیجه متوالی باید حداقل fc باشه و هیچ نتیجه‌ای هم نباید از ۰٫۹fc کمتر بشه.'},
  {title:'تصمیم انطباق',body:'تصمیم نهایی باید بر پایه نتیجه معتبر، نمونه قابل ردیابی و معیار انطباق گرفته شود؛ یک عدد منفرد بدون زمینه کافی نیست.',spokenText:'در نهایت با یک عدد تنها تصمیم نمی‌گیریم. نتیجه باید معتبر باشه، نمونه و محموله مشخص باشن و معیار انطباق هم درست اعمال شده باشه.'}
 ],
 scene:{root:'.stage',steps:[
  {className:'arrival',focus:{x:50,y:40},progress:.16,show:['truck','ticket']},
  {className:'sampling',focus:{x:50,y:52},progress:.33,show:['truck','ticket','sample']},
  {className:'specimen',focus:{x:28,y:70},progress:.50,show:['sample','mold']},
  {className:'testing',focus:{x:45,y:70},progress:.66,show:['specimen','press','qc']},
  {className:'conformity',focus:{x:55,y:66},progress:.83,show:['specimen','press','qc','criteria']},
  {className:'decision',focus:{x:55,y:52},progress:1,show:['qc','criteria','decision']}
 ]},
 quiz:{correct:'درست — نتیجه باید در زنجیره نمونه‌برداری، آزمون، ردیابی و معیار انطباق تفسیر شود.',incorrect:'کافی نیست — تصمیم انطباق فقط با دیدن یک عدد انجام نمی‌شود.'}
};

(function(){
 const $=id=>document.getElementById(id);
 const btn=$('run-conformity'),out=$('conformity-output');
 if(!btn||!out)return;
 btn.addEventListener('click',()=>{
  const fc=Number($('fc').value), values=[$('r1'),$('r2'),$('r3')].map(x=>Number(x.value));
  const result=window.SimulationEngine.ch11.calculate({fc,results:values});
  if(!result.valid){ out.textContent=result.error; out.className='sim-result bad'; return; }
  const {mean,limit,meanOK,individualOK,pass}=result;
  out.innerHTML='<strong>'+ (pass?'انطباق در این سناریو تأیید می‌شود.':'انطباق در این سناریو تأیید نمی‌شود.') +
   '</strong><br>میانگین سه نتیجه: '+mean.toFixed(2)+' MPa'+
   '<br>حداقل مجاز نتیجه منفرد (0.9fc): '+limit.toFixed(2)+' MPa'+
   '<br>میانگین ≥ fc: '+(meanOK?'بله':'خیر')+
   '<br>همه نتایج ≥ 0.9fc: '+(individualOK?'بله':'خیر');
  out.className='sim-result '+(pass?'good':'bad');
 });
})();
