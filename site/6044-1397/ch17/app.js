window.BOOK_CONFIG={interval:4500,beats:[
 {title:'هدف مقاومت فشاری',body:'پیوست ب روش‌های محاسبه مقاومت فشاری هدف را برای برآورد الزامات مقاومت فشاری بیان می‌کند.'},
 {title:'رابطه اول',body:'fcm = fc + 1.34s'},
 {title:'رابطه دوم',body:'fcm = 0.9fc + 2.33s'},
 {title:'مخلوط جدید',body:'برای مخلوط جدید یا زمانی که سابقه آماری کافی وجود ندارد: fcm = 1.1fc + 5'},
 {title:'کاربرد QC',body:'فرمول باید همراه با بند مربوط، داده آماری، مشخصات پروژه و سوابق محاسبه قابل ردیابی باشد.'},
 {title:'تصمیم',body:'در تمرین واقعی، ابتدا fc و s و وضعیت سابقه آماری را مشخص کن؛ سپس رابطه مناسب پیوست ب را انتخاب کن.'}
],scene:{root:'.stage',steps:[
 {className:'target',focus:{x:50,y:40},progress:.16,show:['target']},
 {className:'formula-one',focus:{x:50,y:48},progress:.33,show:['formula1']},
 {className:'formula-two',focus:{x:50,y:48},progress:.50,show:['formula2']},
 {className:'new-mix',focus:{x:50,y:48},progress:.66,show:['newmix']},
 {className:'application',focus:{x:55,y:58},progress:.83,show:['newmix','qc']},
 {className:'decision',focus:{x:55,y:55},progress:1,show:['qc','decision']}
]},quiz:{correct:'درست — انتخاب رابطه باید بر مبنای وضعیت داده و سابقه آماری انجام شود.',incorrect:'کافی نیست — یک فرمول بدون تشخیص وضعیت داده، تصمیم کامل نیست.'}};