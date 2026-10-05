window.BOOK_CONFIG={
 interval:5000,
 beats:[
  {title:'ورود کامیون',body:'محموله باید با اطلاعات سفارش و مشخصات مورد ارزیابی قابل ردیابی باشد.'},
  {title:'نمونه‌برداری',body:'نمونه‌برداری باید طبق الزامات فصل ۹ انجام شود و نمونه نماینده محموله باشد.'},
  {title:'ساخت نمونه',body:'ساخت نمونه‌های آزمون باید طبق ISIRI 1608-2 انجام شود.'},
  {title:'آزمون مقاومت',body:'آزمون مقاومت فشاری طبق ISIRI 1608-3 انجام می‌شود و نتیجه باید به نمونه و محموله متصل بماند.'},
  {title:'تناوب و معیار',body:'حداقل یک نمونه‌برداری در هر 50 m³ و پس از آن در هر 150 m³ یا هر دو ساعت، هرکدام که نمونه بیشتری ایجاد کند؛ هر نوبت حداقل دو نمونه استاندارد. میانگین سه نتیجه متوالی نباید کمتر از fc باشد و هیچ نتیجه منفردی نباید کمتر از 0.9fc باشد.'},
  {title:'تصمیم انطباق',body:'تصمیم نهایی باید بر پایه نتیجه معتبر، نمونه قابل ردیابی و معیار انطباق گرفته شود؛ یک عدد منفرد بدون زمینه کافی نیست.'}
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